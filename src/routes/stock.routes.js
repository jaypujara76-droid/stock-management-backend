const express = require("express");

const router = express.Router();

const stockController =
  require("../controllers/stock.controller");

const authMiddleware =
  require("../middlewares/auth.middleware");

router.post(
  "/",
  authMiddleware,
  stockController.createStock
);

router.get(
  "/",
  authMiddleware,
  stockController.getStocks
);

router.delete(
  "/:id",
  authMiddleware,
  stockController.deleteStock
);

module.exports = router;
