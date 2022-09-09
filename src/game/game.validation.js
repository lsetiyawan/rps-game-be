const { body } = require("express-validator");

const createGameRoomValidation = {
  room: {
    in: ["body"],
    isString: true,
  },
};

const gameFightValidation = {
  roomId: {
    in: ["params"],
    isInt: true,
    toInt: true,
    errorMessage: "roomId must be int",
  },
  choice: {
    in: ["params"],
    isIn: {
      options: [["R", "S", "P"]],
      errorMessage: "Must be R or S or P",
    },
  },
};

module.exports = {
  createGameRoomValidation,
  gameFightValidation,
};
