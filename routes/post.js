const router = require('express').Router();
const controller = require('../controllers/post')
const { validateToken, validateBody, validateParam } = require("../utils/validator");
const { schema } = require("../utils/schema");
const { saveFile } = require('../utils/gallery')

router.get("/", controller.all)

router.post("/", validateToken, saveFile, validateBody(schema.PostSchema), controller.post)

router.route("/:id")
    .get(controller.get)
    .patch(validateToken, controller.patch)
    .delete(validateToken, controller.drop)

router.get('/bycat/:id', controller.byCatId)
router.get('/byuser/:id', controller.byUserId)
router.get('/bytag/:id', [validateParam(schema.AllSchema.id, 'id'), controller.byTag])

router.get('/paginate/:page', [validateParam(schema.AllSchema.page, "page"), controller.paginate])

router.get('/like/toggle/:id/:page', [validateParam(schema.AllSchema.id, 'id'), controller.togglelike])

module.exports = router;