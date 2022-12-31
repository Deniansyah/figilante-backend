const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getChats = async (req, res) => {
  try {
    const chats = await prisma.chats.findMany();
    return res.status(200).json({
      success: true,
      message: "List of chats",
      results: chats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getChat = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await prisma.chats.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: `Chat with id ${id} not found`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Chat with id ${id} found`,
      results: chat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.createChat = async (req, res) => {
  try {
    const { fromUserId, toUserId, message } = req.body;
    const chat = await prisma.chats.create({
      data: {
        fromUserId: parseInt(fromUserId),
        toUserId: parseInt(toUserId),
        message,
      },
    });
    res.status(201).json({
      success: true,
      message: "Chat created successfully",
      results: chat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateChat = async (req, res) => {
  const { id } = req.params;
  const { fromUserId, toUserId, message } = req.body;
  try {
    const chat = await prisma.chats.update({
      where: {
        id: parseInt(id),
      },
      data: {
        fromUserId: parseInt(fromUserId),
        toUserId: parseInt(toUserId),
        message,
      },
    });
    return res.status(200).json({
      success: true,
      message: `Chat with id ${id} updated successfully`,
      results: chat,
    });
  } catch (error) {
    console.log(error);
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: `Chat with id ${id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteChat = async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await prisma.chats.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json({
      success: true,
      message: `Chat with id ${id} deleted successfully`,
      results: chat,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: `Chat with id ${id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
