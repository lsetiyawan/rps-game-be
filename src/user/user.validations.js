const { body } = require("express-validator");

const registrationValidationObject = {
  name: {
    in: ["body"],
    isString: true,
  },
  email: {
    in: ["body"],
    isEmail: true,
  },
  password: {
    in: ["body"],
    isStrongPassword: true,
  },
};

const loginValidationObject = {
  email: {
    in: ["body"],
    isEmail: true,
  },
  password: {
    in: ["body"],
    isStrongPassword: true,
  },
};

module.exports = {
  registrationValidationObject,
  loginValidationObject,
};
