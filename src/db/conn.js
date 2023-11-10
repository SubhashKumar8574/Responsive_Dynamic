const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/dynamicsite")
.then(()=>{
    console.log("Database connected");
})
.catch(()=>{
    console.log("Database not connected");
})