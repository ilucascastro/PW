import express, { Request, Response } from "express";
import dotenv from "dotenv";
import {engine} from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import {v4} from "uuid";

import router from "./router/router"
import logger from "./middleware/logger";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3333;

app.engine("handlebars", engine({ helpers: require(`${__dirname}/views/helpers/helpers.ts`)}));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(logger("combined")); // based on requirement
app.use("/img", express.static(`${__dirname}/../public/img`))
app.locals.valor = "10"
app.use(cookieParser());
app.use(session({
  genid: () => v4(),
  secret: "sima",
  saveUninitialized: true,
  resave: true,
  cookie: {maxAge: 360000},
}));
app.use(express.urlencoded({ extended: false}))
app.use(router);


app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
