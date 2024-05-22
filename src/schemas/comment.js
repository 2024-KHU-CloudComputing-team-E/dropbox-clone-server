const mongoose = require('mongoose')
//댓글에 대한 db 스키마
const comment_schema = new mongoose.Schema({
    //댓글 작성자
    author:{
        type : mongoose.Schema.Types.ObjecId,
        ref : 'User',
        required:true
    },
    //댓글 내용
    text:{
        type : String,
        required: true
    },
    //댓글 생성일자
    createdAt:{
        type: Date,
        default : Date.now
    },
    //댓글 수정일자
    updateAt:{
        type: Date,
        default : Date.now
    }
});

module.exports = mongoose.model("Comment", comment_schema)