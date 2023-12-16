import express from "express";
import { port } from "./config.js";

const app = express();

app.listen(port, () => {
    console.log(`Server is listening on port ${port} \n visit http://localhost:${port}`);
})