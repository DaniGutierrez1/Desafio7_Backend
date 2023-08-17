import mongoose from "mongoose";

import {productsModel} from "../../models/products.model.js";

export class ProductsMongo{
    constructor(){
        this.model=productsModel;
    };

    async get(){
        try {
            const products = await this.model.find();
            return products;
        } catch (error) {
            console.log(error.message);

            throw new error("No se encuentran los productos")
        }
    };

    async getById(id){
        try {
            const product = await this.model.findById(id);
            return product;
        } catch (error) {
            throw new error("No se encontró el ID del producto ");
        }
    };

    async save(productInfo){
        try {
            const productCreated = await this.model.create(productInfo);
            return productCreated;

        } catch (error) {
            console.log(error.message);

            throw new error("No pudo crearse el producto")
        }
    };


}