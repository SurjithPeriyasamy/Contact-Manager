const router = require("express").Router();
const {
  getAllContacts,
  getContact,
  updateContact,
  createContact,
  deleteContact,
} = require("../controllers/contactController");
const { validateToken } = require("../middlewares/validateTokenhandler");

router.use(validateToken);

router.get("", getAllContacts);

router.route("/").post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
