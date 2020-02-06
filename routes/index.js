const express = require("express");
const router = express.Router();
const tagModel = require("../models/Tag");

router.get("/", (req, res) => {
  res.send("foo");
});

router.get("/sneakers/:cat", (req, res) => {
  res.send("bar");
});

router.get("/sneakers/:cat", (req, res) => {
  res.send("bar");
});

router.get("/one-product/:id", (req, res) => {
  res.send("baz");
});

router.get("/create-product", (req, res) => {
    res.render("products_add");
});

router.post("/tag-add", (req, res, next) => {
  const { label } = req.body;
  tagModel
    .create({
      label,
    })
    .then(dbRes => {
      res.redirect("/");
    })
    .catch(next);
});
//      req.flash("success", "zozo artist successfully created");



router.get("/create-tag", (req, res) => {
    res.render("tag_add");
});

router.get("/signup", (req, res) => {
  res.send("sneak");
});

router.get("/signin", (req, res) => {
  res.send("love");
});



module.exports = router;
