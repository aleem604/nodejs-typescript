import pool from "../../util/database";
import mysql2 from "mysql2";

import { ObjectId, WithId } from "mongodb";
import { getDB } from "../../util/mongoClient"; // we'll create connectDB like before

export interface IUserEntity {
  _id?: ObjectId;   // MongoDB uses ObjectId instead of number
  name: string;
  email: string;
}

export class UserRepository {
  private collectionName = "users";

  // ✅ Create a new user
  async create(user: IUserEntity): Promise<IUserEntity> {
    const db = getDB();

    console.log("Creating user:", db);
    const result = await db.collection<IUserEntity>(this.collectionName).insertOne(user);
    return { ...user, _id: result.insertedId };
  }

  // ✅ Find user by ID
  async findById(id: string): Promise<IUserEntity | null> {
    const db = getDB();
    return db.collection<IUserEntity>(this.collectionName).findOne({ _id: new ObjectId(id) });
  }

  // ✅ Find all users
  async findAll(): Promise<IUserEntity[]> {
    const db = getDB();
    return db.collection<IUserEntity>(this.collectionName).find().toArray();
  }

  // ✅ Update user
  async update(id: string, user: Partial<IUserEntity>): Promise<boolean> {
    const db = getDB();
    const result = await db.collection<IUserEntity>(this.collectionName).updateOne(
      { _id: new ObjectId(id) },
      { $set: user }
    );
    return result.modifiedCount > 0;
  }

  // ✅ Delete user
  async delete(id: string): Promise<boolean> {
    const db = getDB();
    const result = await db.collection<IUserEntity>(this.collectionName).deleteOne({
      _id: new ObjectId(id),
    });
    return result.deletedCount > 0;
  }
}
