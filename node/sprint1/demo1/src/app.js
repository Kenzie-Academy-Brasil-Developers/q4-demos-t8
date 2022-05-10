import express from "express"; // ES6
// const express = require("express");

const app = express(); // app = Flask(__name__)

const DB = [
  {
    name: "Pedro",
    age: 65,
    aka: "Cláudio",
  },
];

app.use(express.json()); // para poder receber o body da requisição

// app.get("/send-endpoint", (_, res) => {
//   return res.status(200).send({res: "send endpoint!!"});
// });

// middlewares
const verifyUserExists = (req, res, next) => {
  const user = req.body;

  const found_user = DB.find(
    ({ name }) => name.toLowerCase() === req.body.name.toLowerCase()
  );

  if (found_user) {
    return res.status(409).json({ message: "name already exists!" });
  }

  req.user = user;

  return next();
};

// rotas
app.get("/api", (_, res) => {
  return res.status(200).json({ users: DB });
});

app.post("/api", verifyUserExists, (req, res) => {
  const { user } = req;

  DB.push(user);

  return res.status(201).json(user);
});

export default app;
