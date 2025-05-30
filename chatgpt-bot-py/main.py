from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gpt4all import GPT4All
import random

from gensim.utils import simple_preprocess
from gensim.models import TfidfModel
from gensim.corpora import Dictionary
from scipy.spatial.distance import cosine

from textblob import TextBlob

OPENINGS = [
    "Welcome to our store! How can I help you today?",
    "Hello! What brings you to our shop?",
    "Good to see you! Looking for something special?",
    "Hi there! Feel free to ask me about our products or promotions.",
    "Welcome back! How can I assist you with your shopping today?"
]

CLOSINGS = [
    "Thank you for visiting! Have a great day and happy shopping.",
    "Come back anytime – if you have any questions, just ask.",
    "It was a pleasure to assist you! See you again soon.",
    "Thank you for shopping with us. Goodbye!",
    "If you need anything else, I'm always here to help. Take care!"
]

SHOP_TOPICS = [
    "shop", "store", "clothes", "fashion", "t-shirt", "tshirts", "pants", "dress", "order",
    "return", "shopping", "brand", "product", "promotion", "exchange", "size", "color",
    "jacket", "hoodie", "skirt", "shoes", "material", "payment", "refund", "trousers",
    "buy clothes", "men's clothes", "women's clothes", "order status", "discount on shoes",
    "material of jacket", "return t-shirt", "how to pay", "buy a hoodie", "children's clothes",
    "summer dress", "winter jacket", "order a shirt", "promotion on pants", "exchange product",
    "availability in store", "how to return", "how to exchange", "can I get refund",
    "is there discount", "what brands", "is this in stock", "what's the price",
    "do you have", "in stock", "out of stock", "restock", "new collection", "product details",
    "customer service", "delivery", "shipping", "free shipping", "store address",
    "opening hours"
]

SIMPLE_KEYWORDS = [
    "shop", "store", "clothes", "fashion", "t-shirt", "tshirts", "pants", "dress", "order",
    "return", "shopping", "brand", "product", "promotion", "exchange", "size", "color",
    "jacket", "hoodie", "skirt", "shoes", "material", "payment", "refund", "trousers",
    "men's", "women's", "children's", "discount", "price", "collection", "delivery", "shipping"
]

def is_shop_topic_gensim(message):
    texts = [simple_preprocess(message)] + [simple_preprocess(topic) for topic in SHOP_TOPICS]
    dictionary = Dictionary(texts)
    corpus = [dictionary.doc2bow(text) for text in texts]
    tfidf = TfidfModel(corpus)
    message_vec = tfidf[corpus[0]]

    for i in range(1, len(SHOP_TOPICS) + 1):
        topic_vec = tfidf[corpus[i]]
        all_ids = set([id for id, _ in message_vec] + [id for id, _ in topic_vec])
        message_arr = [dict(message_vec).get(idx, 0.0) for idx in all_ids]
        topic_arr = [dict(topic_vec).get(idx, 0.0) for idx in all_ids]
        if message_arr and topic_arr:
            sim = 1 - cosine(message_arr, topic_arr)
            if sim > 0.2:
                return True
    return False

def is_shop_topic(message):
    msg = message.lower()
    if any(word in msg for word in SIMPLE_KEYWORDS):
        return True
    return is_shop_topic_gensim(message)

def analyze_sentiment(text):
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    if polarity > 0.1:
        return "positive"
    elif polarity < -0.1:
        return "negative"
    else:
        return "neutral"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserMessage(BaseModel):
    message: str

model = GPT4All("mistral-7b-instruct-v0.1.Q4_0.gguf")

@app.post("/chat")
async def chat(user_message: UserMessage):
    try:
        if not is_shop_topic(user_message.message):
            return {
                "response": "Sorry, I can only answer questions about our shop and clothes. Please ask about products, shopping, orders, or returns.",
                "sentiment": "neutral"
            }
        SYSTEM_PROMPT = (
            "You are a helpful assistant working in an online clothing store. "
            "You answer questions about products, orders, returns, sizes, colors, brands, "
            "and other topics related to shopping for clothes. "
            "If a question is not related to the store or clothing, politely refuse to answer.\n"
        )
        prompt = SYSTEM_PROMPT + "User: " + user_message.message + "\nAssistant:"
        response = model.generate(prompt, max_tokens=200)
        sentiment = analyze_sentiment(response)
        return {"response": response, "sentiment": sentiment}
    except Exception as e:
        return {"error": str(e), "sentiment": "neutral"}

@app.get("/opening")
def get_opening():
    return {"opening": random.choice(OPENINGS)}

@app.get("/closing")
def get_closing():
    return {"closing": random.choice(CLOSINGS)}
