// src/db.ts
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "mysql-node",   // database name
  "root",         // username
  "root",     // password
  {
    host: "localhost",
    dialect: "mysql",
    logging: false, // set true if you want SQL logs
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection established with Sequelize!");
  } catch (error) {
    console.error("❌ Unable to connect to MySQL:", error);
  }
};
 