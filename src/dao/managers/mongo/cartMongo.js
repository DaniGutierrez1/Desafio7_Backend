 import { cartsModel } from "../../models/carts.model.js";

 export class CartMongo{
     constructor(){
         this.model = cartsModel;
     };

     async get(){
         try {
             const carts= await this.model.find().lean();
             return carts
         } catch (error) {
             throw error ;
         }
     };


     async save (cartInfo){
         try {
             const cartCreated = await this.model.create(cartInfo);
             return cartCreated 
         } catch (error) {
             throw error
         }
     };

     async getById(cartId){
        try {
            const cart = await this.model.findById(cartId).lean();
            return cart;
        } catch (error) {
            throw new error("No se encontró el ID del producto ");
        }
     };
    }