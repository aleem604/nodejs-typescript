import express from "express";
const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log(req.url, "from middleware");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World from TS!6!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
