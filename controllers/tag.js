const DB = require('../models/tag');
const helper = require('../utils/helper');

const all = async (req, res, next) => {
    let tags = await DB.find();
    helper.fMsg(res, "All Tags ", tags)
}

const add = async (req, res, next) => {
    let dbtag = await DB.findOne({ name: req.body.name });
    if (dbtag) {
        next(new Error("Tag name is already in use"))
    } else {
        let result = await new DB(req.body).save();
        helper.fMsg(res, "Tag Created ", result)
    }
}
const get = async (req, res, next) => {
    let tag = await DB.findById(req.params.id);
    helper.fMsg(res, "Single Tag", tag)
}

const patch = async (req, res, next) => {
    let dbtag = await DB.findById(req.params.id);
    if (dbtag) {
        await DB.findByIdAndUpdate(dbtag._id, req.body);
        let result = await DB.findById(dbtag._id);
        helper.fMsg(res, "Tag Updated", result)
    } else {
        next(new Error("No Category with that id"))
    }
}

const drop = async (req, res, next) => {
    let dbcat = await DB.findById(req.params.id);
    if (dbcat) {
        let result = await DB.findByIdAndDelete(dbcat._id);
        helper.fMsg(res, "Tag Deleted", result)
    } else {
        next(new Error("No Tag with that id"))
    }
}

module.exports = { all, add, get, patch, drop }