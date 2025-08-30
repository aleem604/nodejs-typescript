import { ObjectId } from "mongodb";
import mongoConnect, { getDB } from "../../util/mongoClient";

export interface Product {
  _id?: ObjectId;
  title:string,
  imageUrl:string,
  description:string,
  price:number,
  userId: ObjectId; // Reference to User
}

export class ProductRepository {
  private collectionName = "products";

  async create(product: Product): Promise<Product> {
    const db = getDB();
    const result = await db.collection<Product>(this.collectionName).insertOne(product);
    return { ...product, _id: result.insertedId };
  }

  async findAll(): Promise<Product[]> {
    const db = getDB();
    return db.collection<Product>(this.collectionName).find().toArray();
  }

  async findById(id: string): Promise<Product | null> {
    const db = getDB();
    return db.collection<Product>(this.collectionName).findOne({ _id: new ObjectId(id) });
  }
}
