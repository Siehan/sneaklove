const express = require("express");
const router = express.Router();
const tagModel = require("../models/Tag");
const sneakerModel = require("../models/Sneaker");

router.get("/", (req, res) => {
   res.render("index");
});

router.get("/sneakers/collection", (req, res, next) => {
    Promise.all([sneakerModel.find(), tagModel.find()])
    .then(dbResults => {
        res.render("products", {
         sneakers : dbResults[0],
         tags : dbResults[1]
        });
    })
    .catch(next);
});

router.get("/sneakers/:cat", (req, res, next) => {
    Promise.all([sneakerModel.find( { "category" : req.params.cat } ) , tagModel.find()])
    .then(dbResults => {
        res.render("products", {
         sneakers : dbResults[0],
         tags : dbResults[1]
        });
    })
    .catch(next);
});

router.get("/one-product/:id", (req, res, next) => {
    sneakerModel
    .findById(req.params.id) // retreive all the documents in the artists collection
    .then(dbResults => {
        res.render("one_product",  { sneaker : dbResults });
    })
    .catch(next);
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

router.post("/create", (req, res, next) => {
  const newSneaker = req.body;
  if (req.body.image === "") newSneaker.image = undefined;
  sneakerModel
    .create(newSneaker) // use the model and try doc insertion in database
    .then(() => {
      req.flash("success", "Le sneaker s'est bien créé");     
      res.redirect("/create-product");
    })
    .catch(next);
});
//      req.flash("success", "sneaker successfully created");

router.post("/tag-add", (req, res, next) => {
  const { label } = req.body;
  tagModel
    .create({
      label,
    })
    .then(dbRes => {        
      req.flash("success", "Le tag s'est bien créé");  
      res.redirect("/tag-add");
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
        req.flash("success", "Le sneaker automatique s'est bien créé");     
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
