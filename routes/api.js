const express = require("express");
const router = express.Router();
const {
  addMapping,
  getTyresByCar,
  getCarsByTyre,
  deleteCar,
  deleteTyre,
  getAllTyres,
  getAllCars,
} = require("../controllers/apiController");

// Add Mapping
router.post("/mapping", addMapping);

// Search
router.get("/tyres/:carModel", getTyresByCar);
router.get("/cars", getCarsByTyre);

//all data
router.get("/all/tyres", getAllTyres);
router.get("/all/cars", getAllCars);

// Admin CRUD
router.delete("/car/:model", deleteCar);
router.delete("/tyre", deleteTyre);

module.exports = router;
