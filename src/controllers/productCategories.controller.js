const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getAllProductCategories = async (req, res) => {
  try {
    const allProductCategories = await prisma.productCategories.findMany();
    return res.status(200).json({
      success: true,
      message: "List of Product Categories",
      results: allProductCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const productCategory = await prisma.productCategories.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!productCategory) {
      return res.status(404).json({
        success: false,
        message: `Product Category with id ${id} not found`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Product Category with id ${id} found`,
      results: productCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.createProductCategory = async (req, res) => {
  try {
    const { productId, categoryId } = req.body;
    const category = await prisma.productCategories.create({
      data: {
        productId: parseInt(productId),
        categoryId: parseInt(categoryId),
      },
    });
    return res.status(201).json({
      success: true,
      message: "Product Category created successfully",
      results: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateProductCategory = async (req, res) => {
  const { id } = req.params;
  const { productId, categoryId } = req.body;
  try {
    const productCategory = await prisma.productCategories.update({
      where: {
        id: parseInt(id),
      },
      data: {
        productId: parseInt(productId),
        categoryId: parseInt(categoryId),
      },
    });
    return res.status(200).json({
      success: true,
      message: `Product Category with id ${id} updated successfully`,
      results: productCategory,
    });
  } catch (error) {
    console.log(error);
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: `Product Category with id ${id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteProductCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const productCategory = await prisma.productCategories.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json({
      success: true,
      message: `Product Category with id ${id} deleted successfully`,
      results: productCategory,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: `Product Category with id ${id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
