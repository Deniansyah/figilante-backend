const chatsRoutes = require('express').Router();

const {
  getCarts,
  getCart,
  createCarts,
  updateCarts,
  deleteCarts} = require('../controllers/carts.controller')

chatsRoutes.get('/', getCarts)
chatsRoutes.get('/:id', getCart)
chatsRoutes.post('/', createCarts)
chatsRoutes.patch('/:id', updateCarts)
chatsRoutes.delete('/:id', deleteCarts)

module.exports = chatsRoutes;