from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gpt4all import GPT4All

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
        response = model.generate(user_message.message, max_tokens=200)
        return {"response": response}
    except Exception as e:
        return {"error": str(e)}
