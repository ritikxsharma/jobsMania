const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const connectDB = require("./database/config");

const { authenticateUser } = require("./middlewares/authentication");
const cookieParser = require("cookie-parser");

const path = require("path");

connectDB()
  .then(() => {
    if (process.env.NODE_ENV === "dev") {
      app.use(morgan("dev"));
    }

    app.use(express.json());
    app.use(cookieParser());
    app.use(
      cors({
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
      })
    );

    app.use("/api/v1/jobs", authenticateUser, require("./routers/jobsRouter"));
    app.use("/api/v1/user", authenticateUser, require("./routers/userRouter"));
    app.use("/api/v1/auth", require("./routers/authRouter"));

    if (process.env.NODE_ENV === "production") {
      const clientPath = path.resolve(__dirname, "public");
      app.use(express.static(clientPath));
      app.get("*", (req, res) => {
        res.sendFile(path.resolve(clientPath, "index.html"));
      });
    }

    app.use("*", (req, res) => {
      res.status(404).json({ message: "API endpoint not found" });
    });

    app.use(errorHandler);

    app.listen(port, () => {
      if (process.env.NODE_ENV === "dev") {
        console.log(`Server running on http://localhost:${port}`);
      } else {
        console.log(`Server is running.`);
      }
    });
  })
  .catch((err) => {
    console.log("Critical Error, server shutting down!", err.message);
    process.exit(1);
  });
