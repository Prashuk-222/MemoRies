API_SCHEMA = {
    "endpoints": [
        {
            "path": "api/token/",
            "methods": ["POST"],
            "description": "Obtain access and refresh tokens by providing user credentials (email and password).",
            "payload_example": {
                "email": "user@example.com",
                "password": "userpassword123"
            },
            "response_example": {
                "access": "<JWT Access Token>",
                "refresh": "<JWT Refresh Token>"
            },
        },
        {
            "path": "api/token/refresh/",
            "methods": ["POST"],
            "description": "Refresh the access token using a valid refresh token.",
            "payload_example": {
                "refresh": "<JWT Refresh Token>"
            },
            "response_example": {
                "access": "<New JWT Access Token>"
            },
        },
        {
            "path": "api/register/",
            "methods": ["POST"],
            "description": "Register a new user by providing the required details.",
            "payload_example": {
                "email": "newuser@example.com",
                "first_name": "John",
                "password": "securepassword123"
            },
            "response_example": {
                "id": "<User ID>",
                "email": "newuser@example.com",
                "first_name": "John",
                "is_active": False
            },
        },
        {
            "path": "api/activate/<uidb64>/<token>/",
            "methods": ["POST"],
            "description": "Activate the user account using the UID and token provided in the activation email.",
            "payload_example": None,
            "response_example": {
                "account": "Account has been activated!"
            },
        },
        {
            "path": "api/reset/password/",
            "methods": ["POST"],
            "description": "Request a password reset email for the user by providing their registered email.",
            "payload_example": {
                "email": "user@example.com"
            },
            "response_example": {
                "detail": "Password reset email sent."
            },
        },
        {
            "path": "api/set/password/<uidb64>/<token>/",
            "methods": ["POST"],
            "description": "Reset the user password by providing a new password along with UID and token.",
            "payload_example": {
                "password1": "newpassword123",
                "password2": "newpassword123"
            },
            "response_example": {
                "detail": "Password has been reset successfully."
            },
        },
    ]
}

if __name__ == "__main__":
    import json
    print(json.dumps(API_SCHEMA, indent=4))
