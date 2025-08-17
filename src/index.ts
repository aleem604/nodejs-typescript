import express from "express";

import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded());

app.get("/add-product", (req, res, next) => {
  res.send(
    `<form action="/product" method="POST"><input type="text" name="title" /> <button type="submit">Submit</button></form>`
  );
});

app.post("/product", (req, res, next) => {
  console.log(req.body.title);
  res.redirect("/");
});

app.get("/", (req, res, next) => {
  res.send("<h1>Hello from Express</h1>");
});

app.listen(3000);
