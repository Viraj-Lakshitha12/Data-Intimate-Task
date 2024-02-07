import jwt, {Secret} from "jsonwebtoken";
import express from "express";

// Token verify
export const verifyToken = (req: express.Request, res: any, next: express.NextFunction) => {
    const token = req.get("authorization");

    if (!token) {
        return res.status(401).json({error: 'Missing token', message: 'Authorization token is required'});
    }

    try {
        const data: any = jwt.verify(token, process.env.SECRET_KEY as Secret);
        res.tokenData = data;
        next();
    } catch (error) {
        console.error('Token Verification Error:', error);
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({error: 'Token expired', message: 'Authorization token has expired'});
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({error: 'Invalid token', message: 'Authorization token is invalid'});
        } else {
            // Handle other errors or log them as needed
            console.error('Unhandled token verification error:', error);
            return res.status(401).json({
                error: 'Token verification failed',
                message: 'Failed to verify the authorization token'
            });
        }
    }
};
