const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getProductSizes = async (req, res) => {
  try {
    const productSizes = await prisma.productSizes.findMany();
    return res.status(200).json({
      success: true,
      message: "List of productSizes",
      results: productSizes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getProductSize = async (req, res) => {
  try {
    const { id } = req.params;
    const productSize = await prisma.productSizes.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!productSize) {
      return res.status(404).json({
        success: false,
        message: `ProductSize with id ${id} not found`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `ProductSize with id ${id} found`,
      results: productSize,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.createProductSize = async (req, res) => {
  try {
    const { productId, sizeId } = req.body;
    const productSize = await prisma.productSizes.create({
      data: {
        productId: parseInt(productId),
        sizeId: parseInt(sizeId),
      },
    });
    res.status(201).json({
      success: true,
      message: "ProductSize created successfully",
      results: productSize,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateProductSize = async (req, res) => {
  const { id } = req.params;
  const { productId, sizeId } = req.body;
  try {
    const productSize = await prisma.productSizes.update({
      where: {
        id: parseInt(id),
      },
      data: {
        productId: parseInt(productId),
        sizeId: parseInt(sizeId),
      },
    });
    return res.status(200).json({
      success: true,
      message: `ProductSize with id ${id} updated successfully`,
      results: productSize,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: `ProductSize with id ${id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteProductSize = async (req, res) => {
  const { id } = req.params;
  try {
    const productSize = await prisma.productSizes.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json({
      success: true,
      message: `ProductSize with id ${id} deleted successfully`,
      results: productSize,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: `ProductSize with id ${id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
