const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");

//router.get('/', controller.getAllUser);
router.get("/",jwtMiddleware.verifyToken, jwtMiddleware.verifyAdmin, controller.getAllUser);
router.post('/', controller.createNewUser);

router.get('/:userid', controller.getUserById);
router.put('/:userid', controller.updateUserById);
router.delete('/:userid', controller.deleteUserById);

router.post("/loginold", controller.loginUser, jwtMiddleware.generateToken, jwtMiddleware.sendToken); // changed route name to coexist with lab 6.12, since implementation was done in lab 6.9
router.post("/login", controller.loginUserBcrypt, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", controller.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, controller.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

module.exports = router;