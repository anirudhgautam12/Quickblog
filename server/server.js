import express from "express";
import "dotenv/config";
import cors from "cors";
import connectdb from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import subscriberRouter from "./routes/subscriberRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();

// Connect to DB
await connectdb();

// Middleware
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map(url => url.trim().replace(/\/$/, ""))
  : ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    // If wildcard '*' was specified or origin is in allowedOrigins
    if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow Vercel preview deployments if FRONTEND_URL is set to match vercel.app
    if (origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }

    return callback(new Error(`CORS policy does not allow access from origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);
app.use("/api/subscribe", subscriberRouter);
app.use("/api/ai", aiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});

export default app;
