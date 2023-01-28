const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  photo: {
    type: String,
    required: true,
  },
  uploadBy: {
    type: ObjectId,
    ref: "User",
  },
});

mongoose.model("Image", imageSchema);
