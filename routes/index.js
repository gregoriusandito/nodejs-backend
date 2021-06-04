let router = require("express").Router()

var userController = require("../controller/userController");

router.route("/")
    .get(userController.index)
    .post(userController.new);
router.route("/getByAccountNumber")
    .post(userController.getByAccountNumber);
router.route("/getByIdentityNumber")
    .post(userController.getByIdentityNumber);
router.route("/update")
    .post(userController.update);
router.route("/delete")
    .post(userController.update);

module.exports = router