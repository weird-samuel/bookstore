import express from "express";
import { port, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
})



mongoose.connect(mongoDBURL)
.then(() => {
    console.log('Database connected');
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}\nvisit http://localhost:${port}`);
    })
})
.catch((error) => console.log(error))