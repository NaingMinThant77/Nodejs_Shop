const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    "postId": { type: Schema.Types.ObjectId, required: true },
    "name": { type: String, required: true, unique: true },
    "email": { type: String, required: true, unique: true },
    "content": { type: String, required: true },
    create: { type: Date, default: Date.now }
})

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;