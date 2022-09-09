const { User } = require("../database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");

class UserController {
  createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ where: { email }, raw: true });
    if (existUser) {
      return res.status(400).json({ message: "Email has been registered" });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const saveUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      return res.status(201).json(saveUser);
    } catch (err) {
      return res.status(500).json({ message: "Create user failed!" });
    }
  };

  userLogin = async (req, res) => {
    const { email, password } = req.body;
    const existUser = await User.findOne({ where: { email }, raw: true });

    //   kalau gak ada email yang terdaftar response not found
    if (!existUser) return res.status(404).json({ message: "User not found" });

    //   kalau ada cek password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existUser.password
    );
    if (isPasswordCorrect) {
      // generate jwt token
      const token = await jwt.sign(
        {
          id: existUser.id,
          name: existUser.name,
          email: existUser.email,
        },
        config.jwt_secret_token,
        { expiresIn: "1d" }
      );

      return res.json({
        accessToken: token,
        id: existUser.id,
        email: existUser.email,
      });
    } else {
      return res.status(400).send("Login failed");
    }
  };
}

module.exports = new UserController();
