

import express from "express"
import dotenv from "dotenv"

import {connectDB} from "./config/db.js"
import Product from "./models/product.model.js"

dotenv.config()

const app=express();
app.use(express.json())



app.get("/", (req, res)=>{
    res.send("<h1>yes i am ready</h1>")
})

app.post("/api/products", async (req, res)=>{
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
})


app.get("/api/products", async (req, res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, data: products})
    }
    catch(error){
        console.log(`the error is: ${error.message}`)
        res.status(500).json({success: false, message: "there is some problem with the server"})
    }
})

 

app.delete("/api/products/:id", async (req, res) => {
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
});


console.log(process.env.MONGO_URI)

app.listen(5000, ()=>{
    connectDB()
    console.log("app is ready now at http://localhost:5000")
})