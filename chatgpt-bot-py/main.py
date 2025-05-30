from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gpt4all import GPT4All
import random


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

model = GPT4All("Meta-Llama-3-8B-Instruct.Q4_0.gguf")

@app.post("/chat")
async def chat(user_message: UserMessage):
    try:
        response = model.generate(user_message.message, max_tokens=1024)
        return {"response": response}
    except Exception as e:
        return {"error": str(e)}

@app.get("/opening")
def get_opening():
    return {"opening": random.choice(OPENINGS)}

@app.get("/closing")
def get_closing():
    return {"closing": random.choice(CLOSINGS)}
