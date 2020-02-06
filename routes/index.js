const express = require("express");
const router = express.Router();
const tagModel = require("../models/Tag");

router.get("/", (req, res) => {
   res.render("index");
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

router.get("/create-product", (req, res, next) => {
    tagModel
    .find() // retreive all the documents in the artists collection
    .then(dbResults => {
        res.render("products_add", {
         tags : dbResults
      });
    })
    .catch(next);
    
});

router.post("/create-product", (req, res, next) => {
    tagModel
    .find() // retreive all the documents in the artists collection
    .then(dbResults => {
        res.render("products_add", {
         tags : dbResults
      });
    })
    .catch(next);
    
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

router.post("/tag-add-mix", (req, res, next) => {
  const { label } = req.body;
  tagModel
    .create({
      label,
    })
    .then(dbRes => {
      res.redirect("/create-product");
    })
    .catch(next);
});


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
