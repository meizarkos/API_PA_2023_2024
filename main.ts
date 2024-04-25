import express from "express";
import bodyParser from "body-parser";
import jwt from "jwt-express";
import { startOfDatabase } from "./src/utils";
import { errorHandler } from "./src/utils";
import { keyToken } from "./src/utils";
import * as routes from './src/routes';
import * as cruds from './src/models/crud';
import { patchRoute, createRoute, getAllRoute, getRoute, deleteRoute} from './src/routes/crud';

startOfDatabase();

const app = express();

app.use(bodyParser.json());
app.use(
  jwt.init(keyToken, {
    cookies: false,
  }),
);

Object.keys(routes).forEach((key) => {
  routes[key](app);
});

Object.keys(cruds).forEach((key) => {
  patchRoute(app, cruds[key]);
  createRoute(app, cruds[key]);
  getAllRoute(app, cruds[key]);
  getRoute(app, cruds[key]);
  deleteRoute(app, cruds[key]);
});

app.get("/", (_req, res) => {
  res.json({ message: "The API is working"});
});

app.use((_req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.use(errorHandler);

app.listen(3000,'127.0.0.1', () =>{ console.log(`Notre application Node est démarrée sur : https://helpother.fr ou http://localhost:3000`);});
