const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
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
