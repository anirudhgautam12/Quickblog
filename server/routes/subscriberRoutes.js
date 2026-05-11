import express from "express";
import { subscribeNewsletter, unsubscribeNewsletter } from "../controllers/subscriberController.js";
import rateLimit from "express-rate-limit";

// Rate limiting for subscription endpoint
const subscribeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // Limit each IP to 5 subscribe requests per `window` (here, per hour)
  message: { success: false, message: "Too many subscription requests from this IP, please try again after an hour." },
  standardHeaders: true, 
  legacyHeaders: false, 
});

const subscriberRouter = express.Router();

subscriberRouter.post("/", subscribeLimiter, subscribeNewsletter);
subscriberRouter.get("/unsubscribe/:token", unsubscribeNewsletter);

export default subscriberRouter;
