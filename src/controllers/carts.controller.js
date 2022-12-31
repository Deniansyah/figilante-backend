const { PrismaClient } = require("@prisma/client");
const { parse } = require("pg-protocol");

const prisma = new PrismaClient();

exports.getCarts = async (req, res) => {
  try {
    const carts = await prisma.carts.findMany();
    return res.status(200).json({
      success: true,
      message: "List of carts",
      results: carts,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

exports.getCart = async (req, res) => {
  const { id } = req.params
  console.log(id)
  try {
    const carts = await prisma.carts.findUnique({
      where: {
        id: parseInt(id)
      },
    });
    if(!carts){
      return res.status(404).json({
        success: false,
        message: `carts with ${id} not found`
      })
    };
    return res.status(200).json({
      success: true,
      message: `carts with ${id} found`,
      results: carts
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.createCarts = async (req, res) => {
  try {
    const {productId, userId, qty, total} = req.body;
    const carts = await prisma.carts.create({
      data: {
        productId: parseInt(productId),
        userId: parseInt(userId),
        qty: parseInt(qty),
        total: parseInt(total)
      }
    })
    return res.status(200).json({
      success: true,
      message: "Chat created successfully",
      results: carts
    })
  } catch (error) {
    console.log(error.meta.field_name)
    if(error.code === "P2003" && error.meta.field_name.include("userId")) {
      res.status(400).json({
        success: false,
        message: "user not exists, please cek user again",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateCarts = async (req, res) => {
  try {
    const {id} = req.params;
    const {productId,
      userId,
      qty,
      total} = req.body;
    const carts = await prisma.carts.update({
      where: {
        id: id
      },
      data: {
        productId: parseInt(productId),
        userId: parseInt(userId),
        qty: parseInt(qty),
        total: parseInt(total)
      }
    });
    return res.status(201).json({
      success: true,
      message: `Carts with id ${id} updated successfully`,
      results: carts
    });
  } catch (error) {
    console.log(error);
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: `Chat with id ${id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

exports.deleteCarts = async (req, res) => {
  try {
    const {id} = req.params;
    const carts = await prisma.carts.delete({
      where: {
        id: parseInt(id)
      }
    });
    return res.status(200).json({
      success: true,
      message: `Carts with id ${id} deleted successfully`,
      results: carts
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: `Chat with id ${id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}