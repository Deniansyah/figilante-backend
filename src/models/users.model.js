const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.findAllUsers = async () => {
  try {
    const users = await prisma.users.findMany();
    return users;
  } catch (error) {
    return error;
  }
};

exports.findUserById = async (id) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return user;
  } catch (error) {
    return error;
  }
};

exports.createUser = async (data) => {
  try {
    const {
      nickName,
      firstName,
      lastName,
      address,
      email,
      password,
      phoneNumber,
      gender,
      birthdate,
      picture,
      isAdmin,
    } = data;
    const user = await prisma.users.create({
      data: {
        nickName,
        firstName,
        lastName,
        address,
        email,
        password,
        phoneNumber,
        gender,
        birthdate: new Date(birthdate),
        picture,
        isAdmin,
      },
    });
    return user;
  } catch (error) {
    return error;
  }
};

exports.updateUser = async (id, data) => {
  try {
    const {
      nickName,
      firstName,
      lastName,
      address,
      email,
      password,
      phoneNumber,
      gender,
      birthdate,
      picture,
      isAdmin,
    } = data;
    const user = await prisma.users.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nickName,
        firstName,
        lastName,
        address,
        email,
        password,
        phoneNumber,
        gender,
        birthdate: new Date(birthdate),
        picture,
        isAdmin,
      },
    });
    return user;
  } catch (error) {
    return error;
  }
};

exports.deleteUser = async (id) => {
  try {
    const user = await prisma.users.delete({
      where: {
        id: parseInt(id),
      },
    });
    return user;
  } catch (error) {
    return error;
  }
};
