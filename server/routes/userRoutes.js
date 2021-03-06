const router = require("express").Router();
const userController = require("../controllers/userController");
const { auth } = require("../middlewares/authentication");

router.get("/", auth, userController.getAllUsers);

router.get("/me", auth, userController.getMe);

router.get("/count", auth, userController.getUsersCount);

router.get("/:id", auth, userController.getUserById);

router.put("/me/update", auth, userController.updateMe);

router.delete("/me/delete", auth, userController.deleteMe);

module.exports = router;

