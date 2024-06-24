import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import RecipeRouter from "./v1/recipes";
import AuthRouter from "./v1/auth";
import UserRouter from "./v1/user";

const app = express();

export class Application {
  constructor() {
    this.setupApplicationSettings();
    this.setupControllers();
  }

  setupApplicationSettings() {
    app.use(cors());
    app.use(urlencoded({ extended: false }));
    app.use(json());
  }

  listen() {
    app.listen(3080, () => console.log("Listening on port 3080"));
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
