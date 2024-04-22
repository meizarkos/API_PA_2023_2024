import express from "express";
import bodyParser from "body-parser";
import jwt from "jwt-express";
import { startOfDatabase } from "./src/utils/db_handler";
import { errorHandler } from "./src/utils/error_handler";
import { keyToken } from "./src/utils/jwt";

startOfDatabase();

const app = express();

app.use(bodyParser.json());
app.use(
  jwt.init(keyToken, {
    cookies: false,
  }),
);

app.get("/", (_req, res) => {
  res.json({ message: "The API is working"});
});

app.use((_req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.use(errorHandler);

app.listen(3000,'127.0.0.1', () =>{ console.log(`Notre application Node est démarrée sur : https://helpother.fr ou http://localhost:3000`);});
