import express from "express";
import bodyParser from "body-parser";
import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import { engine } from "express-handlebars";
import path from "path";
import { get404Page } from "./controllers/ErrorController";
import mongoConnect from "./util/mongoClient";
import mongoSeed from "./util/mongo-sync";

const app = express();

// Register Handlebars engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "views/hbs/layouts"),
    partialsDir: path.join(__dirname, "views/hbs/partials"),
    helpers: {
      gt: (a: number, b: number) => a > b,
      length: (arr: any[]) => arr.length,
      year: () => new Date().getFullYear(),
      upper: (str: string) => str.toUpperCase(),
    },
  })
);

// app.set("view engine", "hbs");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views",'hbs'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404Page);

mongoConnect(() => {
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
    mongoSeed().catch(console.error);
  });
});
