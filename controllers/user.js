const DB = require('../dbs/user');
const Helper = require('../utils/helper')

const all = async (req, res) => {
    let users = await DB.find();
    Helper.fMsg(res, "All User", users)
}

const get = async (req, res) => {
    let id = req.params.id;
    let user = await DB.findById(id);
    Helper.fMsg(res, "Single User Get", user)
}

const post = async (req, res) => {
    let saveUser = new DB(req.body);
    let result = await saveUser.save();
    Helper.fMsg(res, "User added", result);
}

const patch = async (req, res, next) => {
    let user = await DB.findById(req.params.id);
    if (user) {
        await DB.findByIdAndUpdate(user._id, req.body);
        let retUser = await DB.findById(user._id)
        Helper.fMsg(res, "User Updated", retUser);
    } else {
        // res.json({ msg: "Error, no user with that id" })
        next(new Error("Error, no user with that id"))
    }
}

const drop = async (req, res) => {
    await DB.findByIdAndDelete(req.params.id);
    Helper.fMsg(res, "User Deleted");
}

module.exports = {
    all, get, post, patch, drop
}
