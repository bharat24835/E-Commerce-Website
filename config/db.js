import mongoose, { model } from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'

const connectDB = async ()=>{
  try{

     const conn = await mongoose.connect(process.env.MONGODB_URL);
     console.log(`Connected to MongDB DataBase ${conn.connection.host}`.bgGreen.white);

  } catch(error){
    console.log(`Error in Connecting to Data Base  : ${error}`.bgRed.white);
  }

}
  export default connectDB 