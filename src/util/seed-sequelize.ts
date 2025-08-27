import { User } from "../models/user.model";
import { connectDB } from "./sequelizedb";
import { Product } from "../models/product.model";
import { Cart } from "../models/cart.model";

export const seedDatabase = async () => {
    await connectDB();

  // Create user
  const user = await User.create({
    name: "Alice 2",
    email: "alice 2@example.com",
  });

  // Create product
  const product = await Product.create({
    title: "Tabled",
    price: 799,
    description: "Latest model tablet",
    imageUrl: "http://example.com/tablet.jpg",
    userId: user.id,
  });

  // Add product to cart
  const cart = await Cart.create({
    userId: user.id,
    productId: product.id,
    quantity: 2,
  });

  // Fetch cart with relations
  const fetchedCart = await Cart.findByPk(cart.id, {
    include: ["user", "product"],
  });

  console.log(JSON.stringify(fetchedCart, null, 2));

};


seedDatabase();