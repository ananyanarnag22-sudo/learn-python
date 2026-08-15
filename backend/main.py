from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth
from routers import contacts
from routers import profile

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(contacts.router)
app.include_router(profile.router)


@app.get("/")
async def home():
    return {
        "message": "Welcome to FastAPI"
    }