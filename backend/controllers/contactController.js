const getAllContacts = (req, res) => {
  res.json({ message: "All contacts" });
};

const createContact = (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!(name && email && phone)) {
    return res.status(400).json({ message: "all fields are required" });
  }
  res.json({ message: "All contacts" });
};

const getContact = (req, res) => {
  res.json({ message: `A contact detail for ${req.params.id}` });
};

const updateContact = (req, res) => {
  res.json({ message: `A contact Update for ${req.params.id}` });
};

const deleteContact = (req, res) => {
  res.json({ message: `A contact delete with this id ${req.params.id}` });
};

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
