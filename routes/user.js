const router = require('express').Router();
// const router = express.Router();

const controller = require('../controllers/user')

router.get("/", controller.all)

router.post("/", controller.post)

router.route("/:id")
    .get(controller.get)
    .patch(controller.patch)
    .delete(controller.drop)

// router.get("/:id", (req, res) => {
//     let id = req.params.id;
//     res.json({ msg: "Request id is " + id });
// })

// router.patch("/:id", (req, res) => {
//     let id = req.params.id;
//     res.json({ msg: "Edit id is " + id });
// })

// router.delete("/:id", (req, res) => {
//     let id = req.params.id;
//     res.json({ msg: "Delete id is " + id });
// })

module.exports = router;