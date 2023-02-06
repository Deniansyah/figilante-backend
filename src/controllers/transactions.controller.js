const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

exports.getAllTransactions = async (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const { id } = jwt.verify(token, process.env.SECRET);
  try {
    const transactions = await prisma.transactions.findMany({
      where: {
        userId: parseInt(id),
      },
      include: {
        products: {
          select: {
            name: true,
            price: true,
          },
        },
        deliveryMethods: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!transactions) {
      return res.status(404).json({
        success: false,
        message: `Transactions not found`,
      });
    }
    return res.status(200).json({
      success: false,
      message: "Transactions successfully retrieved",
      results: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.createTransactions = async (req, res) => {
  try {
    const data = req.body;
    const transaction = await prisma.transactions.createMany({
      data: data,
    });
    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      results: transaction,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteTransactions = async (req, res) => {
  const { id } = req.body;
  try {
    const transaction = await prisma.transactions.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json({
      success: true,
      message: `Transactions with id ${id} deleted successfully`,
      results: transaction,
    });
  } catch (error) {
    if (error.code === "P2025") {
      console.log(" hit error 25");
      return res.status(404).json({
        success: false,
        message: `Transactions with id ${id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
