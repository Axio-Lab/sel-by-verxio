import { Application, json, urlencoded } from "express";
import * as dotenv from 'dotenv';
dotenv.config();
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import asyncError from "./errors.middlewares";
import indexRoutes from "../routes/index.routes";

export default (app: Application) => {
  app.use(morgan('combined'));
  app.use(cors());
  app.use(json());
  app.use(helmet());
  app.use(cookieParser());
  app.use(urlencoded());
  app.use(asyncError);
  indexRoutes(app);
};