const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Image = mongoose.model("Image");

router.post("/hostimage", requireLogin, (req, res) => {
  const { title, pic } = req.body;
  if (!title || !pic) {
    return res.status(422).json({ error: "please fill the title" });
  }
  req.user.password = undefined;
  const image = new Image({
    title,
    photo: pic,
    uploadBy: req.user,
  });
  image
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/thumbnails", requireLogin, (req, res) => {
  Image.find()
    .populate("uploadBy", "_id name")
    .then((thumbnails) => {
      res.json({ thumbnails });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/myimages", requireLogin, (req, res) => {
  Image.find({ uploadBy: req.user._id })
    .populate("uploadBy", "_id name")
    .then((myimages) => {
      res.json({ myimages });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
