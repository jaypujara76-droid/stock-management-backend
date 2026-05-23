const stockService =
  require("../services/stock.service");

class StockController {

  async createStock(req, res) {

    try {

      const stock =
        await stockService.createStock(
          req.body
        );

      return res.status(201).json({
        success: true,
        message:
          "Stock created successfully",
        data: stock
      });

    } catch (error) {

      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getStocks(req, res) {

    try {

      const {
        sortField,
        sortOrder
      } = req.query;

      const stocks =
        await stockService.getStocks(
          sortField,
          sortOrder ? Number(sortOrder) : -1
        );

      return res.status(200).json({
        success: true,
        data: stocks
      });

    } catch (error) {

      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteStock(req, res) {

    try {

      await stockService.deleteStock(
        req.params.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Stock deleted successfully"
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
  new StockController();
