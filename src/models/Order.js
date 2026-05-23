const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true
    },

    stockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true
    },

    orderQty: {
      type: Number,
      required: true,
      min: 1
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model("Order", orderSchema);
