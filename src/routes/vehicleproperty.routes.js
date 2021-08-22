const { Router } = require('express');

const vehiclePropertyController = require('../controllers/vehicleproperty.controller');

const router = Router();

router.get('/', vehiclePropertyController.getAll);
router.get('/:id', vehiclePropertyController.getOne);
router.post('/', vehiclePropertyController.createOne);
router.put('/:id', vehiclePropertyController.updateOne);
router.delete('/:id', vehiclePropertyController.deleteOne);

module.exports = router;
