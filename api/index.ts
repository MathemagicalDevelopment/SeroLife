require('dotenv').config();

import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import RecipeRouter from "./v1/recipes";
import AuthRouter from "./v1/auth";
import UserRouter from "./v1/user";
import { connectToDb } from "./helpers/connectToDb";
console.log(require('dotenv').config())

const app = express();

export class Application {
  constructor() {
    this.setupApplicationSettings();
    this.setupControllers();
  }

  setupApplicationSettings() {
    app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
}));
    app.use(urlencoded({ extended: false }));
    app.use(json());
  }

  async listen() {
    const connected = connectToDb();
    if (connected) {
      app.listen(3080, () => console.log("Listening on port 3080"));
    } else {
      process.exit(0);
    }
  }

  setupControllers() {
    app.use("/auth", AuthRouter);
    app.use("/recipes", RecipeRouter);
    app.use("/user", UserRouter);
    app;
  }
}

const application = new Application();

application.listen();
