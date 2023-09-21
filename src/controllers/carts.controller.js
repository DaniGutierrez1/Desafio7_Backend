import { cartService } from "../routes/cart.routes.js";


export class CartController{
    static RenderCart = async(req,res)=>{
        try {
            const cartCreated = await cartService.get()
            res.json({status:"succes",data:cartCreated})
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static createCart = async(req,res)=>{
        try {
            const cartInfo=req.body;
            const cartCreated=await cartService.save(cartInfo)
            res.json({status:"succes",data:cartCreated})
        } catch (error) {
            res.json({status:"error",message:error.message});
        }
    };

    static getCart = async(req,res)=>{ 
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
    };
}