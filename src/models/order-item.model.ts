// models/OrderItem.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../util/sequelizedb";

// Define the attributes
interface OrderItemAttributes {
  id: number;
  quantity: number;
}

// For creation (id will be auto-generated)
interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, "id"> {}

// Define the model class
class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes {
  public id!: number;
  public quantity!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize model
OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED, // UNSIGNED is a good practice for IDs
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize, // passing the `sequelize` instance
    tableName: "orderItems",
  }
);

export default OrderItem;
