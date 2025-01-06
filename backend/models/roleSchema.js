const mongoose = require("mongoose");
const permissions_types = {
  admin: {
    "category": ["GET", "POST", "PUT", "DELETE"],
    "product": ["GET", "POST", "PUT", "DELETE"],
    "cart": ["GET", "POST", "PUT", "DELETE"],
    "favourite": ["GET", "POST", "PUT", "DELETE"]
  },
  user: {
    "category": ["GET"],
    "product": ["GET"],
    "cart": ["GET", "POST", "PUT", "DELETE"],
    "favourite": ["GET", "POST", "PUT", "DELETE"]
  }
};

const rolesSchema = new mongoose.Schema({
  role: { type: String, required: true },
  permissions: { type: Object, required: true },
});

module.exports = mongoose.model("Role", rolesSchema);
