const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.post("/register", UserController.registerUser);

router.post("/login", UserController.loginUser);

router.get("/list", UserController.getUserList);

router.get("/:email", UserController.getSpecificUserByEmail);

router.get("/getById/:id", UserController.getUserById);

router.get("/getDoctors/doctor", UserController.getUserDoctor);

router.get("/getPatients/patient", UserController.getUserPatient);

router.put(
  "/updateByContactNumber/:contactNumber",
  UserController.updateUserByContactNumber
);

router.delete("/delete/:id", UserController.deleteUserDoctor);

router.put("/update/doctor/:id", UserController.updateUserDoctor);

module.exports = router;
