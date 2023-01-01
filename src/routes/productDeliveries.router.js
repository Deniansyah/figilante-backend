const productDeliveriesRouters = require('express').Router();

const {
  getProductDeliveries,
  getProductDelivery,
  createProductDeliveries,
  updateProductDeliveries,
  deleteProductDeliveries} = require('../controllers/productDeliveries.controller')

productDeliveriesRouters.get('/', getProductDeliveries)
productDeliveriesRouters.get('/:id', getProductDelivery)
productDeliveriesRouters.post('/', createProductDeliveries)
productDeliveriesRouters.patch('/:id', updateProductDeliveries)
productDeliveriesRouters.delete('/:id', deleteProductDeliveries)

module.exports = productDeliveriesRouters;