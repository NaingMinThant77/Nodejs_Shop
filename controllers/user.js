const DB = require('../models/user');
const Helper = require('../utils/helper')

const all = async (req, res) => {
    let users = await DB.find();
    Helper.fMsg(res, "All User", users)
}

// const get = async (req, res) => {
//     let id = req.params.id;
//     let user = await DB.findById(id);
//     Helper.fMsg(res, "Single User Get", user)
// }

// const post = async (req, res) => {
//     let saveUser = new DB(req.body);
//     let result = await saveUser.save();
//     Helper.fMsg(res, "User added", result);
// }

// const patch = async (req, res, next) => {
//     let user = await DB.findById(req.params.id);
//     if (user) {
//         await DB.findByIdAndUpdate(user._id, req.body);
//         let retUser = await DB.findById(user._id)
//         Helper.fMsg(res, "User Updated", retUser);
//     } else {
//         // res.json({ msg: "Error, no user with that id" })
//         next(new Error("Error, no user with that id"))
//     }
// }

// const drop = async (req, res) => {
//     await DB.findByIdAndDelete(req.params.id);
//     Helper.fMsg(res, "User Deleted");
// }

// module.exports = {
//     all, get, post, patch, drop
// }

const login = async (req, res, next) => {
    let phoneUser = await DB.findOne({ phone: req.body.phone }).select("-__v");
    if (phoneUser) {
        if (Helper.comparePass(req.body.password, phoneUser.password)) {
            let user = phoneUser.toObject();
            delete user.password;
            user.token = Helper.makeToken(user)
            Helper.fMsg(res, "Login Success", user)
        } else {
            next(new Error("Creditial Error"))
        }
    } else {
        next(new Error("Login Failed: User not found"))
    }
}


const register = async (req, res, next) => {
    let nameUser = await DB.findOne({ name: req.body.name });
    if (nameUser) {
        next(new Error("Name is already in use"));
        return;
    }

    let emailUser = await DB.findOne({ email: req.body.email });
    if (emailUser) {
        next(new Error("Email is already in use"));
        return;
    }

    let phoneUser = await DB.findOne({ phone: req.body.phone });
    if (phoneUser) {
        next(new Error("Phone is already in use"));
        return;
    }

    req.body.password = Helper.encode(req.body.password)
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "Register Success", result)
}

module.exports = { all, login, register }
