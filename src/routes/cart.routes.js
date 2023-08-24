import { Router } from "express";
/*
import { CartManager } from "../dao/cartManager.js";
import { ProductManager } from "../dao/productManager.js";
*/
import { CartMongo } from "../dao/managers/mongo/cartMongo";

const cartService = new CartMongo()
//const productService = new ProductManager("products.json")

const router = Router();

router.get("/carts",async(req,res)=>{
    try {
        const cartCreated = await cartService.get()
        res.json({status:"succes",data:cartCreated})
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});


router.post("/carts",async(req,res)=>{
    try {
        const cartInfo=req.body;
        const cartCreated=await cartService.save(cartInfo)
        res.json({status:"succes",data:cartCreated})
    } catch (error) {
        res.json({status:"error",message:error.message});
    }
});

router.get("/:cid",async(req,res)=>{ 
    try {
        const cartId = req.params.cid;
        const cart = await cartService.getByID(cartId)
        if(cartId){
            res.json({status:"succes",data:cart, message:"El carrito ha sido encontrado"})
        }else{
            
            res.json({status:"error", message:"El carrito no existe"})
        }
        
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

router.post("/:cid/product/:pid",async(req,res)=>{
    try {
        const cartID = req.params.cid;
        const productId = req.params.pid;
        const cart = await cartService.getById(cartId)
        const product = await productService.getById(productId)

        /* const products = cart.products; */
        //verificar si el producto ya existe en el carrito
        //condicion
        //si existe el producto, a ese producto se le suma uno en cantidad
        // Si no existe, agregar el producto

            // const newProduct={
            //     product:productID,
            //     quantify:1
            // }
            // cartID.products.push(newProduct)
        await cartService.update(cartId,cart)
        res.json({status:"succes",data:cartCreated})
    } catch (error) {
        res.json({status:"error", message:error.message});
    }


});

router.put("/carts",async(req,res)=>{})

export { router as cartsRouter} 