const User = require("../models/User");

class AuthRepository {

  async createUser(userData) {

    return await User.create(userData);
  }

  async findUserById(id) {

    return await User.findById(id);
  }

  async findUserByName(firstName) {

    return await User.findOne({
      firstName
    });
  }

  async updateUser(id, data) {

    return await User.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  }
}

module.exports =
  new AuthRepository();
