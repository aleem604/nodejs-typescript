import { Pool } from "mysql2/promise";
import pool from "./../../util/database"; // assume you export mysql pool from db.ts

export interface ICartEntity {
  id?: number;
  productId: number;
  userId: number;
  quantity: number;
  dateCreated?: Date;
}


export class CartRepository {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  // Add product to cart
  async addToCart(cart: ICartEntity): Promise<number> {
    const [result] = await this.pool.execute(
      `INSERT INTO cart (productId, userId, quantity) 
       VALUES (?, ?, ?)`,
      [cart.productId, cart.userId, cart.quantity]
    );
    return (result as any).insertId;
  }

  // Get all cart items for a user
  async getCartByUser(userId: number): Promise<ICartEntity[]> {
    const [rows] = await this.pool.execute(
      `SELECT c.id, c.productId, p.title, p.price, c.quantity, c.dateCreated
       FROM cart c
       JOIN products p ON c.productId = p.id
       WHERE c.userId = ?`,
      [userId]
    );
    return rows as ICartEntity[];
  }

  // Get all cart items for a user
  async findProduct(productId: number, userId: number): Promise<ICartEntity>{
    const [rows] = await this.pool.query<any[]>(
      `SELECT c.id, c.productId, p.title, p.price, c.quantity, c.dateCreated
       FROM cart c
       JOIN products p ON c.productId = p.id
       WHERE c.userId = ? and p.id = ? limit 1`,
      [userId, productId]
    );
    return rows.length ? rows[0] as ICartEntity : null;
  }

  // Update quantity in cart
  async updateQuantity(cartId: number, quantity: number): Promise<void> {
    await this.pool.execute(
      `UPDATE cart SET quantity = ? WHERE id = ?`,
      [quantity, cartId]
    );
  }

  // Remove single item
  async removeFromCart(cartId: number): Promise<void> {
    await this.pool.execute(
      `DELETE FROM cart WHERE id = ?`,
      [cartId]
    );
  }

  // Clear all items for a user
  async clearCart(userId: number): Promise<void> {
    await this.pool.execute(
      `DELETE FROM cart WHERE userId = ?`,
      [userId]
    );
  }
}
