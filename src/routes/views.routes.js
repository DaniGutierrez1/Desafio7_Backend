import { Router } from "express";
import { ProductManager } from "../dao/managers/fileSystem/productsFiles.js";
import { ProductsMongo } from "../dao/managers/mongo/productsMongo.js";

const productService = new ProductManager('products.json')
const productServiceDB = new ProductsMongo('products.json')

const router = Router();

router.get("/",async(req,res)=>{
    const products = await productService.get();
    res.render("home",{products})
    

});

router.get("/realtimeproducts",(req,res)=>{
    res.render("realTimeProducts")
});

router.get("/products",async (req,res)=>{
    const products = await productServiceDB.get();
    res.render("products",{products})

});

export {router as viewsRouter}