import express from 'express';
import mongoose from 'mongoose';    
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routes/orderRouter.js';
import cors from 'cors';
dotenv.config();

const app=express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// process.env.MONGODB_URL || 'mongodb://localhost/amazona'
mongoose.connect((process.env.MONGODB_URL || 'mongodb://localhost/amazona'),{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
});


app.get('/signin',(req,res)=>{
    res.send();
})

app.get('/register',(req,res)=>{
    res.send();
})


// user route
app.use('/api/users',userRouter);
app.use('/api/products',productRouter);
app.use('/api/orders',orderRouter);
app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})

app.get('/',(req,res)=>{
    res.send();
})

app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});
})

const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is listening at ${port}`);
})