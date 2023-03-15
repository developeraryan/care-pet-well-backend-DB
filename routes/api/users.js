const express = require("express");
const bodyParser = require("body-parser");



const app = express();

app.post("/",(req,res)=>{
  console.log("post",req.body.params);
})

