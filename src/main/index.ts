import * as express from "express";
import {Request, Response} from "express";
import {IApiNluOutput, IApiUtterance} from "hal-protocols";

import parse from "./parse";
const bodyParser = require("body-parser");

const port = process.env.NODE_PORT || 8081;
const app: express.Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.post("/parse", (req: Request, res: Response) => {
  const userInput: IApiUtterance = req.body;
  const output: IApiNluOutput = parse(userInput);
  res.send(output);
});

app.listen(port, () => {
  /* tslint:disable:no-console */
  console.log(`Example app listening on port ${port}!`);
});
