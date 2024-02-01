const router = require('express').Router();
const controller = require('../controllers/tag');
const { saveFile } = require('../utils/gallery');
const { schema } = require('../utils/schema');
const { validateBody, validateToken, validateParam } = require('../utils/validator')

router.get('/', controller.all)
router.post('/', [validateToken, saveFile, validateBody(schema.TagSchema), controller.add])

router.route('/:id')
    .get(validateParam(schema.AllSchema.id, "id"), controller.get)
    .patch(validateToken, validateParam(schema.AllSchema.id, "id"), controller.patch)
    .delete(validateToken, validateParam(schema.AllSchema.id, "id"), controller.drop)

module.exports = router;