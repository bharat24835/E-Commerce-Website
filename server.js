import express from  'express';
import colors from 'colors';
import dotenv from 'dotenv'
import morgan  from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import cors from 'cors'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import path from 'path'

// config env
dotenv.config();


// DATA Base Config
connectDB();

// rest object
const app = express();

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname , './client/build')))

// router
app.use('/api/v1/auth' , authRoutes)
app.use('/api/v1/category' , categoryRoute)
app.use('/api/v1/product' , productRoute)




// rest api
app.use('*', function(req ,res){
  res.sendFile(path.join(__dirname , './client/build/index.html'));
})



// run lister
app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on ${process.env.PORT} PORT NUMBER`.bgBlue)
})