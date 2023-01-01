const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllCategories = async (req, res) => {
  try {
    const allCategories = await prisma.categories.findMany();
    return res.status(200).json({
      success: true,
      message: "List of categories",
      results: allCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.categories.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: `category with id ${id} not found`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `category with id ${id} found`,
      results: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await prisma.categories.create({
      data: {
        name,
      },
    });
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      results: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await prisma.categories.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });
    return res.status(200).json({
      success: true,
      message: `Category with id ${id} updated successfully`,
      results: category,
    });
  } catch (error) {
    console.log(error);
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: `Category with id ${id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.categories.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json({
      success: true,
      message: `Category with id ${id} deleted successfully`,
      results: category,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: `Category with id ${id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
