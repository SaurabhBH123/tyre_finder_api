const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  model: { type: String, required: true },
  tyreRefs: [{ type: Schema.Types.ObjectId, ref: "Tyre" }],
  alloyWheelRefs: [{ type: Schema.Types.ObjectId, ref: "AlloyWheel" }],
});

module.exports = mongoose.model("Car", carSchema);
