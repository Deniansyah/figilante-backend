const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getProductDeliveries = async (req, res) => {
  try {
    const productDeliveries = await prisma.productDeliveries.findMany();
    return res.status(200).json({
      success: true,
      message: "List of ProductDeliveries",
      results: productDeliveries,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

exports.getProductDelivery = async (req, res) => {
  const { id } = req.params
  try {
    const productDeliveries = await prisma.productDeliveries.findUnique({
      where: {
        id: parseInt(id)
      },
    });
    if(!productDeliveries){
      return res.status(404).json({
        success: false,
        message: `ProductDeliveries with ${id} not found`
      })
    };
    return res.status(200).json({
      success: true,
      message: `ProductDeliveries with ${id} found`,
      results: productDeliveries
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.createProductDeliveries = async (req, res) => {
  const {productId, deleveryId} = req.body;
  try {
    const productDeliveries = await prisma.productDeliveries.create({
      data: {
        productId: parseInt(productId),
        deleveryId: parseInt(deleveryId),
      }
    })
    return res.status(200).json({
      success: true,
      message: "Chat created successfully",
      results: productDeliveries
    })
  } catch (error) {
    if(error.code === "P2003" && error.meta.field_name.includes("deleveryId")) {
      return res.status(400).json({
        success: false,
        message: `user id ${deleveryId} not exists, please cek user again`,
      });
    }
    if(error.code === "P2003" && error.meta.field_name.includes("productId")) {
      return res.status(400).json({
        success: false,
        message: `product id ${productId} not exists, please cek product again`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateProductDeliveries = async (req, res) => {
  const {id} = req.params;
  const {productId, deleveryId} = req.body;
  try {
    const productDeliveries = await prisma.productDeliveries.update({
      where: {
        id: parseInt(id),
      },
      data: {
        productId: parseInt(productId),
        deleveryId: parseInt(deleveryId),
      }
    });
    return res.status(201).json({
      success: true,
      message: `ProductDeliveries with id ${id} updated successfully`,
      results: productDeliveries
    });
  } catch (error) {
    if(error.code === "P2003" && error.meta.field_name.includes("deleveryId")) {
      return res.status(400).json({
        success: false,
        message: `user id ${deleveryId} not exists, please cek user again`,
      });
    }
    if(error.code === "P2003" && error.meta.field_name.includes("productId")) {
      return res.status(400).json({
        success: false,
        message: `product id ${productId} not exists, please cek product again`,
      });
    }
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: `ProductDeliveries with id ${id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

exports.deleteProductDeliveries = async (req, res) => {
  const {id} = req.params;
  try {
    const productDeliveries = await prisma.productDeliveries.delete({
      where: {
        id: parseInt(id)
      }
    });
    return res.status(200).json({
      success: true,
      message: `ProductDeliveries with id ${id} deleted successfully`,
      results: productDeliveries
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