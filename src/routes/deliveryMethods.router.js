const deliveryMethodsRoutes = require("express").Router();

const {
  getAllDeliveryMethods,
  getDeliveryMethodsById,
  createDeliveryMethods,
  updateDeliveryMethods,
  deleteDeliveryMethods
} = require('../controllers/deliveryMethods.controller');

deliveryMethodsRoutes.get('/', getAllDeliveryMethods);
deliveryMethodsRoutes.get('/:id', getDeliveryMethodsById);
deliveryMethodsRoutes.post('/', createDeliveryMethods);
deliveryMethodsRoutes.patch('/:id', updateDeliveryMethods);
deliveryMethodsRoutes.delete('/:id', deleteDeliveryMethods);

module.exports = deliveryMethodsRoutes;