const { Router } = require('express');

const vehicleController = require('../controllers/vehicle.controller');

const router = Router();

router.get('/', vehicleController.getAll);
router.get('/:id', vehicleController.getOne);
router.post('/', vehicleController.createOne);
router.put('/:id', vehicleController.updateOne);
router.delete('/:id', vehicleController.deleteOne);

module.exports = router;
