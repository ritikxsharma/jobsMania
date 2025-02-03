const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const port = process.env.PORT;

const connectDB = require("./database/config");

const { authenticateUser } = require("./middlewares/authentication");
const cookieParser = require("cookie-parser");

const path = require("path");

connectDB()
  .then(() => {
    if (process.env.NODE_ENV === "dev") {
      app.use(morgan("dev"));
    }    
    app.use(express.static(path.resolve(__dirname, "./public")));
    app.use(express.json());
    app.use(cookieParser());

    app.use("/api/v1/jobs", authenticateUser, require("./routers/jobsRouter"));
    app.use("/api/v1/user", authenticateUser, require("./routers/userRouter"));
    app.use("/api/v1/auth", require("./routers/authRouter"));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, './public', 'index.html'))
    })

    app.use('*', (req, res) => {
      res.status(404).json({ message: "Page not found!" })
    })

    app.use(errorHandler);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Critical Error, server shutting down!", err.message);
    process.exit(1);
  });
