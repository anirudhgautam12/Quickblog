import crypto from "crypto";
import nodemailer from "nodemailer";
import Subscriber from "../models/Subscriber.js";

// Basic email validation regex
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

// Configure Nodemailer transporter (Using a generic setup. 
// User needs to provide valid SMTP details in .env for production)
const createTransporter = () => {
  return nodemailer.createTransport({
    // Using Ethereal or standard SMTP configuration based on environment variables
    // For local dev without env variables, it will use a mock/test configuration or fail gracefully if missing
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || "your-email@gmail.com",
      pass: process.env.SMTP_PASS || "your-app-password",
    },
  });
};

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Validation
    if (!email || !validateEmail(email)) {
      return res.status(400).json({ success: false, message: "Please provide a valid email address." });
    }

    // 2. Metadata Extraction
    const metadata = {
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.headers["user-agent"],
    };

    // 3. Duplicate Prevention & Re-subscription
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return res.status(400).json({ success: false, message: "You are already actively subscribed!" });
      } else {
        // Re-subscribe them
        existingSubscriber.isActive = true;
        existingSubscriber.metadata = metadata;
        await existingSubscriber.save();
        return res.status(200).json({ success: true, message: "Welcome back! You have been re-subscribed." });
      }
    }

    // 4. Create new subscriber with unsubscription token
    const unsubscribeToken = crypto.randomBytes(32).toString("hex");

    await Subscriber.create({
      email,
      unsubscribeToken,
      metadata,
    });

    // 5. Send Welcome Email (Fire and forget, don't block response if email fails)
    try {
      const transporter = createTransporter();
      const unsubscribeUrl = `http://localhost:5173/unsubscribe/${unsubscribeToken}`;

      await transporter.sendMail({
        from: '"QuickBlog Newsletter" <noreply@quickblog.com>',
        to: email,
        subject: "Welcome to our Newsletter!",
        html: `
          <h1>Welcome aboard!</h1>
          <p>Thank you for subscribing to the QuickBlog newsletter. We'll keep you updated with the latest articles.</p>
          <br/>
          <p style="font-size: 12px; color: gray;">
            If you wish to stop receiving these emails, you can 
            <a href="${unsubscribeUrl}">unsubscribe here</a>.
          </p>
        `,
      });
      console.log(`Welcome email sent to ${email}`);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError.message);
      // We still return success since the subscription succeeded
    }

    res.status(201).json({ success: true, message: "Successfully subscribed to the newsletter!" });
  } catch (error) {
    console.error("Subscription Error:", error);
    res.status(500).json({ success: false, message: "An internal server error occurred." });
  }
};

export const unsubscribeNewsletter = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ success: false, message: "Invalid unsubscription link." });
    }

    const subscriber = await Subscriber.findOne({ unsubscribeToken: token });

    if (!subscriber) {
      return res.status(404).json({ success: false, message: "Subscriber not found." });
    }

    if (!subscriber.isActive) {
      return res.status(400).json({ success: false, message: "You are already unsubscribed." });
    }

    subscriber.isActive = false;
    await subscriber.save();

    res.status(200).json({ success: true, message: "You have been successfully unsubscribed." });
  } catch (error) {
    console.error("Unsubscribe Error:", error);
    res.status(500).json({ success: false, message: "An internal server error occurred." });
  }
};
