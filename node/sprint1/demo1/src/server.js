import app from "./app";

const PORT = 3000; // pode rodar na 3333 também.

app.listen(PORT, () => {
  console.log(`App running!\nhttp://localhost:${PORT}/`);
});
