const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const port = process.env.PORT;

const connectDB = require("./database/config");

connectDB()
.then(() => {
  if (process.env.NODE_ENV === "dev") {
    app.use(morgan("dev"));
  }
  app.use(express.json());

  app.use("/api/v1/jobs", require("./routers/jobsRouter"));
  app.use("/api/v1/auth", require("./routers/authRouter"));

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  })
})
.catch((err) => {
  console.log("Critical Error, server shutting down!", err.message);
  process.exit(1)
})

