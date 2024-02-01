const jwt = require("jsonwebtoken");
const UserDB = require("../models/user")

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = schema.validate(req.body);
            if (result.error) {
                console.log(result)
                next(new Error(result.error.details[0].message))
            } else {
                next();
            }
        }
    },
    validateParam: (schema, name) => {
        return (req, res, next) => {
            let obj = {};
            obj[`${name}`] = req.params[`${name}`];
            let result = schema.validate(obj);
            if (result.error) {
                console.log(result)
                next(new Error(result.error.details[0].message))
            } else {
                next();
            }
        }
    },
    // validateToken: async (req, res, next) => {
    //     let token = req.headers.authorization;
    //     if (token) {
    //         token = token.split(" ")[1];
    //         let decoded = jwt.decode(token, process.env.SECRET_KEY);
    //         let user = await UserDB.findById(decoded._id);
    //         if (user) {
    //             req.body["user"] = user;
    //             next()
    //         } else {
    //             next(new Error("Tokenization Error "))
    //         }
    //     } else {
    //         next(new Error("Fail Tokenization"))
    //     }
    // }
    validateToken: async (req, res, next) => {
        if (req.headers.authorization) {
            let token = req.headers.authorization.split(" ")[1];
            let decoded = jwt.decode(token, process.env.SECRET_KEY);
            if (decoded) {
                req.body["user"] = decoded;
                next()
            } else {
                next(new Error("Tokenization Error "))
            }
        } else {
            next(new Error("Fail Authorization Tokenization"))
        }
    }
}