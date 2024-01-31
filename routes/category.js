const router = require('express').Router();
const controller = require('../controllers/category')
const { saveFile } = require('../utils/gallery')
const { schema } = require('../utils/schema')
const { validateBody, validateParam } = require('../utils/validator')

router.get('/', controller.all);
router.post('/', [saveFile, validateBody(schema.AddCat), controller.add])

router.route('/:id')
    .get(validateParam(schema.AllSchema.id, "id"), controller.get)
    // .patch(validateParam(schema.AllSchema.id, "id"), controller.patch);
    .patch(saveFile, validateBody(schema.AllSchema.image), controller.patch)
    .delete(validateParam(schema.AllSchema.id, "id"), controller.drop)

module.exports = router;