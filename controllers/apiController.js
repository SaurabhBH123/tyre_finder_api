const AlloyWheel = require("../models/AlloyWheel");
const Car = require("../models/Car");
const Tyre = require("../models/Tyre");

// Add Car ↔ Tyres mapping
// Add Car ↔ Tyres mapping
exports.addMapping = async (req, res) => {
  const { model, sizes } = req.body;

  try {
    let car = await Car.findOne({ model });
    if (!car) {
      car = new Car({ model, tyreRefs: [] });
    }

    for (let { size, type } of sizes) {
      let tyre = await Tyre.findOne({ size, type }); // search tyre by both size and type

      if (!tyre) {
        tyre = new Tyre({ size, type, carRefs: [] }); // create tyre with size and type
        await tyre.save();
      }

      if (!car.tyreRefs.includes(tyre._id)) {
        car.tyreRefs.push(tyre._id);
      }

      if (!tyre.carRefs.includes(car._id)) {
        tyre.carRefs.push(car._id);
        await tyre.save();
      }
    }

    await car.save();
    res.json({ message: "Mapping saved", car });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Tyres by Car Model
exports.getTyresByCar = async (req, res) => {
  try {
    const car = await Car.findOne({ model: req.params.carModel }).populate(
      "tyreRefs"
    );
    if (!car) return res.status(404).json({ message: "Car not found" });

    res.json(car.tyreRefs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Get all tyres
exports.getAllTyres = async (req, res) => {
  try {
    const tyres = await Tyre.find();
    return res.json(tyres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Alloy Wheels by Car Model
exports.getAlloyWheelsByCar = async (req, res) => {
  try {
    const car = await Car.findOne({ model: req.params.carModel }).populate(
      "alloyWheelRefs"
    );
    if (!car) return res.status(404).json({ message: "Car not found" });

    res.json(car.alloyWheelRefs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Get all alloy wheels
exports.getAllAlloyWheels = async (req, res) => {
  try {
    const alloyWheels = await AlloyWheel.find();
    return res.json(alloyWheels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Cars by Tyre Size
exports.getCarsByTyre = async (req, res) => {
  const { size } = req.query;
  try {
    const tyre = await Tyre.findOne({ size }).populate("carRefs");
    if (!tyre) return res.status(404).json({ message: "Tyre not found" });

    res.json(tyre.carRefs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Get all cars
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    return res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Car
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({ model: req.params.model });
    if (!car) return res.status(404).json({ message: "Car not found" });

    await Tyre.updateMany(
      { carRefs: car._id },
      { $pull: { carRefs: car._id } }
    );

    res.json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Tyre
exports.deleteTyre = async (req, res) => {
  const { size } = req.query;
  try {
    const tyre = await Tyre.findOneAndDelete({ size });
    if (!tyre) return res.status(404).json({ message: "Tyre not found" });

    await Car.updateMany(
      { tyreRefs: tyre._id },
      { $pull: { tyreRefs: tyre._id } }
    );

    res.json({ message: "Tyre deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
