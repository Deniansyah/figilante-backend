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
