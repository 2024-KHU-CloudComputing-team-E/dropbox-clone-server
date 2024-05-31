import mongoose from 'mongoose'

//댓글에 대한 db 스키마
const commentSchema = new mongoose.Schema({
    //댓글 작성자
    author:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required:true
    },
    //댓글 내용
    content:{
        type : String,
        required: true
    },
    //댓글 생성일자
    createdAt:{
        type: Date,
        default : Date.now
    }
    //댓글 수정일자
    // update_at:{
    //     type: Date,
    //     default : Date.now
    // }
});

export default mongoose.model("Comment", commentSchema)