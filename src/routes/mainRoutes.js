const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const furnitureRoutes = require('./furnitureRoutes');

router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/furniture", furnitureRoutes);

module.exports = router;