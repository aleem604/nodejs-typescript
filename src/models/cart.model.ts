// src/models/product.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../util/sequelizedb";
import { User } from "./user.model";
import { Product } from "./product.model";

interface CartAttributes {
  id: number;
  productId: number;
  userId: number;
  quantity: number;
}

interface CartCreationAttributes extends Optional<CartAttributes, "id"> {}

export class Cart
  extends Model<CartAttributes, CartCreationAttributes>
  implements CartAttributes
{
  public id: number;
  public productId: number;
  public userId: number;
  public quantity: number;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: "carts",
    timestamps: true,
  }
);

// Associations

// Associations
User.hasMany(Cart, { foreignKey: "userId", as: "cart" });
Product.hasMany(Cart, { foreignKey: "productId", as: "cart" });
Cart.belongsTo(User, { foreignKey: "userId", as: "user" });
Cart.belongsTo(Product, { foreignKey: "productId", as: "product" });
