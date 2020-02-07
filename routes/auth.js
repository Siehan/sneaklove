const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const uploader = require("./../config/cloudinary");

// form views 

router.get("/signup", (req, res) => {
    res.render("signup", {
        js: ["signup"]
    });
});

router.get("/signin", (req, res) => {
    res.render("signin")
});

// action::Registering

// router.post("/signup", uploader.single("avatar"), (req, res, next) => {
router.post("/signup", (req, res, next) => {
    const user = req.body; // req.body contains the submited informations (out of post request)

    // if (req.file) user.avatar = req.file.secure_url;

    if (!user.email || !user.password) {
        req.flash("error", "please complete the field")
        return res.redirect("/signup");
    } else {
        userModel
            .findOne({
                email: user.email
            })
            .then(dbRes => {
                if (dbRes) {
                    req.flash("error", "sorry, email is already taken :/");
                    return res.redirect("/signup"); //  
                }

                const salt = bcrypt.genSaltSync(10);
                const hashed = bcrypt.hashSync(user.password, salt);
                user.password = hashed;

                userModel
                    .create(user)
                    .then(() => res.redirect("/signin"))
                // .catch(dbErr => console.log(dbErr));
            })

            .catch(next);
    }
});

// action::Login

router.post("/signin", (req, res, next) => {
    const user = req.body;
    if (!user.email || !user.password) {
        // one or more field is missing
        req.flash("error", "wrong credentials");
        return res.redirect("/signin");
    }

    userModel
        .findOne({
            email: user.email
        })
        .then(dbRes => {
            if (!dbRes) {
                // no user found with this email
                req.flash("error", "wrong credentials");
                return res.redirect("/signin");
            }
            // user has been found in DB !
            if (bcrypt.compareSync(user.password, dbRes.password)) {
                // encryption says : password match success
                const {
                    _doc: clone
                } = {
                    ...dbRes
                }; // make a clone of db user

                delete clone.password; // remove password from clone
                // console.log(clone);

                req.session.currentUser = clone; // user is now in session... until session.destroy
                return res.redirect("/");
            } else {
                // encrypted password match failed
                req.flash("error", "wrong credentials");
                return res.redirect("/signin");
            }
        })
        .catch(next);
});

// action::Logout

router.get("/signout", (req, res) => {
    req.session.destroy(() => {
        res.locals.isLoggedIn = undefined;
        res.locals.isAdmin = undefined;
        res.redirect("/signin");
    });
});

module.exports = router;