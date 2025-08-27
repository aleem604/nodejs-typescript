// src/sync.ts
import { sequelize, connectDB } from "./sequelizedb";
import { User } from "../models/user.model";
import { Product } from "../models/product.model";
import { Cart } from "../models/cart.model";

const syncDB = async () => {
  await connectDB();
  await sequelize.sync({ alter: true }); // auto creates or updates schema
  console.log("✅ All models were synchronized successfully!");
};



export default syncDB;

