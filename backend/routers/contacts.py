from fastapi import APIRouter
from database import supabase
from models.schemas import Contact

router = APIRouter()


# Create Contact
@router.post("/contact")
async def create_contact(contact: Contact):

    response = (
        supabase
        .table("contacts")
        .insert({
            "name": contact.name,
            "email": contact.email,
            "subject": contact.subject,
            "message": contact.message
        })
        .execute()
    )

    return {
        "message": "Contact Saved Successfully",
        "data": response.data
    }


# Get All Contacts
@router.get("/contacts")
async def get_contacts():

    response = (
        supabase
        .table("contacts")
        .select("*")
        .order("id", desc=True)
        .execute()
    )

    return response.data