const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getAllDeliveryMethods = async (req, res) => {
  try {
    const allDeliveryMethod = await prisma.deliveryMethods.findMany();
    return res.status(200).json({
      success: true,
      message: "List of deliveryMethod",
      results: allDeliveryMethod,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      results: allDeliveryMethod,
    });
  }
};

exports.getDeliveryMethodsById = async (req, res) => {
  const { id } = req.params;
  try {
    const deliveryMethod = await prisma.deliveryMethods.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!deliveryMethod) {
      return res.status(404).json({
        success: false,
        message: `deliveryMethod with id: ${id} not found`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `deliveryMethod with id: ${id} found`,
      results: deliveryMethod,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error`,
    });
  }
};

exports.createDeliveryMethods = async (req, res) => {
  try {
    const { name } = req.body;
    const deliveryMethod = await prisma.deliveryMethods.create({
      data: { name },
    });
    return res.status(201).json({
      success: true,
      message: "deliveryMethod created successfully",
      results: deliveryMethod,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error`,
    });
  }
};

exports.updateDeliveryMethods = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const deliveryMethod = await prisma.deliveryMethods.update({
      where: { id: parseInt(id) },
      data: {
        name,
      },
    });
    return res.status(201).json({
      success: true,
      message: `deliveryMethod with id: ${id} updated successfully`,
      results: deliveryMethod,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error`,
    });
  }
};

exports.deleteDeliveryMethods = async (req, res) => {
  const { id } = req.params;
  try {
    const deliveryMethod = await prisma.deliveryMethods.delete({
      where: { id: parseInt(id) },
    });
    return res.status(201).json({
      success: true,
      message: `deliveryMethod with id: ${id} deleted successfully`,
      results: deliveryMethod,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error`,
    });
  }
};
