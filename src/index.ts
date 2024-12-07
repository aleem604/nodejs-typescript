import express, { Request, Response, NextFunction } from "express";

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.send(`<h1>Hello from Express()`);
  next();
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

//const server = http.createServer(app);

app.listen(3000);
