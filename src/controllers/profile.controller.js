const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const argon = require("argon2");
const cloudinary = require("cloudinary").v2;

exports.getProfile = async (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const { id } = jwt.verify(token, process.env.SECRET);
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
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const { id } = jwt.verify(token, process.env.SECRET);
  try {
    const {
      nickName,
      firstName,
      lastName,
      email,
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

exports.uploadProfilePicture = async (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const { id } = jwt.verify(token, process.env.SECRET);
  if (req.file) {
    req.body.picture = req.file.path;
    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (user?.picture) {
      const fileName = user?.picture?.split("/").pop()?.split(".")[0];
      cloudinary.uploader.destroy(`figilante-coffee/${fileName}`);
    }
  }
  try {
    const { picture } = req.body;
    const updateProfilePicture = await prisma.users.update({
      where: {
        id: parseInt(id),
      },
      data: {
        picture,
      },
    });
    if (!updateProfilePicture) {
      return res.status(404).json({
        success: false,
        message: `User not found`,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Profile picture successfully updated",
      results: updateProfilePicture,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

exports.changePassword = async (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const { id } = jwt.verify(token, process.env.SECRET);
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  try {
    const changePassword = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!changePassword) {
      return res.status(404).json({
        success: false,
        message: `Account not found`,
      });
    }
    if (await argon.verify(changePassword.password, oldPassword)) {
      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({
          success: false,
          message: "New password and confirm new password do not match",
        });
      }
      const passwordHashed = await argon.hash(newPassword);
      const updatePassword = await prisma.users.update({
        where: {
          id: parseInt(id),
        },
        data: {
          password: passwordHashed,
        },
      });
      if (!updatePassword) {
        return res.status(400).json({
          success: false,
          message: "Failed to update password",
        });
      }
      return res.status(201).json({
        success: true,
        message: "Password has been updated",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
