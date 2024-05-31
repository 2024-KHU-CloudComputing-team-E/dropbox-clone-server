const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    // 유저 몽고 고유 아이디
    userId:{
        type: Number,
        required: true,
        unique:true
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
    //유저 프로필 사진 링크
    picture:{
        type:String,
        required:true
    },
    // 계정 생성일자
    createdAt:{
        type: Date,
        default: Date.now
    },//소셜 로그인 토큰 값
    token:{
        type:String,
        required:true
    },
    //팔로워
    follower:[{
        type:mongoose.Schema.Type.ObjectId,
        ref:'Follower'
    }]
});

module.exports = mongoose.model("User", userSchema)