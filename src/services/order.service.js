const orderRepository =
  require("../repositories/order.repository");

const stockRepository =
  require("../repositories/stock.repository");

class OrderService {

  async createOrder(data) {

    const {
      customerName,
      stockId,
      orderQty
    } = data;

    if (!customerName) {
      throw new Error(
        "Customer name required"
      );
    }

    if (!orderQty || orderQty <= 0) {
      throw new Error(
        "Order qty must be greater than 0"
      );
    }

    const stock =
      await stockRepository.findById(
        stockId
      );

    if (!stock) {
      throw new Error(
        "Stock not found"
      );
    }

    if (orderQty > stock.qty) {
      throw new Error(
        "Order qty exceeds stock qty"
      );
    }

    const remainingQty =
      stock.qty - orderQty;

    await stockRepository.updateQty(
      stockId,
      remainingQty
    );

    return await orderRepository.create({
      customerName,
      stockId,
      orderQty
    });
  }

  async getOrders(
    sortField = "createdAt",
    sortOrder = -1
  ) {

    return await orderRepository.getAll(
      sortField,
      sortOrder
    );
  }

  async deleteOrder(id) {

    const order =
      await orderRepository.findById(id);

    if (!order) {
      throw new Error(
        "Order not found"
      );
    }

    const stock =
      await stockRepository.findById(
        order.stockId
      );

    const updatedQty =
      stock.qty + order.orderQty;

    await stockRepository.updateQty(
      stock._id,
      updatedQty
    );

    return await orderRepository.delete(id);
  }
}

module.exports =
  new OrderService();