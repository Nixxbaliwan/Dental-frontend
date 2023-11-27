const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.post("/register", UserController.registerUser);

router.post("/login", UserController.loginUser);

router.get("/list", UserController.getUserList);

router.get("/:email", UserController.getSpecificUserByEmail);

router.get("/getById/:id", UserController.getUserById);

router.put(
  "/updateByContactNumber/:contactNumber",
  UserController.updateUserByContactNumber
);

router.put("/update/doctor/:id", UserController.updateUserById);

router.get("/getPatients/patient", UserController.getUsersByRolePatient);

router.get("/getDoctors/doctor", UserController.getUserByRoleDoctor);

router.delete("/delete/:id", UserController.deleteUserById);

module.exports = router;
