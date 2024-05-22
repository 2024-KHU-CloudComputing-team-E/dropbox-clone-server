const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    // 유저 몽고 고유 아이디
    userId:{
        type: Number,
        required: true,
        unique:true
    },
    // 어느 소셜 로그인을 사용했는지, google or kakao, 현 시점 google
    provider:{
        type:String,
        required:true
    },
    // 아이디/소셜 아이디
    email:{
        type:String,
        required:true
    },
    // 유저 이름
    userName:{
        type:String,
        required:true,
        unique:true
    },
    // 계정 생성일자
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", user_schema)