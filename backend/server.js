const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const connectDB=require("./config/db");
const { registerUser, loginUser, getMe } = require("./controllers/authcontroller");
const protect = require("./middleware/authMiddleware");

dotenv.config();// this makes .env accessible like "process.env.PORT"

connectDB();//This connects to MongoDB before routes are used.

const app=express();
//middlewares Middleware means code that runs before your routes.
app.use(cors());//cors()→ allows frontend requests
app.use(express.json());//express.json() → allows backend to read JSON body

app.get("/",(req,res)=>{
    res.json({
        message: "Momentio API is running",
    });
});

// Auth routes
app.post("/api/auth/register", registerUser);
app.post("/api/auth/login", loginUser);
app.get("/api/auth/me", protect, getMe);

const PORT =process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`server is runnnig at port number ${PORT}`);
});
