import express from "express";
import bodyParser from "body-parser";
import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import { engine } from "express-handlebars";
import path from "path";
import { get404Page } from "./controllers/ErrorController";
import db from "./util/database";
import { sequelize } from "./util/sequelizedb";
import syncDB from "./util/sync";
import { User } from "./models/user.model";

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


sequelize.sync()
  .then(result => {
    return User.findOne({ where: { email: 'aleem604@gmail.com' } });
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Aleem', email: 'aleem604@gmail.com' });
    }
    return user;
  })
  // .then(user => {
  //   // console.log(user);
  //   return user.createCart();
  // })
  .then(cart => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
