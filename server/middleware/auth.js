import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        // Get the Authorization header
        const authHeader = req.headers.authorization;
        
        // Check if Authorization header exists and has the correct format
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Please login first - No token provided",
            });
        }

        // Extract token from "Bearer <token>"
        const token = authHeader.split(' ')[1];
        
        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first - Invalid token format",
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user information to the request for use in routes
        req.user = decoded;
        
        next();
    } catch (error) {
        // Handle different JWT errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Please login first - Invalid token",
            });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Please login first - Token expired",
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Authentication error",
            });
        }
    }
}

export default auth;