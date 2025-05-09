const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT;

const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/role");
const CategoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");

app.use(cors());
app.use(express.json());

app.use("/product", productRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/category", CategoryRouter);
app.use("/cart", cartRouter);

app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
