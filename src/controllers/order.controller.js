const orderService =
  require("../services/order.service");

class OrderController {

  async createOrder(req, res) {

    try {

      const order =
        await orderService.createOrder(
          req.body,
          req.user._id
        );

      return res.status(201).json({
        success: true,
        message:
          "Order created successfully",
        data: order
      });

    } catch (error) {

      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getOrders(req, res) {

    try {

      const {
        sortField,
        sortOrder
      } = req.query;

      const orders =
        await orderService.getOrders(
          sortField,
          sortOrder ? Number(sortOrder) : -1,
          req.user._id
        );

      return res.status(200).json({
        success: true,
        data: orders
      });

    } catch (error) {

      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteOrder(req, res) {

    try {

      await orderService.deleteOrder(
        req.params.id,
        req.user._id
      );

      return res.status(200).json({
        success: true,
        message:
          "Order deleted successfully"
      });

    } catch (error) {

      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports =
  new OrderController();
