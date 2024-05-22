const mongoose = require('mongoose')

const file_schema = new mongoose.Schema({
    // 파일 소유자 : User의 id를 참조
    owner:{ 
        type : mongoose.Schema.Types.ObjecId,
        ref : 'User',
        required:true
    },
    // 파일 이름
    name:{
        type : String,
        required : true,
        unique : true
    },
    // 파일 사이즈
    size:{
        type : Number,
        required : true
    },
    // 파일 타입 : jpg, txt, pdf
    type:{
        type : String,
        required : true
    },
    // ai 파일 라벨링 : 풍경, 인물, 보고서, ... required값을 꺼놓음
    aiType:{
        type : String,
    },
    // 파일 생성일자
    createdAt:{
        type: Date,
        default : Date.now
    },
    // 파일 수정(업데이트) 일자
    updateAt:{
        type: Date,
        default : Date.now
    },
    // 파일 만료일자(타이머?)
    expiredAt:{
        type:Date
    },
    // Soft delete boolean info.
    isDeleted:{
        type:Boolean,
        default:false
    },
    // 파일 삭제일자
    deletedAt:{
        type:Date
    }
});

module.exports = mongoose.model("File", file_schema)