const { Contact } = require("../models/contactModel");

const getAllContacts = async (req, res) => {
  try {
    const { skip, limit } = req.query;
    const allContacts = await Contact.find({});

    res.status(200).json({ data: allContacts, limit, skip });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!(name && email && phone)) {
    return res.status(400).json({ message: "all fields are required" });
  }
  const existingContact = await Contact.findOne({ phone });
  if (existingContact) {
    return res.status(400).json({ message: "Contact already exists" });
  }
  const newContact = await Contact.create(req.body);

  res.status(201).json({ message: "Successfully created", data: newContact });
};

const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.status(200).json({ data: contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!(name || email || phone)) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const { id } = req.params;
    await Contact.findByIdAndUpdate(id, req.body);
    const updatedContact = await Contact.findOne({ _id: id });
    res
      .status(200)
      .json({ message: "Contact updated successfully", data: updatedContact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json({ data: contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.json({ message: `A contact delete with this id ${req.params.id}` });
};

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
