const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const argon = require("argon2");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password, phoneNumber } = req.body;
    const passwordHashed = await argon.hash(password);
    const register = await prisma.users.create({
      data: {
        email,
        password: passwordHashed,
        phoneNumber,
      },
    });
    const token = jwt.sign({ id: register.id }, "backend-secret");
    res.status(201).json({
      success: true,
      message: "Register successfully",
      results: {
        token,
      },
    });
  } catch (error) {
    if (error.code === "P2002" && error.meta.target.includes("email")) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    if (error.code === "P2002" && error.meta.target.includes("phoneNumber")) {
      return res.status(400).json({
        success: false,
        message: "Phone number already exists",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const login = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (!login) {
      return res.status(404).json({
        success: false,
        message: `Account not registered`,
      });
    }
    if (await argon.verify(login.password, password)) {
      const token = jwt.sign({ id: login.id }, "backend-secret");
      res.status(201).json({
        success: true,
        message: "Login successfully",
        results: {
          token,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Wrong email or password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const forgotPassword = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (!forgotPassword) {
      return res.status(404).json({
        success: false,
        message: `Account not found`,
      });
    }
    const code = Math.floor(Math.random() * 90000) + 10000
    await prisma.resetPasswords.create({
      data: {
        userId: parseInt(forgotPassword.id),
        email: forgotPassword.email,
        code: code.toString(),
      },
    });
    return res.status(201).json({
      success: true,
      message: "Password reset code has been sent to your email",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword, confirmNewPassword } = req.body;
    const resetPassword = await prisma.resetPasswords.findUnique({
      where : {
        email: email,
        code: code,
      }
    })
    if (!resetPassword) {
      return res.status(404).json({
        success: false,
        message: `Account not found`,
      });
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm new password do not match",
      });
    }
    const passwordHashed = await argon.hash(newPassword);
    const updatePassword = await prisma.users.update({
      where: {
        email: email,
      },
      data: {
        password: passwordHashed
      }
    })
    if (!updatePassword) {
      return res.status(400).json({
        success: false,
        message: "Failed to update password",
      });
    }
    await prisma.resetPasswords.delete({
      where: {
        email: email,
        code: code,
      }
    })
    return res.status(201).json({
      success: true,
      message: "Password has been updated",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
