const { Router } = require("express");
const { checkSchema } = require("express-validator");
const { validate } = require("../middleware/validation");
const UserController = require("./user.controllers");
const {
  registrationValidationObject,
  loginValidationObject,
} = require("./user.validations");

const userRouter = Router();

/**
 * @swagger
 * /register:
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
userRouter.post(
  "/register",
  checkSchema(registrationValidationObject),
  validate,
  UserController.createUser
);

/**
 * @swagger
 * /login:
 *  post:
 *    tags:
 *      - user
 *    summary: API untuk login user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
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
 *                email:
 *                  type: string
 *                accessToken:
 *                  type: string
 */
userRouter.post(
  "/login",
  checkSchema(loginValidationObject),
  validate,
  UserController.userLogin
);

module.exports = userRouter;
