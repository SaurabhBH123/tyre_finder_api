const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alloyWheelSchema = new Schema({
  size: { type: String, required: true, unique: true },
  carRefs: [{ type: Schema.Types.ObjectId, ref: "Car" }],
});

module.exports = mongoose.model("AlloyWheel", alloyWheelSchema);
