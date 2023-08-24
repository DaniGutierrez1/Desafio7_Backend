import mongoose, { mongo } from "mongoose";
import { cartsCollection ,productsCollection } from "../../constants/index.js";

const cartsSchema = new mongoose.Schema({
    cartName:{
        type:String,
        required:true,
        unique:true,

    },
    cartProducts:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: productsCollection 
            }
        ]
    },
    default:[]
})

export const cartsModel = mongoose.model(cartsCollection,cartsSchema)