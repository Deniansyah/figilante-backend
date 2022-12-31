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
