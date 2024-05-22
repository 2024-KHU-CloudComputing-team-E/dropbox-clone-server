const mongoose = require('mongoose')
// 게시물에 대한 db 스키마
const post_schema = new mongoose.Schema({
    // 게시물 작성자
    author:{
        type : mongoose.Schema.Types.ObjecId,
        ref : 'User',
        required:true
    },
    // 파일 가져옴
    file:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'File',
        required : true,
    },
    //파일 정보 기재[파일 용량, 파일 생성일자, 수정일자 등등.. ]
    //!! 추후 서버 로직으로 참조해서 값을 넣어줘야함!!
    //Reference : https://woojin.tistory.com/34
    description:{
        type : String,
        maxlength : 100,
        required : true
    },
    //댓글 참조
    comments:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }],
    // 좋아요 누른 사람
    // !!서버 단에서 좋아요 수 카운팅 후 display 방식? 잘 모르겠어요!!
    likes:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }],
    //게시물 생성일자
    createdAt:{
        type: Date,
        default : Date.now
    },
    //게시물 수정일자
    updateAt:{
        type: Date,
        default : Date.now
    }
});

module.exports = mongoose.model("Post", post_schema)