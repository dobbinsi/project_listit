const mongoose = require("mongoose");



const dbName = "listProducts";



mongoose.connect("mongodb://localhost/" + dbName,{
    useNewUrlParser: true,
    useunifiedTopology: true
})
    .then(()=>{
        console.log("You are connected to the database called " + dbName)
    })
    .catch((err)=>{
        console.log("There was an error connection to the database called: " + dbName );
        console.log(err);
    })