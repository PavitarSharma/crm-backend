import { signUpSchema } from "../helpers/user.validation.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

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
