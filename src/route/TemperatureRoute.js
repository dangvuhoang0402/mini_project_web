const TemperatureController = require("../controllers/TemperatureController");
const express = require("express");

const router = express.Router();

router.get("/", TemperatureController.getAllTemperature);
router.post("/", TemperatureController.createTemperature);

router
  .route("/:id")
  .delete(TemperatureController.deleteTemperature)
  .put(TemperatureController.updateTemperature)
  .get(TemperatureController.getTemperaturebyId);

module.exports = router;   
