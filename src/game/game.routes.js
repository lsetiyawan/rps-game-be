const { Router } = require("express");
const { checkSchema } = require("express-validator");
const tokenVerification = require("../middleware/token.verification");
const { validate } = require("../middleware/validation");
const gameControllers = require("./game.controllers");
const {
  createGameRoomValidation,
  gameFightValidation,
} = require("./game.validation");

const gameRouter = Router();

/**
 * @swagger
 * /game:
 *  post:
 *    tags:
 *      - user
 *    summary: API untuk registrasi user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Nama lengkap
 *              email:
 *                type: string
 *                example: contoh@gmail.com
 *              password:
 *                type: string
 *                example: Password@123!
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                updatedAt:
 *                  type: string
 *                createdAt:
 *                  type: string
 */
gameRouter.post(
  "/game",
  tokenVerification,
  checkSchema(createGameRoomValidation),
  validate,
  gameControllers.createGame
);

// /**
//  * @swagger
//  * /login:
//  *  post:
//  *    tags:
//  *      - user
//  *    summary: API untuk login user
//  *    requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *          schema:
//  *            type: object
//  *            properties:
//  *              email:
//  *                type: string
//  *                example: contoh@gmail.com
//  *              password:
//  *                type: string
//  *                example: Password@123!
//  *    responses:
//  *      '200':
//  *        content:
//  *          application/json:
//  *            schema:
//  *              type: object
//  *              properties:
//  *                id:
//  *                  type: string
//  *                email:
//  *                  type: string
//  *                accessToken:
//  *                  type: string
//  */
gameRouter.put(
  "/game/fight/:roomId/:choice",
  tokenVerification,
  checkSchema(gameFightValidation),
  validate,
  gameControllers.fight
);

module.exports = gameRouter;
