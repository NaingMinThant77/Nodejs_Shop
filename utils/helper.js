const fMsg = async (res, msg = "Success", result = []) => {
    res.status(200).json({
        con: true,
        msg: msg,
        result
    })
}

const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

module.exports = {
    fMsg,
    encode: password => bcrypt.hashSync(password),
    comparePass: (plain, hash) => bcrypt.compare(plain, hash),
    makeToken: payload => jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1h"})
}