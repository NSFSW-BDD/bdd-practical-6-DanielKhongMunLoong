const express = require('express');
const router = express.Router();

const controller = require("../controllers/furnitureController");
router.get('/', controller.readAllFurniture);

module.exports = router;