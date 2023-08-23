import { Router } from "express";
//import { ProductManager } from "../dao/managers/fileSystem/productsFiles.js";

// const productService = new ProductManager('products.json')

import { ProductsMongo } from "../dao/managers/mongo/productsMongo.js";

const productService=new ProductsMongo()

const validateFields = (req,res,next)=>{
    const productInfo = req.body
    if(!productInfo.title ||  !productInfo.code || !productInfo.price || !productInfo.stock || !productInfo.category){
        return res.json({status:"error",message:"campos incompletos"})
     }else{
        next();
     };

}

const router = Router();

router.get("/",async(req,res)=>{
    try {
        const limit = req.query.limit;
        const products = await productService.get();
        if(limit){
            
            res.json({status:"succes",data:products.lenght==limit})
        }else{
            
            res.json({status:"succes", data:products})
        }
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});


router.get("/:pid",async (req,res)=>{
    try {
        const id = req.body;
        const productSearch = await productService.getById(id);
        if(id){
            
            res.json({status:"succes",data:productSearch, message:"El producto ha sido encontrado"})
        }else{
            
            res.json({status:"error", message:"El id no existe"})
        }
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

/*
router.get("/api/products",async(req,res)=>{
    try {
        const productsPaginate = await productService.paginate({},{limit:5, page:1})
        res.json({status:"succes",data:productsPaginate});
    } catch (error) {
        res.json({status:"error",message:error.message})
    }
})
*/
// router.get("/api/products",async (req,res)=>{

// })


// No supe como hacer la populacion y la paginacion juntas asi que las separe. La idea era hacer un boton para hacer la populacion
router.get("/api/products/populate",async(req,res)=>{
    try {
        const productsPopulate = await this.model.aggregate([
            {
                $match:{category:"Perifericos"}
            },
        ]);
        console.log(productsPopulate)
    } catch (error) {
        res.json({status:"error", message:error.message})
    }
})


router.post("/",validateFields,async(req,res)=>{
    
    try {
        const productInfo=req.body;
        const productCreated = await productService.save(productInfo);
        res.json({status:"succes", data:productCreated, message:"El producto ha sido creado"});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
    
});

router.put("/:pid",validateFields,async(req,res)=>{
    
    
    //Actualizar producto
    
})

router.delete("/:pid",async(req,res)=>{
    try {
        const id = req.body
        const productEliminated = await productService.delete(id)
        res.json({status:"succes",message:"Producto eliminado"})
        
    } catch (error) {
        res.json({status:"error", message:error.message})
    }

});


export { router as productsRouter} 