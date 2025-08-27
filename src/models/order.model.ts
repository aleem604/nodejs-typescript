// models/Order.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../util/sequelizedb";

// Define attributes
interface OrderAttributes {
  id: number;
}

// For creation (id will be auto-generated)
interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> {}

// Define model class
class Order extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes {
  public id!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize model
Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED, // Better for IDs
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize, // passing sequelize instance
    tableName: "orders",
  }
);

export default Order;
