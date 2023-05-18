const express = require('express');
const cors = require('cors');
const app=express()
const  port=process.env.PORT||5000;
const imgData =require('./imageData.json')
app.use(cors());
require('dotenv').config()
app.use(express.json())



app.get('/imgData',(req,res)=>{
res.send(imgData);
})
app.get('/',(req,res)=>{
    res.send('server running')
});
app.listen(port,()=>{
console.log(`server is running on port ${port}`)
})