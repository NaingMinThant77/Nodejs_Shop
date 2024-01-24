const DB = require('../dbs/post');
const Helper = require('../utils/helper')

const all = async (req, res) => {
    let posts = await DB.find().populate("user", '-password -__v');
    Helper.fMsg(res, "All Posts", posts)
}

const get = async (req, res, next) => {
    let id = req.params.id;
    let post = await DB.findById(id).populate("user");
    if (post) {
        Helper.fMsg(res, "Single Post Get", post)
    } else {
        next(new Error("Error, no post with that id"))
    }
}

const post = async (req, res) => {
    let savePost = new DB(req.body);
    let result = await savePost.save();
    Helper.fMsg(res, "Post added", result);
}

const patch = async (req, res, next) => {
    let post = await DB.findById(req.params.id);
    if (post) {
        await DB.findByIdAndUpdate(post._id, req.body);
        let retPost = await DB.findById(post._id)
        Helper.fMsg(res, "Post Updated", retPost);
    } else {
        // res.json({ msg: "Error, no user with that id" })
        next(new Error("Error, no post with that id"))
    }
}

const drop = async (req, res) => {
    await DB.findByIdAndDelete(req.params.id);
    Helper.fMsg(res, "Post Deleted");
}

module.exports = {
    all, get, post, patch, drop
}