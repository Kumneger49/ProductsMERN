

import express from "express"
import dotenv from "dotenv"
import cors from "cors"


import {connectDB} from "./config/db.js"
import productRoutes from "./routes/products.rout.js"


dotenv.config()

const app=express();
app.use(express.json())
app.use(cors({origin: 'http://localhost:5173'}))



app.get("/", (req, res)=>{
    res.send("<h1>yes i am ready</h1>")
})

app.use("/api/products", productRoutes)


 

app.listen(5000, ()=>{
    connectDB()
    console.log("app is ready now at http://localhost:5000")
})