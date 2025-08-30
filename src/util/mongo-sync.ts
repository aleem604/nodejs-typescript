import { CartRepository } from "../repositry/mongo/cartRepository";
import { ProductRepository } from "../repositry/mongo/productRepository";
import { UserRepository } from "../repositry/mongo/userRepository";
import mongoConnect from "./mongoClient";

const mongoSeed = async () => {
    const userRepo = new UserRepository();
    const productRepo = new ProductRepository();
    const cartRepo = new CartRepository();

    // Create user
    // const user = await userRepo.create({
    //   name: "aleem",
    //   email: "aleem604@gmail.com",
    // });

    const user = await userRepo.findAll().then(users => users[0]);
    

    // Create product
    const productId = await productRepo.create({
      title: "Alien ware M15 R7",
      description: "Gaming Laptop",
      imageUrl: "https://example.com/alienware-m15.jpg",
      price: 2500,
      userId: user._id!,
    });

    const products = [
      {
        title: "Samsung Galaxy S24 Ultra",
        description: "Latest flagship phone from Samsung",
        imageUrl: "https://example.com/galaxy-s24.jpg",
        price: 1800,
        userId: user._id!,
      },
      {
        title: "Apple iPhone 15 Pro",
        description: "Newest iPhone with titanium frame",
        imageUrl: "https://example.com/iphone-15.jpg",
        price: 2000,
        userId: user._id!,
      },
      {
        title: "Sony WH-1000XM5 Headphones",
        description: "Noise-canceling over-ear headphones",
        imageUrl: "https://example.com/sony-wh1000xm5.jpg",
        price: 400,
        userId: user._id!,
      },
      {
        title: "Dell XPS 15 Laptop",
        description: "High-performance laptop for professionals",
        imageUrl: "https://example.com/dell-xps15.jpg",
        price: 2500,
        userId: user._id!,
      },
    ];


    await productRepo.createMany(products);
    // Add to cart
    await cartRepo.addToCart({
      userId: user._id!.toString(),
      productId: productId.toString(),
      quantity: 1,
    });

    // Get cart
    const cart = await cartRepo.getCartByUser(user._id!.toString());
    console.log("Cart:", cart);

    // Remove item
    ///await cartRepo.removeFromCart(cart[0]._id.toString());

    // Clear cart
    //await cartRepo.clearCart(user._id!.toString());
};

export default mongoSeed;

mongoSeed().catch(console.error);
