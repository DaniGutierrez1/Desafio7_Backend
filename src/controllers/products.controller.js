import { ProductsService } from "../services/product.service.js";

import { productsDao } from "../routes/products.routes.js";

export class ProductsController{
    static getProducts= async(req,res)=>{
        try {
            const limit = req.query.limit;
            const products = await ProductsService.getProducts();
            if(limit){
                
                res.json({status:"succes",data:products.lenght==limit})
            }else{
                
                res.json({status:"succes", data:products})
            }
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static getProduct = async (req,res)=>{
        try {
            const id = req.body;
            const productSearch = await ProductsService.getProduct(id);
            if(id){
                
                res.json({status:"succes",data:productSearch, message:"El producto ha sido encontrado"})
            }else{
                
                res.json({status:"error", message:"El id no existe"})
            }
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static createProduct = async(req,res)=>{
    
        try {
            const productInfo=req.body;
            const productCreated = await ProductsService.createProduct(productInfo);
            res.json({status:"succes", data:productCreated, message:"El producto ha sido creado"});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
        
    };

    static updateProduct = async(req,res)=>{
    
    
        //Actualizar producto
    };

    static deleteProduct =async(req,res)=>{
        try {
            const id = req.body
            const productEliminated = await ProductsController.deleteProduct(id)
            res.json({status:"succes",message:"Producto eliminado"})
            
        } catch (error) {
            res.json({status:"error", message:error.message})
        }
    
    };
        
    
}