import express from 'express';
import mongoose from 'mongoose';    
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routes/orderRouter.js';

dotenv.config();

const app=express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
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