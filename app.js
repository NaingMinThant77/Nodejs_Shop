require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/' + process.env.DB_NAME)
    .then(() => console.log('Connected!'));

const fileUpload = require('express-fileupload');
app.use(fileUpload());

const path = require('path')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(express.json());

// let users = [
//     { id: 1, name: "Mg Mg", age: 20 },
//     { id: 2, name: "Aung Aung", age: 18 },
//     { id: 3, name: "Hla Hla", age: 25 },
// ]

// app.get("/users", (req, res) => {
//     res.json(users);
// })

// app.get("/user/:id", (req, res) => {
//     let id = req.params.id;
//     let user = users.find(usr => usr.id == id)
//     if (user) {
//         res.json(user);
//     } else {
//         res.json({ msg: "No user with that id sir!" })
//     }
// })

// app.post("/user", (req, res) => {
//     let id = req.body.id;
//     let name = req.body.name;
//     let age = req.body.age;
//     let newUser = {
//         id, name, age
//     };
//     users.push(newUser);
//     res.json({ users });
// })

// app.patch("/user/:id", (req, res) => {
//     let id = req.params.id;
//     let editUser = users.find(usr => usr.id == id );
//     if (editUser) {
//         editUser.name = req.body.name;
//         res.json(users)
//     } else {
//         res.json({ msg: "No user with that id sir! "})
//     }
// })

// app.delete("/user/:id", (req, res) => {
//     let id = req.params.id;
//     users = users.filter(usr => usr.id != id)
//     res.json(users)
// })

// app.get("*", (req, res) => {
//     res.status(200).json({ msg: "No route found!" });
// })

const userRoute = require('./routes/user')

// const isLogged = (req, res, next) => {
//     if (1 + 1 === 2) {
//         req.successMsg = "We are good to go";
//         next();
//     } else {
//         next(new Error("You are not logged in"));
//     }
// };

// const isAdmin = (req, res, next) => {
//     if (4 === 4) {
//         console.log(req.successMsg);
//         req.warningMsg = "This is a warning message";
//         next();
//     } else {
//         next(new Error("Only admin can access this route"));
//     }
// };

// const funky = (req, res, next) => {
//     console.log(req.warningMsg);
//     res.json({ msg: "Coming with Get method." });
// };

// app.get('/users', isLogged, isAdmin, funky);

app.use("/users", userRoute)

const catRoute = require('./routes/category')
app.use('/cat', catRoute)

const postRoute = require('./routes/post')
app.use("/posts", postRoute)

app.use((err, req, res, next) => {
    err.status = err.status || 200;
    res.status(err.status).json({
        con: false,
        msg: err.message
    })
})

app.listen(process.env.PORT, console.log("Server is running at port " + process.env.PORT))