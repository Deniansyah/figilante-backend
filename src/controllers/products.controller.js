const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await prisma.products.findMany()
    return res.status(200).json({
      success: true,
      message: 'List of products',
      results: allProducts
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await prisma.products.findUnique({
      where: {
        id: parseInt(id)
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        stock: true,
        deliveryStart: true,
        deliveryEnd: true,
        picture: true,
        productSizes: {
          select: {
            sizes: {
              select: {
                name: true
              }
            }
          }
        },
        productDeliveries: {
          select: {
            deliveryMethods: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with id ${id} not found`
      })
    }
    return res.status(200).json({
      success: true,
      message: `Product with id ${id} found`,
      results: product
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      stock,
      deliveryStart,
      deliveryEnd,
      picture
    } = req.body
    const product = await prisma.products.create({
      data: {
        name,
        price: parseInt(price),
        description,
        stock: parseInt(stock),
        deliveryStart: new Date(deliveryStart),
        deliveryEnd: new Date(deliveryEnd),
        picture
      }
    })
    return res.status(201).json({
      success: true,
      message: 'Products created successfully',
      results: product
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

exports.updateProduct = async (req, res) => {
  const { id } = req.params
  const {
    name,
    price,
    description,
    stock,
    deliveryStart,
    deliveryEnd,
    picture
  } = req.body
  try {
    const product = await prisma.products.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name,
        price: parseInt(price),
        description,
        stock: parseInt(stock),
        deliveryStart: new Date(deliveryStart),
        deliveryEnd: new Date(deliveryEnd),
        picture
      }
    })
    return res.status(200).json({
      success: true,
      message: `Product with id ${id} updated successfully`,
      results: product
    })
  } catch (error) {
    console.log(error)
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: `Product with id ${id} not found`
      })
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

exports.deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    const product = await prisma.products.delete({
      where: {
        id: parseInt(id)
      }
    })
    return res.status(200).json({
      success: true,
      message: `Product with id ${id} deleted successfully`,
      results: product
    })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: `Product with id ${id} not found`
      })
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

exports.getProductsCust = async (req, res) => {
  req.query.menu = req.query.menu || 'Favorite'
  req.query.limit = parseInt(req.query.limit) || 12
  req.query.page = parseInt(req.query.page) || 1
  req.query.search = req.query.search || ''
  try {
    const allProducts = await prisma.products.findMany({
      take: req.query.limit,
      skip: (req.query.page - 1) * req.query.limit,
      select: {
        id: true,
        name: true,
        price: true,
        picture: true
      },
      where: {
        productCategories: {
          some: {
            categories: {
              name: req.query.menu
            }
          }
        },
        name: {
          contains: req.query.search
        }
      }
    })
    return res.status(200).json({
      success: true,
      message: 'List of products',
      results: allProducts
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}
