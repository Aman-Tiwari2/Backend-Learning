// Here we connect our database with server
const mongoose = require("mongoose")


async function connectDB(){

    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database connected successfully")
    })
}


module.exports = connectDB;