const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getAllSizes = async (req, res) => {
  try {
    const allSize = await prisma.sizes.findMany();
    return res.status(200).json({
      success: true,
      message: "List of size",
      results: allSize,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      results: allSize,
    });
  }
};

exports.getSizeById = async (req, res) => {
  const { id } = req.params;
  try {
    const size = await prisma.sizes.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!size) {
      return res.status(404).json({
        success: false,
        message: `size with id: ${id} not found`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `size with id: ${id} found`,
      results: size,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error`,
    });
  }
};

exports.createSize = async (req, res) => {
  try {
    const { name } = req.body;
    const size = await prisma.sizes.create({
      data: { name },
    });
    return res.status(201).json({
      success: true,
      message: "size created successfully",
      results: size,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error`,
    });
  }
};

exports.updateSize = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const size = await prisma.sizes.update({
      where: { id: parseInt(id) },
      data: {
        name,
      },
    });
    return res.status(201).json({
      success: true,
      message: `size with id: ${id} updated successfully`,
      results: size,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: `Size with id ${id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: `Internal server error`,
    });
  }
};

exports.deleteSize = async (req, res) => {
  const { id } = req.params;
  try {
    const size = await prisma.sizes.delete({
      where: { id: parseInt(id) },
    });
    return res.status(201).json({
      success: true,
      message: `size with id: ${id} deleted successfully`,
      results: size,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: `Size with id ${id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: `Internal server error`,
    });
  }
};
