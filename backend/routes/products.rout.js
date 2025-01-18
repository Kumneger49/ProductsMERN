

import express from "express"
import mongoose from "mongoose"
import Product from "../models/product.model.js";
import { createProduct, getProducts, updateProduct, deleteProduct  } from "../controllers/products.controller.js";

const router = express.Router();

router.post("/", createProduct)


router.get("/", getProducts)

router.put("/:id", updateProduct)

router.delete("/:id", deleteProduct);

export default router