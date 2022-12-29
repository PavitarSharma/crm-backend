import { loginSchema, signUpSchema } from "../helpers/user.validation.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { accessJwtToken, refreshJwtToken } from "../helpers/jwt-helper.js";


export const signUp = async (req, res, next) => {
  try {
    const { error } = signUpSchema(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const { username, email, company, phone, address, password } = req.body;

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(404).json({ message: "User already exit!" });
    }

    // hashing password
    const genSalt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, genSalt)

    const newUserObj = {
      username,
      email,
      company,
      address,
      phone,
      password: hashPassword,
    };

    user = await new User(newUserObj);

    const result = await user.save();

    res.status(200).json({
      message: "User created successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


export const login = async (req, res, next) => {
  try {
    const { error } = loginSchema(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ message: "All fiels are required!" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User does not exit!" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(404).json({ message: "User password is wrong!" });
    }

    const accessToken = await accessJwtToken(user.email, `${user._id}`)
    const refreshToken = await refreshJwtToken(user.email, `${user._id}`)


    res.status(200).json({
      message: "User logged in successfully",
      accessToken,
      refreshToken

    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

