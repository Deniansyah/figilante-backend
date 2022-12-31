const {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser
} = require("../models/users.model");

exports.getUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    return res.status(200).json({
      success: true,
      message: "List of users",
      results: users,
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
    const user = await findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with id ${user.id} not found`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `User with id ${user.id} found`,
      results: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      results: user,
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

exports.updateUser = async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: `User with id ${user.id} updated successfully`,
      results: user,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: `User with id ${user.id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await deleteUser(req.params.id);
    return res.status(200).json({
      success: true,
      message: `User with id ${user.id} deleted successfully`,
      results: user,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: `User with id ${user.id} not found`,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
