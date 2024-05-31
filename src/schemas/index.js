// const mongoose = require('mongoose')
//
import express from 'express'
const app = express();
const port = 3000;
import User from './user.js'
import File from './file.js'
import Comment from './comment.js'


app.get('/', function(req, res){
    res.send('hellowrd')
});
app.listen(port, ()=>console.log('${port}포트입니다.'));
//
// const connect = () =>{
//     mongoose
//     .connect('mongodb+srv://draglee1:draglee1@cluster0.yq8lh3t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
//     .then(()=> console.log("DB connected"))
//     .catch(err=>console.log(err));
// };

// mongoose.connection.on("error",err =>{
//     console.error("mongodb connection error", err);
// });
import mongoose from 'mongoose'

mongoose
    .connect('mongodb+srv://draglee1:draglee1@cluster0.yq8lh3t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=> console.log("DB connected"))
    .catch(err=>console.log(err));

// module.exports = connect;