const mongoose =require('mongoose');

async function connectDB(){
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        //Use Mongoose to connect to the database URL stored in .env

        console.log(`MongoDB Connected : ${conn.connection.host}`);
    }catch (error){
        console.error(`MongoDB connection error ${error.message}`);
        process.exit(1);//immediately exits the node application 
    }
}
//this file establish connection between Backend server to MongoDB
module.exports =connectDB;