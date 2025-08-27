import { sequelize, connectDB } from "./sequelizedb";

const syncDB = async () => {
  await connectDB();
  await sequelize.sync({ alter: true }); // auto creates or updates schema
  console.log("✅ All models were synchronized successfully!");
};



export default syncDB;

