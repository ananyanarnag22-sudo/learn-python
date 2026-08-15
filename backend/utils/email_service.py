import os
import resend
from dotenv import load_dotenv

load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")

async def send_reset_email(
    recipient_email: str,
    reset_link: str
):

    print("EMAIL RECEIVED:", repr(recipient_email))  # Check karenge actual email kya aa rahi hai

    params = {
        "from": "onboarding@resend.dev",
        "to": [recipient_email],
        "subject": "Reset Your Password",
        "html": f"""
        <html>
            <body>
                <h2>Reset Your Password</h2>

                <p>You requested to reset your password.</p>

                <p>Click the button below to create a new password:</p>

                <p>
                    <a
                        href="{reset_link}"
                        style="
                            display:inline-block;
                            padding:12px 20px;
                            background:#2563eb;
                            color:white;
                            text-decoration:none;
                            border-radius:6px;
                        "
                    >
                        Reset Password
                    </a>
                </p>

                <p>
                    If you did not request this password reset,
                    you can safely ignore this email.
                </p>
            </body>
        </html>
        """
    }

    email = await resend.Emails.send_async(params)

    return email