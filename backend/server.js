import express from "express"
import cors from "cors" // cross-origin resource sharing
import { connect } from "mongoose"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userROute.js"
import'dotenv/config'

// app  config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())



// db connection
connectDB();

// api endpoints 
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)


app.get("/", (req,res)=> {
    res.send("API Working")
})


app.listen(port,()=>{
   console.log(`Server Started on http://localhost:${port}`) 

})



