import express from "express";
import bodyParser from "body-parser";
import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import { engine } from "express-handlebars";
import path from "path";
import { get404Page } from "./controllers/ErrorController";
import db from "./util/database";

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

// app.set("view engine", "hbs");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views",'hbs'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public')));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404Page);


db.execute('select id from products limit 1;').then((res)=> {
console.log(res[0]);

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
}).catch(err => {
  console.log('Failed to connect to the database:', err);
});