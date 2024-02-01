const DB = require('../models/post');
const Helper = require('../utils/helper')
const commentDB = require('../models/comment')

const all = async (req, res) => {
    let posts = await DB.find().populate("user cat", '-password -__v');
    Helper.fMsg(res, "All Posts", posts)
}

const get = async (req, res, next) => {
    let id = req.params.id;
    // let post = await DB.findById(id).populate('user tag', '-__v -_id -create');
    let post = await DB.findById(id).select('title content');
    let comments = await commentDB.find({ postId: post._id });
    post = post.toObject();
    post["comments"] = comments;
    Helper.fMsg(res, "Single Post Get", post)
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

const byTag = async (req, res, next) => {
    let posts = await DB.find({ tag: req.params.id });
    if (posts) {
        Helper.fMsg(res, "All Post By Tag", posts);
    } else {
        next(new Error("No post with that tag id"))
    }
}

const paginate = async (req, res, next) => {
    let page = req.params.page;
    page = page == 1 ? 0 : page - 1;
    let limit = Number(process.env.POST_LIMIT);
    let skipCount = limit * page;
    let posts = await DB.find().skip(skipCount).limit(limit);
    Helper.fMsg(res, "Paginated Posts", posts);
}

const togglelike = async (req, res, next) => {
    let post = await DB.findById(req.params.id);
    if (post) {
        if (req.params.page == 1) {
            post.like = post.like + 1;
        } else {
            post.like = post.like - 1;
        }

        await DB.findByIdAndUpdate(post._id, post)
        let result = await DB.findById(req.params.id);
        Helper.fMsg(res, "Like Added", result);
    } else {
        next(new Error("No post with that tag id"))
    }
}

module.exports = {
    all, get, post, patch, drop, byCatId, byUserId, paginate, byTag, togglelike
}