const { Contact } = require("../models/contactModel");
const { getError } = require("../constants");

// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getAllContacts = async (req, res, next) => {
  try {
    // const { skip, limit } = req.query;
    const allContacts = await Contact.find({ user_id: req.user.id });
    // .populate(
    //   "user_id"
    // );

    res.status(200).json({ data: allContacts });
  } catch (error) {
    next(getError(error.message, 500));
    // res.status(500).send({ message: error.message });
  }
};

// @desc Create a new contact
// @route POST /api/contacts
// @access private
const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!(name && email && phone)) {
      return next(getError("all fields are required", 400));
      // return res.status(400).json({ message: "all fields are required" });
    }

    const existingContact = await Contact.findOne({ phone });
    if (existingContact) {
      const err = new Error("Contact already exists");
      err.statusCode = 400;
      return next(getError("Contact already exists", 400));
      // return res.status(400).json({ message: "Contact already exists" });
    }
    const newContact = await Contact.create({
      user_id: req.user.id,
      ...req.body,
    });

    res.status(201).json({ message: "Successfully created", data: newContact });
  } catch (error) {
    next(getError(error.message, 500));
  }
};

// @desc Get a contact
// @route GET /api/contacts/:id
// @access private
const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.status(200).json({ data: contact });
  } catch (error) {
    next(getError(error.message, 500));
    // res.status(500).json({ message: error.message });
  }
};

// @desc Update a contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!(name || email || phone)) {
      return next("all fields are required", 400);
      // return res.status(400).json({ message: "all fields are required" });
    }
    const { id } = req.params;
    const contact = await Contact.findOne({ _id: id });
    if (contact.user_id.toString() !== req.user.id) {
      return next(
        getError(
          "user doesn't have permission to update the other contacts",
          403
        )
      );
    }
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Contact updated successfully", data: updatedContact });
  } catch (error) {
    next(getError(error.message, 500));
    // res.status(500).json({ message: error.message });
  }
};

// @desc Delete a contact
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (contact.user_id.toString() !== req.user.id) {
      return next(getError("User can't delete contacts from other users", 403));
    }
    const deletedContact = await Contact.findByIdAndDelete(
      req.params.id,
      req.body
    );
    res.status(200).json({ data: deletedContact });
  } catch (error) {
    next(getError(error.message, 500));
    // res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
