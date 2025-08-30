import { ObjectId } from "mongodb";
import { getDB } from "../../util/mongoClient";

// Cart entity interface

export interface ICartItemEntity {
  productId: string;

}


export interface ICartEntity {
  _id?: string;
  productId: string; // references product._id
  userId: string; // references user._id
  quantity: number;
  dateCreated?: Date;
}

export class CartRepository {
  private collectionName = "carts";

  // Add product to cart
  async addToCart(cart: ICartEntity): Promise<string> {
    const db = getDB();
    const result = await db
      .collection<ICartEntity>(this.collectionName)
      .insertOne({
        ...cart,
        dateCreated: new Date(),
      });
    return result.insertedId.toString();
  }

  // Get all cart items for a user (with product lookup)
  async getCartByUser(userId: string): Promise<any[]> {
    const db = getDB();
    return db
      .collection(this.collectionName)
      .aggregate([
        { $match: { userId } },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $project: {
            _id: 1,
            productId: 1,
            quantity: 1,
            dateCreated: 1,
            "product.title": 1,
            "product.price": 1,
          },
        },
      ])
      .toArray();
  }

  // Find product in a user's cart
  async findProduct(
    productId: string,
    userId: string
  ): Promise<ICartEntity | null> {
    const db = getDB();
    return db.collection<ICartEntity>(this.collectionName).findOne({
      userId,
      productId,
    });
  }

  // Update quantity in cart
  async updateQuantity(cartId: string, quantity: number): Promise<void> {
    const db = getDB();
    await db
      .collection(this.collectionName)
      .updateOne({ _id: new ObjectId(cartId) }, { $set: { quantity } });
  }

  // Remove single item
  async removeFromCart(cartId: string): Promise<void> {
    const db = getDB();
    await db
      .collection(this.collectionName)
      .deleteOne({ _id: new ObjectId(cartId) });
  }

  // Clear all items for a user
  async clearCart(userId: string): Promise<void> {
    const db = getDB();
    await db.collection(this.collectionName).deleteMany({ userId });
  }
}
