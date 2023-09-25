import { Router } from "express";
/*
import { CartManager } from "../dao/cartManager.js";
import { ProductManager } from "../dao/productManager.js";
*/
import { CartMongo } from "../dao/managers/mongo/cartMongo.js";
import { productsDao, cartService } from "../constants/index.js";

import { CartController } from "../controllers/carts.controller.js";


export const cartService = new CartMongo()


const router = Router();

router.get("/carts",CartController.RenderCart);


router.post("/carts",CartController.createCart);

router.get("/:cid",CartController.getCart);

router.post("/:cid/product/:pid",async(req,res)=>{
    try {
        const cartID = req.params.cid;
        const productId = req.params.pid;
        const cart = await cartService.getById(cartID)
        const product = await productsDao.getById(productId)

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
        await cartService.update(cartID,cart)
        res.json({status:"succes",data:cartCreated})
    } catch (error) {
        res.json({status:"error", message:error.message});
    }


});

router.put("/carts",async(req,res)=>{})

export { router as cartsRouter} 