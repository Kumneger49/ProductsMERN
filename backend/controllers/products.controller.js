
import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const createProduct = async (req, res)=>{
    const product = req.body;

    if(!product.name||!product.price||!product.image){
        return res.status(400).json({success: false, message: "please provide every property required for products"})
    }

    const newProduct = new Product(product)

    try{
        await newProduct.save()
        res.status(201).json({success: true, message: `${newProduct} successfully created`})
    }
    catch(error){
        console.log("error occured: ", error.message)
        res.status(500).json({success: false, message: "there is some problem with the server"})
    }
}

export const getProducts = async (req, res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, data: products})
    }
    catch(error){
        console.log(`the error is: ${error.message}`)
        res.status(500).json({success: false, message: "there is some problem with the server"})
    }
}

export const updateProduct = async (req, res)=>{
    const {id} = req.params; 

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "there is no product by this id"})
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, updatedProduct})
    }
    catch(error){
        res.status(500).json({success: false, message: "there is some problem with the server"})
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
   
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ success: false, message: "No product with this ID" });
      }
      res.status(200).json({ success: true, message: "Product successfully deleted" });
    } 
    catch (error) {
      console.error("Error deleting product:", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }