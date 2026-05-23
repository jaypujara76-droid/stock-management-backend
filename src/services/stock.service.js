const stockRepository =
  require("../repositories/stock.repository");

const orderRepository =
  require("../repositories/order.repository");

const Order =
  require("../models/Order");

class StockService {

  async createStock(data) {

    const {
      name,
      qty
    } = data;

    if (!name) {

      throw new Error(
        "Stock name is required"
      );
    }

    if (!qty || qty <= 0) {

      throw new Error(
        "Quantity must be greater than 0"
      );
    }

    const existingStock =
      await stockRepository.findByName(
        name
      );

    if (existingStock) {

      throw new Error(
        "Duplicate stock name not allowed"
      );
    }

    return await stockRepository.create({
      name,
      qty
    });
  }

  async getStocks(
    sortField = "createdAt",
    sortOrder = -1
  ) {

    const stocks =
      await stockRepository.getAll(
        sortField,
        sortOrder
      );

    const updatedStocks =
      await Promise.all(

        stocks.map(async (stock) => {

          const orders =
            await Order.find({
              stockId: stock._id
            });

          const totalOrderQty =
            orders.reduce(
              (sum, item) =>
                sum + item.orderQty,
              0
            );

          return {
            ...stock.toObject(),
            orderQty: totalOrderQty
          };
        })
      );

    return updatedStocks;
  }

  async deleteStock(id) {

    const totalOrders =
      await orderRepository.countOrdersByStock(
        id
      );

    if (totalOrders > 0) {

      throw new Error(
        "Cannot delete stock with orders"
      );
    }

    return await stockRepository.delete(id);
  }
}

module.exports =
  new StockService();