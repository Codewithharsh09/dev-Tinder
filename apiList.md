# DevTinder APTs

## authRouter
- Post /signup
- Post /login
- Post /logout

## profileRouter
- Get /Profile/view
- Patch /Profile/edit
- Patch /profile/password //Forget Password API

## connectionRequestRouter
- Post /request/send/:status/:userId
- Post/ request/review/:status/:requestId


## userRouter   
- Get/user/requests/received
- Get/user/connections
- Get/user/feed- Gets you the profiles of other users on platform

Status: ignored, interested, accepted, rejected