const EmailController = require("../controllers/EmailController");
const router = require("express").Router();

router.post("/send", EmailController.sendVerificationEmail);

router.get("/enable", EmailController.enableEmail);

module.exports = router;
