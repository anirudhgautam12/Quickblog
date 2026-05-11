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
const allowedOrigins = process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : '*';
app.use(cors({
  origin: allowedOrigins,
  credentials: true
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
