const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    author:{
        type : mongoose.Schema.Types.ObjecId,
        ref : 'User',
        required:true
    },
    name:{
        type : String,
        required : true,
        unique : true
    },
    size:{
        type : Number,
        required : true
    },
    type:{
        type : String,
        required : true
    },
    aiType:{
        type : String,
    },
    createdAt:{
        type: Date,
        default : Date.now
    },
    updateAt:{
        type: Date,
        default : Date.now
    },
    expiredAt:{
        type:Date
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedAt:{
        type:Date
    }
});

module.exports = mongoose.model("File", fileSchema)