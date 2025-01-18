

import mongoose from "mongoose";

export const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo dv connected at ${conn.connection.host}`)
    }
    catch(error){
        console.log(error.message)
        procees.exit(1)
    }
}