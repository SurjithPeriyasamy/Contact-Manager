const express = require("express");
const mongoose = require("mongoose");
const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use(errorHandler);

main().catch((err) => console.log(err.message));
async function main() {
  const connect = await mongoose.connect(process.env.CONNECTION_STRING);
  console.log(
    "Database connected",
    connect.connection.host,
    connect.connection.name
  );
  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
}
