const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    activeTokens: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model("User", userSchema);
