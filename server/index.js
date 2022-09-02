import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import postRouter from './routes/postRoutes.js'
import userRouter from './routes/userRoutes.js'
import dotenv from 'dotenv'

const app = express();

dotenv.config()

app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors())

app.use('/posts',postRouter)
app.use('/users',userRouter)

app.get('/',(req,res)=>{
    res.send('APP IS RUNNING')
})

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))
})
.catch((error)=>{
    console.log(error);
})  
