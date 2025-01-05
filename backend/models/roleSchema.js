const mongoose = require("mongoose");
const permissions_types = {
  admin: [
    { category: ["get", "create", "update", "delete"] },
    { product: ["get", "create", "update", "delete"] },
    { cart: ["get", "create", "update", "delete"] },
    { favourite: ["get", "create", "update", "delete"] },
  ],
  user: [
    { category: ["get"] },
    { product: ["get"] },
    { cart: ["get", "create", "update", "delete"] },
    { favourite: ["get", "create", "update", "delete"] },
  ]
};

const rolesSchema = new mongoose.Schema({
  role: { type: String, required: true },
  permissions: [{ type: Object, required: true }],
});

module.exports = mongoose.model("Role", rolesSchema);
