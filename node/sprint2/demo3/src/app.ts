import express from "express"; // ES6
import router from "./routes";
// const express = require("express");

const app = express(); // app = Flask(__name__)

app.use(express.json()); // para poder receber o body da requisição
app.use("/api", router);

export default app;
