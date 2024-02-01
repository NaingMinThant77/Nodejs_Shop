const router = require('express').Router();
const controller = require('../controllers/comment')
const { schema } = require('../utils/schema')
const { validateBody, validateParam, validateToken } = require('../utils/validator')


router.post('/', [validateBody(schema.CommentSchema), controller.add])
router.get('/:id', [validateParam(schema.AllSchema.id, "id"), controller.all])
router.delete('/:id', [validateToken, validateParam(schema.AllSchema.id, "id"), controller.drop])

module.exports = router;