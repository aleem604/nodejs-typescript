import express from "express";
import bodyParser from "body-parser";
import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import { engine } from "express-handlebars";
import path from "path";

const app = express();

// Register Handlebars engine
app.engine("hbs", engine({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "views/hbs/layouts"),
  partialsDir: path.join(__dirname, "views/hbs/partials"),
  helpers: {
    gt: (a: number, b: number) => a > b,
    length: (arr: any[]) => arr.length,
    year: () => new Date().getFullYear(),
    upper: (str: string) => str.toUpperCase()
  }
}));

app.set("view engine", "hbs");
// app.set("view engine", "ejs");
// app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views",'hbs'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public')));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});


app.listen(3000);
