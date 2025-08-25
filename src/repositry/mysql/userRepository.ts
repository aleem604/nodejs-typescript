import pool from "../../util/database";
import mysql2 from "mysql2";

export interface IUserEntity {
  id: number;
  name:string;
  email:string

}

export class UserRepository {
  // ✅ Create a new user
  async create(user: IUserEntity): Promise<IUserEntity> {
    const [result] = await pool.execute<mysql2.ResultSetHeader>(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [user.name, user.email]
    );

    return { id: (result as any).insertId, ...user };
  }

  // ✅ Find user by ID
  async findById(id: number): Promise<IUserEntity | null> {
    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
    const users = rows as IUserEntity[];
    return users.length ? users[0] : null;
  }

  // ✅ Find all users
  async findAll(): Promise<IUserEntity[]> {
    const [rows] = await pool.execute("SELECT * FROM users");
    return rows as IUserEntity[];
  }

  // ✅ Update user
  async update(id: number, user: Partial<IUserEntity>): Promise<boolean> {
    const [result] = await pool.execute(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [user.name, user.email, id]
    );
    return (result as any).affectedRows > 0;
  }

  // ✅ Delete user
  async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute("DELETE FROM users WHERE id = ?", [id]);
    return (result as any).affectedRows > 0;
  }
}
