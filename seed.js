const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Car = require("./models/Car");
const Tyre = require("./models/Tyre");
const connectDB = require("./config/db");

dotenv.config();

const seedData = async () => {
  await connectDB();

  try {
    // Clear old data
    await Car.deleteMany();
    await Tyre.deleteMany();

    // Seed cars and tyres
    const cars = [
      { model: "Toyota Corolla", sizes: ["195/65R15", "205/55R16"] },
      { model: "Honda Civic", sizes: ["205/55R16", "215/45R17"] },
      { model: "Hyundai Elantra", sizes: ["195/65R15", "205/60R16"] },
    ];

    for (const carData of cars) {
      let car = new Car({ model: carData.model, tyreRefs: [] });

      for (const size of carData.sizes) {
        let tyre = await Tyre.findOne({ size });

        if (!tyre) {
          tyre = new Tyre({ size, carRefs: [] });
          await tyre.save();
        }

        car.tyreRefs.push(tyre._id);
        tyre.carRefs.push(car._id);
        await tyre.save();
      }

      await car.save();
    }

    console.log("Database Seeded Successfully 🌱");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
