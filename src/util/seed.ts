import pool from "./database";
import { v4 as uuid } from "uuid";

const populateDb = async () => {

try {
    console.log("🌱 Starting database seeding...");

    // --- Clear old data (optional for users/products) ---
    await pool.query("DELETE FROM products");
    await pool.query("DELETE FROM users");

    // Insert Users (check if not exists)
    const users = [
      { name: "Alice Johnson", email: "alice@example.com" },
      { name: "Bob Smith", email: "bob@example.com" },
      { name: "Charlie Brown", email: "charlie@example.com" },
    ];

    for (const user of users) {
      await pool.query(
        `INSERT IGNORE INTO users (name, email)
         SELECT ?, ?
         WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = ?)`,
        [user.name, user.email, user.email]
      );
    }

    // Fetch user IDs to assign products
    const [userRows] = await pool.query("SELECT id FROM users");
    const userIds = (userRows as any[]).map((u) => u.id);

    // Insert Products (50+ dummy items)
    const products = Array.from({ length: 500 }, (_, i) => ({
      title: `Product ${i + 1}`,
      price: (Math.random() * 100 + 10).toFixed(2),
      description: `This is the description for product ${i + 1}.`,
      imageUrl: `https://picsum.photos/seed/${uuid()}/400/300`,
      userId: userIds[Math.floor(Math.random() * userIds.length)],
    }));

    for (const product of products) {
      await pool.query(
        `INSERT IGNORE INTO products (title, price, description, imageUrl, userId)
         VALUES (?, ?, ?, ?, ?)`,
        [
          product.title,
          product.price,
          product.description,
          product.imageUrl,
          product.userId,
        ]
      );
    }

    console.log("✅ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    pool.end();
  }

};

export default populateDb;

populateDb();