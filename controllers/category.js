const DB = require('../models/category')
const helper = require('../utils/helper')

const all = async (req, res, next) => {
    let cats = await DB.find();
    helper.fMsg(res, "All Categories", cats)
}

const add = async (req, res, next) => {
    let dbCat = await DB.findOne({ name: req.body.name });
    if (dbCat) {
        next(new Error("Category Name is already in use"))
        return;
    }
    let result = await new DB(req.body).save();
    helper.fMsg(res, "Category Saved", result)
}

const get = async (req, res, next) => {
    let cat = await DB.findById(req.params.id);
    helper.fMsg(res, "Single Category", cat)
}

const patch = async (req, res, next) => {
    let dbcat = await DB.findById(req.params.id);
    if (dbcat) {
        // await DB.findByIdAndUpdate(dbcat._id, req.body);
        // let result = await DB.findById(req.params.id);
        let result = await DB.findById(dbcat._id);
        helper.fMsg(res, "Category Updated", result)
    } else {
        next(new Error("No Category with that id"))
    }
}

const drop = async (req, res, next) => {
    let dbcat = await DB.findById(req.params.id);
    if (dbcat) {
        let result = await DB.findByIdAndDelete(dbcat._id);
        helper.fMsg(res, "Category Deleted", result)
    } else {
        next(new Error("No Category with that id"))
    }
}

module.exports = { all, add, get, patch, drop }