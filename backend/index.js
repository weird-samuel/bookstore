import express from "express";
import { port, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
// Middleware to parse JSON data
app.use(express.json());
// Middleware to handle CORS policy
// Optoin 1 - Allow all origins using cors default options
app.use(cors());

// option 2 - Allow specific origins
// app.use(
//   cors({
//     origin: "https://bookstore-frontend-livid.vercel.app/",
//     methods: "GET, POST, PUT, DELETE",
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.get("/", (req, res) => {
  res.status(234).send("You should not be here");
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
