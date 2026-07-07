const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("../models/User");
const { findOne } = require("../models/Users");

function generateToken(userId){
    return jwt.sign({id:userId},process.env.JWT_SECRET,{
        expiresIn:"7d",
    });
}

// POST /api/auth/register
async function registerUser(req,res){
    try{
        const {name,email,password} = req.body;
        if(!name||!email||!password){
            return res.status(400).json({
                message: "please provide name, email and password",
            });
        }
        if(password.length < 6){
            return res.status(400).json({
                message:"The length of the password must be > 6",
            });
        }
    

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const salt = await bcrypt.genSalt(10); //salt is just a random string of characters. Its only job is to make each password hash unique.
        //salt is used to make the differences in the password althogh th password is same 

        const hashedPassword= await bcrypt.hash(password,salt);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = generateToken(user._id);

        res.status(201).json({
            message: "User registered successfully",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }catch(error){
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
}

//POST /api/auth/login
async function loginUser(req,res){
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                message: "Please provide Email and Password",
            });
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message : "User does not exist/ please provide  valid email or password",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({
                message: "Invalid email or pass/Password is incorrect",
            });
        }
        return res.status(200).json({
            message:"Login Successful",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            },

        });

    }catch(error){
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

//GET /api/auth/me
async function getMe(req,res){
    res.status(200).json({
        user: req.user,,
    });
}

module.exports={
    registerUser,
    loginUser,
    getMe,
};