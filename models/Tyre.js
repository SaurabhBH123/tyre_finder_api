const mongoose = require("mongoose");

const tyreSchema = new mongoose.Schema({
  size: { type: String, required: true },
  type: { type: String, enum: ["Regular", "Upsize"], required: true },
  carRefs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
});

module.exports = mongoose.model("Tyre", tyreSchema);
