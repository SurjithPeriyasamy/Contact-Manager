const router = require("express").Router();
const {
  getAllContacts,
  getContact,
  updateContact,
  createContact,
  deleteContact,
} = require("../controllers/contactController");

// @desc Get all contacts
// @route GET /api/contacts
// @access public
router.route("/").get(getAllContacts);

// @desc Create a new contact
// @route POST /api/contacts
// @access public
router.route("/").post(createContact);

// @desc Get a contact
// @route GET /api/contacts/:id
// @access public
router.route("/:id").get(getContact);

// @desc Update a contact
// @route PUT /api/contacts/:id
// @access public

router.route("/:id").put(updateContact);

// @desc Delete a contact
// @route DELETE /api/contacts/:id
// @access public
router.route("/:id").delete(deleteContact);

module.exports = router;
