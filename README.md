Features-
User Registration: Allows users to register with a unique email and password.
User Login: Users can log in using their credentials, and JWT tokens are issued for authentication.
Single Device Login: Ensures that a user can only be logged in on one device at a time by clearing previous tokens.
Profile Fetching: Users can retrieve their profile details after successful login.
JWT Authentication: Access to protected routes is secured using JWT tokens.


Registration
Endpoint: /api/register
Method: POST
Description: Registers a new user with email, username, and password.
Request Body:{
  "username": "JohnDoe",
  "email": "johndoe@example.com",
  "password": "password123"
}
Response: On success, it returns a message indicating successful registration and the user data.

Login
Endpoint: /api/login
Method: POST
Description: Authenticates a user and returns a JWT token and refresh token.
Request Body:
{
  "email": "johndoe@example.com",
  "password": "password123"
}
Response: On success, it returns a message with the JWT token and user data.

Fetch Profile
Endpoint: /api/profile
Method: GET
Description: Fetches the profile details of the authenticated user. Requires a valid JWT token in the request headers.
Headers:Authorization: Bearer <JWT_TOKEN>
Response: Returns the user’s profile data.

Authentication Flow
Users must log in to receive a JWT token.
This token is required to access protected routes, such as fetching the user profile.
The token is validated in every request, and only users with valid tokens are allowed to proceed.
Token Management
JWT Token: Expires in 3 days and is used for accessing protected routes.
Refresh Token: Expires in 7 days and can be used to refresh the JWT token.
On login, both tokens are generated, and previous tokens (if any) are cleared to ensure only one active session per user.

