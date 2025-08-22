import express from "express";
import bodyParser from "body-parser";
import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import { engine } from "express-handlebars";
import path from "path";
import open from "open";
import { exec } from "child_process";
import { get } from "http";
import { get404Page } from "./controllers/ErrorController";

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

app.use(get404Page);


app.listen(3000, async () => {
  console.log("Server is running on http://localhost:3000");
 const url = "http://localhost:3000";

//  switch (process.platform) {
//     case "darwin": // Mac
//       exec(`open ${url}`);
//       break;
//     case "win32": // Windows
//       exec(`start ${url}`);
//       break;
//     case "linux": // Linux
//       exec(`xdg-open ${url}`);
//       break;
//   }
});
