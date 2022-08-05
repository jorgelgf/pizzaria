import express, { Request, Response, NextFunction } from "express";
//importar lib abaixo sempre em segundo
import "express-async-errors";
import cors from "cors";
import path from "path";

import { router } from "./routes";

const app = express();
app.use(express.json());

//adc cors
app.use(cors());
app.use(router);

app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  //verificando se a rota passando é do tipo erro
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});
app.listen(3330, () => console.log("Online Server"));
