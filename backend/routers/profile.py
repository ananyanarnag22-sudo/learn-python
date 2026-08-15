from fastapi import APIRouter, Depends
from database import supabase
from utils.jwt_handler import verify_token

router = APIRouter()


@router.get("/profile")
def get_profile(current_user=Depends(verify_token)):

    response = supabase.table("users")\
        .select("id, name, email")\
        .eq("email", current_user["email"])\
        .execute()

    user = response.data

    if not user:
        return {"message": "User not found"}

    return user[0]