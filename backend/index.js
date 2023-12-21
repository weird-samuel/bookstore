import express from "express";
import { port, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";

const app = express();
// Middleware to parse JSON data
app.use(express.json());

app.get("/", (req, res) => {
  res.status(234).send("Hello World");
});

app.use("/books", booksRoute);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(
        `Server is listening on port ${port}\nvisit http://localhost:${port}`
      );
    });
  })
  .catch((error) => console.log(error));
