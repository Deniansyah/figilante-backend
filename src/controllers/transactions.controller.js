const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

exports.getAllTransactions = async (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const { id } = jwt.verify(token, "backend-secret");
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
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.createTransactions = async (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const { id } = jwt.verify(token, "backend-secret");

  try {
    const { productId, deliveryMethodId } = req.body;
    const transaction = await prisma.transactions.create({
      data: {
        userId: parseInt(id),
        productId: parseInt(productId),
        deliveryMethodId: parseInt(deliveryMethodId),
      },
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
