const express = require("express");
const router = express.Router();
const tagModel = require("../models/Tag");
const sneakerModel = require("../models/Sneaker");
const protectRoute = require("../middlewares/protectRoute");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/collection", (req, res, next) => {
  Promise.all([sneakerModel.find(), tagModel.find()])
    .then(dbResults => {
      res.render("products", {
        sneakers: dbResults[0],
        tags: dbResults[1]
      });
    })
    .catch(next);
});

router.get("/prod-manage", protectRoute, (req, res, next) => {
  Promise.all([sneakerModel.find(), tagModel.find()])
    .then(dbResults => {
      res.render("products_manage", {
        sneakers: dbResults[0],
        tags: dbResults[1]
      });
    })
    .catch(next);
});

router.get("/sneakers/:cat", (req, res, next) => {
  Promise.all([sneakerModel.find({
      "category": req.params.cat
    }), tagModel.find()])
    .then(dbResults => {
      res.render("products", {
        sneakers: dbResults[0],
        tags: dbResults[1]
      });
    })
    .catch(next);
});

router.get("/one-product/:id", (req, res, next) => {
  sneakerModel
    .findById(req.params.id) // retreive all the documents in the artists collection
    .then(dbResults => {
      res.render("one_product", {
        sneaker: dbResults
      });
    })
    .catch(next);
});

router.get("/product-edit/:id", protectRoute, (req, res, next) => {
  Promise.all([sneakerModel.findById({
      "_id": req.params.id
    }), tagModel.find()])
    .then(dbResults => {
      res.render("product_edit", {
        sneaker: dbResults[0],
        tags: dbResults[1]
      });
    })
    .catch(next);
});

router.post("/product-edit/:id", protectRoute, (req, res, next) => {
  const {
    name,
    ref,
    sizes,
    description,
    price,
    image,
    category,
    id_tags
  } = req.body;

  sneakerModel
    .findByIdAndUpdate(req.params.id, {
      name,
      ref,
      sizes,
      description,
      price,
      image,
      category,
      id_tags
    })
    .then(() => {
      req.flash("success", "sneaker successfully updated");
      res.redirect("/prod-manage")
    })
    .catch(next);
});


router.post("/product-edit/:id", protectRoute, (req, res, next) => {
  update.all([sneakerModel.findByIdAndUpdate({
      "_id": req.params.id
    }), tagModel.find()])
    .then(dbResults => {
      req.flash("success", "product successfully updated");
      res.render("product_edit", {
        sneaker: dbResults[0],
        tags: dbResults[1]
      });
    })
    .catch(next);
});


router.get("/delete-product/:id", protectRoute, (req, res, next) => {
  sneakerModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => {
      req.flash("success", "album successfully deleted");
      res.redirect("/prod-manage");
    })
    .catch(next);
});

router.get("/create-product", protectRoute, (req, res, next) => {
  tagModel
    .find()
    .then(dbResults => {
      res.render("products_add", {
        tags: dbResults
      });
    })
    .catch(next);
});

router.post("/create-product", protectRoute, (req, res, next) => {
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
// req.flash("success", "sneaker successfully created");

router.post("/create-tag", protectRoute, (req, res, next) => {
  const {
    label
  } = req.body;
  tagModel
    .create({
      label,
    })
    .then(dbRes => {
      req.flash("success", "Le tag s'est bien créé");
      res.redirect("/create-tag");
    })
    .catch(next);
});

router.post("/tag-add-mix", protectRoute, (req, res, next) => {
  const {
    label
  } = req.body;
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

router.get("/create-tag", protectRoute, (req, res) => {
  res.render("tag_add");
});

module.exports = router;