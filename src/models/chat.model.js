const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.findAllUsers = async () => {
  try {
    const chats = await prisma.chats.findMany();
    return chats;
  } catch (error) {
    return error;
  }
};

exports.findChatById = async (id) => {
  try {
    const chat = await prisma.chats.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return chat;
  } catch (error) {
    return error;
  }
};

exports.createChat = async (data) => {
  try {
    const { fromUserId, toUserId, message } = data;
    const chat = await prisma.chats.create({
      data: {
        fromUserId: parseInt(fromUserId),
        toUserId: parseInt(toUserId),
        message,
      },
    });
    return chat;
  } catch (error) {
    return error;
  }
};

exports.updateChat = async (id, data) => {
  try {
    const { fromUserId, toUserId, message } = data;
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
    return chat;
  } catch (error) {
    return error;
  }
};

exports.deleteChat = async (id) => {
  try {
    const chat = await prisma.chats.delete({
      where: {
        id: parseInt(id),
      },
    });
    return chat;
  } catch (error) {
    return error;
  }
};
