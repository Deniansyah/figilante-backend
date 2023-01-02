const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

exports.getProfile = async (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const { id } = jwt.verify(token, "backend-secret");
  try {
    const profile = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        nickName: true,
        firstName: true,
        lastName: true,
        email: true,
        picture: true,
        phoneNumber: true,
        address: true,
        gender: true,
        birthdate: true,
        isAdmin: true,
      },
    });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: `User not found`,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Profile successfully retrieved",
      results: profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateProfile = async (req, res) => {
  if (req.file) {
    req.body.picture = req.file.filename;
  }
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const { id } = jwt.verify(token, "backend-secret");
  try {
    const {
      nickName,
      firstName,
      lastName,
      email,
      picture,
      phoneNumber,
      address,
      gender,
      birthdate,
    } = req.body;
    const updateProfile = await prisma.users.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nickName,
        firstName,
        lastName,
        email,
        picture,
        phoneNumber,
        address,
        gender,
        birthdate: new Date(birthdate),
      },
    });
    if (!updateProfile) {
      return res.status(404).json({
        success: false,
        message: `User not found`,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Profile successfully updated",
      results: updateProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
