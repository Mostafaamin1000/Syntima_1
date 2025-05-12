import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
export const dbConnection = ()=>{
  mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database Connected Successfully ..");
}).catch(()=>{    
    console.log("Error in Connection DB ..");
    
})
}

