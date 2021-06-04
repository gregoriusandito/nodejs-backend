let router = require("express").Router()

var userController = require("../controller/userController");

router.route("/")
    .get(userController.index)
    .post(userController.new);
router.route("/getByAccountNumber")
    .post(userController.getByAccountNumber);
router.route("/getByIdentityNumber")
    .post(userController.getByIdentityNumber);
router.route("/:user_id")
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

module.exports = router