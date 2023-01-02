const { checkSchema, validationResult } = require("express-validator");

exports.rules = (method) => {
  switch (method) {
    case "login": {
      return checkSchema({
        email: {
          in: ["body"],
          isEmail: true,
          errorMessage: "Email is not valid",
        },
      });
    }
    case "register": {
      return checkSchema({
        email: {
          in: ["body"],
          isEmail: true,
          errorMessage: "Email is not valid",
        },
        phoneNumber: {
          in: ["body"],
          errorMessage: "Phone Number is required",
          isString: true,
        },
        password: {
          in: ["body"],
          errorMessage:
            "Password must be at least 6 chars long, contain 1 number, 1 uppercase, 1 lowercase and 1 special char",
          isStrongPassword: {
            options: {
              minLength: 6,
              minLowercase: 1,
              minUppercase: 1,
              minNumbers: 1,
              minSymbols: 1,
            },
          },
        },
      });
    }
    case "forgotPassword": {
      return checkSchema({
        email: {
          in: ["body"],
          isEmail: true,
          errorMessage: "Email is not valid",
        },
      });
    }
    case "resetPassword": {
      return checkSchema({
        newPassword: {
          in: ["body"],
          errorMessage:
            "Password must be at least 6 chars long, contain 1 number, 1 uppercase, 1 lowercase and 1 special char",
          isStrongPassword: {
            options: {
              minLength: 6,
              minLowercase: 1,
              minUppercase: 1,
              minNumbers: 1,
              minSymbols: 1,
            },
          },
        },
      });
    }
    default: {
      return (req, res, next) => {
        next();
      };
    }
  }
};

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array(),
    });
  }
  next();
};
