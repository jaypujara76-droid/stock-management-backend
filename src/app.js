const express = require("express");

const cors = require("cors");

const authRoutes =
  require("./routes/auth.routes");

const stockRoutes =
  require("./routes/stock.routes");

const orderRoutes =
  require("./routes/order.routes");

const errorMiddleware =
  require("./middlewares/error.middleware");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

  res.json({
    success: true,
    message: "Stock Management API Running"
  });
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/stocks",
  stockRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(errorMiddleware);

module.exports = app;
