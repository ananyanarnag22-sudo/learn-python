from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from jose import jwt, JWTError
import os
from database import supabase
from models.schemas import UserSignup, UserLogin

from utils.hash import hash_password, verify_password

from utils.jwt_handler import (
    create_access_token,
    SECRET_KEY,
    ALGORITHM
)

from utils.email_service import send_reset_email


router = APIRouter()


# =====================================================
# SIGNUP
# =====================================================

@router.post("/signup")
async def signup(user: UserSignup):

    hashed_password = hash_password(user.password)

    response = (
        supabase
        .table("users")
        .insert({
            "name": user.name,
            "email": user.email,
            "password": hashed_password
        })
        .execute()
    )

    return {
        "message": "Signup Successful",
        "data": response.data
    }


# =====================================================
# LOGIN
# =====================================================

@router.post("/login")
async def login(user: UserLogin):

    response = (
        supabase
        .table("users")
        .select("*")
        .eq("email", user.email)
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Email or Password"
        )

    existing_user = response.data[0]

    db_password = existing_user["password"]

    if verify_password(user.password, db_password):

        access_token = create_access_token({
            "email": existing_user["email"]
        })

        return {
            "message": "Login Successful",
            "access_token": access_token,
            "user": {
                "name": existing_user["name"],
                "email": existing_user["email"]
            }
        }

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid Email or Password"
    )


# =====================================================
# FORGOT PASSWORD
# =====================================================

class ForgotPassword(BaseModel):
    email: str


@router.post("/forgot-password")
async def forgot_password(data: ForgotPassword):

    # Check if email exists
    response = (
        supabase
        .table("users")
        .select("id, email")
        .eq("email", data.email)
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email not found"
        )

    user = response.data[0]

    # Generate password reset token
    reset_token = create_access_token({
        "email": user["email"],
        "purpose": "password_reset"
    })

    # Create reset link
    reset_link = (
    f"{os.getenv('FRONTEND_URL')}/reset-password"
    f"?token={reset_token}"
)

    # Send reset link through email
    await send_reset_email(
        user["email"],
        reset_link
    )

    return {
        "message": "Password reset link sent to your email"
    }


# =====================================================
# RESET PASSWORD
# =====================================================

class ResetPassword(BaseModel):
    token: str
    password: str


@router.post("/reset-password")
async def reset_password(data: ResetPassword):

    # Verify reset token
    try:

        payload = jwt.decode(
            data.token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        # Make sure this token is for password reset
        if payload.get("purpose") != "password_reset":

            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid reset token"
            )

        email = payload.get("email")

        if not email:

            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid reset token"
            )

    except JWTError:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )

    # Hash new password
    hashed_password = hash_password(data.password)

    # Update password in Supabase
    response = (
        supabase
        .table("users")
        .update({
            "password": hashed_password
        })
        .eq("email", email)
        .execute()
    )

    if not response.data:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return {
        "message": "Password reset successful"
    }