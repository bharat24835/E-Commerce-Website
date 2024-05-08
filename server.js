import express from  'express';
import colors from 'colors';
import dotenv from 'dotenv'
import morgan  from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'

// config env
dotenv.config();


// DATA Base Config
connectDB();

// rest object
const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json());

// router
app.use('/api/v1/auth' , authRoutes)


// rest api
app.get('/'  , (req,res)=>{
  res.send({
    message : "Welcome to ECommerce App"
  })
})


// run lister
app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on ${process.env.PORT} PORT NUMBER`.bgBlue)
})