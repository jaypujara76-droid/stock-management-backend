const Order = require("../models/Order");

class OrderRepository {

  async create(orderData) {

    return await Order.create(orderData);
  }

  async findById(id) {

    return await Order.findById(id);
  }

  async getAll(sortField, sortOrder, userId) {

    const sort = {};

    sort[sortField] = sortOrder;

    return await Order.find({ userId })
      .populate("stockId")
      .sort(sort);
  }

  async countOrdersByStock(stockId) {

    return await Order.countDocuments({
      stockId
    });
  }

  async delete(id) {

    return await Order.findByIdAndDelete(id);
  }
}

module.exports =
  new OrderRepository();
