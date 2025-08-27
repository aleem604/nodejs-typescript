// src/models/user.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../util/sequelizedb";

// Define attributes
interface UserAttributes {
  id: number;
  name: string;
  email: string;
}

// For creation (id auto-generated)
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Sequelize model
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
}

// Init model
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true, // adds createdAt & updatedAt
  }
);
