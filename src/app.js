import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization", "X-Custom-Header"],
  optionsSuccessStatus: 200
}))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())
// routes import
import userRouter from "./routes/user.routes.js"

// routes declaration
app.use("/api/v1/users", userRouter)

// error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Something went wrong"

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: err.errors || [],
  })
})

export { app }

