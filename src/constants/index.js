export const productsCollection = "products";
export const cartsCollection = "carts"
import { connectDB } from "../config/dbConnection.js";
// import { ProductsMongo } from "../dao/managers/mongo/productsMongo.js";
// import { CartMongo } from "../dao/managers/mongo/cartMongo.js";
import { usersMongo } from "../dao/managers/mongo/userMongo.js";

connectDB();
export const userService=new usersMongo()
// const productService = new ProductsMongo();
// const cartService = new CartMongo();