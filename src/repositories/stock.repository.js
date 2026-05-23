const Stock = require("../models/Stock");

class StockRepository {

  async create(stockData) {

    return await Stock.create(stockData);
  }

  async findByName(name) {

    return await Stock.findOne({
      name
    });
  }

  async findById(id) {

    return await Stock.findById(id);
  }

  async getAll(sortField, sortOrder) {

    const sort = {};

    sort[sortField] = sortOrder;

    return await Stock.find().sort(sort);
  }

  async updateQty(id, qty) {

    return await Stock.findByIdAndUpdate(
      id,
      { qty },
      { new: true }
    );
  }

  async delete(id) {

    return await Stock.findByIdAndDelete(id);
  }
}

module.exports =
  new StockRepository();
