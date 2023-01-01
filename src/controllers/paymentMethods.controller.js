const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await prisma.paymentMethods.findMany();
    return res.status(200).json({
      success: true,
      message: "List of paymentMethods",
      results: paymentMethods,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getPaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const paymentMethod = await prisma.paymentMethods.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!paymentMethod) {
      return res.status(404).json({
        success: false,
        message: `PaymentMethod with id ${id} not found`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `PaymentMethod with id ${id} found`,
      results: paymentMethod,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.createPaymentMethod = async (req, res) => {
  try {
    const { picture, name } = req.body;
    const paymentMethod = await prisma.paymentMethods.create({
      data: {
        picture,
        name,
      },
    });
    res.status(201).json({
      success: true,
      message: "PaymentMethod created successfully",
      results: paymentMethod,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updatePaymentMethod = async (req, res) => {
  const { id } = req.params;
  const { picture, name } = req.body;
  try {
    const paymentMethod = await prisma.paymentMethods.update({
      where: {
        id: parseInt(id),
      },
      data: {
        picture,
        name,
      },
    });
    return res.status(200).json({
      success: true,
      message: `PaymentMethod with id ${id} updated successfully`,
      results: paymentMethod,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: `PaymentMethod with id ${id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deletePaymentMethod = async (req, res) => {
  const { id } = req.params;
  try {
    const paymentMethod = await prisma.paymentMethods.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json({
      success: true,
      message: `PaymentMethod with id ${id} deleted successfully`,
      results: paymentMethod,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: `PaymentMethod with id ${id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
