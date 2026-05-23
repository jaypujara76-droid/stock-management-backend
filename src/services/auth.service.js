const bcrypt = require("bcryptjs");

const authRepository =
  require("../repositories/auth.repository");

const generateToken =
  require("../utils/generateToken");

const BlacklistedToken =
  require("../models/BlacklistedToken");

class AuthService {

  async register(data) {

    const {
      firstName,
      lastName,
      password,
      confirmPassword
    } = data;

    if (
      !firstName ||
      !lastName ||
      !password ||
      !confirmPassword
    ) {
      throw new Error(
        "All fields are required"
      );
    }

    if (password !== confirmPassword) {
      throw new Error(
        "Passwords do not match"
      );
    }

    const existingUser =
      await authRepository.findUserByName(
        firstName
      );

    if (existingUser) {
      throw new Error(
        "User already exists"
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await authRepository.createUser({
        firstName,
        lastName,
        password: hashedPassword
      });

    return user;
  }

  async login(data) {

    const {
      firstName,
      password
    } = data;

    const user =
      await authRepository.findUserByName(
        firstName
      );

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      throw new Error(
        "Invalid password"
      );
    }

    const token =
      generateToken(user._id);

    user.activeTokens.push(token);

    await user.save();

    return {
      user,
      token
    };
  }

  async logout(token) {

    await BlacklistedToken.create({
      token
    });

    return {
      message: "Logout successful"
    };
  }

  async logoutAll(user) {

    user.activeTokens = [];

    await user.save();

    return {
      message:
        "Logged out from all devices"
    };
  }
}

module.exports =
  new AuthService();
