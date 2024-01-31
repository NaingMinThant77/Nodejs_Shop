const router = require('express').Router();
// const router = express.Router();

const controller = require('../controllers/user')

router.get("/", controller.all)
// router.post("/", controller.post)

// router.route("/:id")
//     .get(controller.get)
//     .patch(controller.patch)
//     .delete(controller.drop)

const { schema } = require('../utils/schema')
const { validateBody } = require('../utils/validator')

router.post("/", controller.login)
router.post("/register", [validateBody(schema.RegisterSchema), controller.register])

module.exports = router;