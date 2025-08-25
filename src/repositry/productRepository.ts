import pool from "../util/database";

export interface IProductEntity {
  id: number;
  title:string,
  imageUrl:string,
  description:string
}

export class UserRepository {
  async getAll(): Promise<IProductEntity[]> {
    const [rows] = await pool.query<any[]>("SELECT * FROM products");
    return rows as IProductEntity[];
  }

  async getById(id: number): Promise<IProductEntity[] | null> {
    const [rows] = await pool.query<any[]>(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    return rows.length ? rows[0] as Array<IProductEntity> : null;
  }

  async create(entity: Omit<IProductEntity, "id">): Promise<number> {
    const [result]: any = await pool.execute(
      "INSERT INTO products (title, description, imageUrl) VALUES (?, ?, ?)",
      [entity.title, entity.description, entity.imageUrl]
    );
    return result.insertId; // returns new user ID
  }

  async update(id: number, entity: Partial<IProductEntity>): Promise<boolean> {
    const [result]: any = await pool.execute(
      "UPDATE products SET title = ?, imageUrl = ?, description= ? WHERE id = ?",
      [entity.title, entity.imageUrl, entity.description, id]
    );
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result]: any = await pool.execute(
      "DELETE FROM products WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}