import { Router } from "express";
import { ProductManager } from "../dao/productManager.js";

const productService = new ProductManager('products.json')

const router = Router();

router.get("/",async(req,res)=>{
    const products = await productService.get();
    res.render("home",{products})
    

});

router.get("/realtimeproducts",(req,res)=>{
    res.render("realTimeProducts")
});

export {router as viewsRouter}