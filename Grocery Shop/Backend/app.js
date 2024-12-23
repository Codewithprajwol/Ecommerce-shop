import 'dotenv/config'
import express from 'express'
import connect from "./db/db.js"
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser";
connect();//connection of database

const app=express();


const port=process.env.PORT ||2000;
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/users',userRoutes)

app.get('/',(req,res)=>{
    res.send({'hello':"sajita"})
})

app.listen(3000,()=>{
    console.log(`server is listening at port ${port}`)
})