import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import routes from './routes/api/todos';
// import cookieParser from 'cookie-parser';
// import csrf from 'csurf';

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
// app.use(cookieParser());
// app.use(csrf({ cookie: true }));

app.use("/todoApp/api", routes);

export default app;
