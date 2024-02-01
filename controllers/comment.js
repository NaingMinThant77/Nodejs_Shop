const DB = require('../models/comment')
const helper = require('../utils/helper')

const all = async (req, res, next) => {
    let comments = await DB.find({ postId: req.params.id });
    helper.fMsg(res, "All Comments For Post", comments)
}

const add = async (req, res, next) => {
    let dbComment = await DB.findOne({ name: req.body.name });
    if (dbComment) {
        next(new Error("Comment Name is already in use"))
        return;
    }
    let result = await new DB(req.body).save();
    helper.fMsg(res, "Comment Saved", result)
}

const drop = async (req, res, next) => {
    let dbComment = await DB.findById(req.params.id);
    if (dbComment) {
        let result = await DB.findByIdAndDelete(dbComment._id);
        helper.fMsg(res, "Comment Deleted", result)
    } else {
        next(new Error("No Comment with that id"))
    }
}

module.exports = { all, add, drop }