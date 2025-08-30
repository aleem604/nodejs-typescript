import { ObjectId } from "mongodb";
import { getDB } from "../../util/mongoClient";

export interface IProductEntity {
  _id?: ObjectId;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  userId: ObjectId; // reference to User _id
}

export class ProductRepository {
  private collectionName = "products";

  // ✅ Get all products
  async getAll(): Promise<IProductEntity[]> {
    const db = getDB();
    return db.collection<IProductEntity>(this.collectionName).find().toArray();
  }

  // ✅ Get product by ID
  async getById(id: string): Promise<IProductEntity | null> {
    const db = getDB();
    return db
      .collection<IProductEntity>(this.collectionName)
      .findOne({ _id: new ObjectId(id) });
  }

  // ✅ Create new product
  async create(entity: Omit<IProductEntity, "_id">): Promise<ObjectId> {
    const db = getDB();
    const result = await db.collection<IProductEntity>(this.collectionName).insertOne({
      ...entity,
      userId: new ObjectId(entity.userId), // ensure userId is stored as ObjectId
    });
    return result.insertedId;
  }

  // ✅ Update product
  async update(id: string, entity: Partial<IProductEntity>): Promise<boolean> {
    const db = getDB();
    const result = await db.collection<IProductEntity>(this.collectionName).updateOne(
      { _id: new ObjectId(id) },
      { $set: entity }
    );
    return result.modifiedCount > 0;
  }

  // ✅ Delete product
  async delete(id: string): Promise<boolean> {
    const db = getDB();
    const result = await db.collection<IProductEntity>(this.collectionName).deleteOne({
      _id: new ObjectId(id),
    });
    return result.deletedCount > 0;
  }
}
