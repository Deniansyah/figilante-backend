const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    return res.status(200).json({
      success: true,
      message: "List of users",
      results: {
        users,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with id ${id} not found`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `User with id ${id} found`,
      results: {
        user,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.createUser = async (req, res) => {
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
    } = req.body;
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
        birthdate,
        picture,
        isAdmin,
      },
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      results: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
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
  } = req.body;
  try {
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
        birthdate,
        picture,
        isAdmin,
      },
    });
    return res.status(200).json({
      success: true,
      message: `User with id ${id} updated successfully`,
      results: {
        user,
      },
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: `User with id ${id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.users.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json({
      success: true,
      message: `User with id ${id} deleted successfully`,
      results: {
        user,
      },
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: `User with id ${id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
