const express = require("express");
var cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const { MONGOURI } = require("./keys");

//user schema import
require("./models/user");
require("./models/image");
app.use(cors());
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/image"));

//mongodb connection
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected");
});
mongoose.connection.on("error", (err) => {
  console.log("err connect", err);
});

//port assinging
app.listen(PORT, () => {
  console.log("server is", PORT);
});
