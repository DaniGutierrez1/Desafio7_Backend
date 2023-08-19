import mongoose from "mongoose";
import { productsCollection } from "../../constants/index.js";

// const productsCollection="products";

const productSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    price:{
        type:Number,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:["Perifericos","Componentes","Sillas gamer"]
    },
    stock:{
        type:Number,
        required:true
    },
});

export const productsModel=mongoose.model(productsCollection,productSchema); 