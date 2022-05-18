import app from "./app";
import { AppDataSource } from "./data-source";

const PORT = 3000; // pode rodar na 3333 também.

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected.");

    app.listen(PORT, () => {
      console.log(`App running!\nhttp://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
