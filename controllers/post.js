const DB = require('../models/post');
const Helper = require('../utils/helper')

const all = async (req, res) => {
    let posts = await DB.find().populate("user cat", '-password -__v');
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
    let userId = req.body._id;
    delete req.body.user;
    req.body.user = userId
    let result = await new DB(req.body).save();
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
    let post = await DB.findById(req.params.id)
    if (post) {
        await DB.findByIdAndDelete(req.params.id);
        Helper.fMsg(res, "Post Deleted");
    } else {
        next(new Error("Error, no post with that id"))
    }

}

const byCatId = async (req, res, next) => {
    let posts = await DB.find({ cat: req.params.id });
    Helper.fMsg(res, "All Post By Category", posts);
}

const byUserId = async (req, res, next) => {
    let posts = await DB.find({ user: req.params.id }).populate('user');
    Helper.fMsg(res, "All Post By User", posts);
}

module.exports = {
    all, get, post, patch, drop, byCatId, byUserId
}