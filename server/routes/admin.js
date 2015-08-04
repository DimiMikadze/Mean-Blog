var app             = require("express");
var router          = app.Router();
var blog            = require("../models/blog");
var User            = require("../models/user");

/**
 * Admin Middleware
 */
router.use(function authenticatedOrNot(req, res, next){
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
});

/**
 * Main app page
 */
router.get("/", function(req, res) {
    res.render("admin/layouts/app.html");
});

/**
 * Render Blog Page
 */
router.get("/blogs-page", function(req, res) {
    res.render("admin/blog/index.html");
});
/**
 * render Create new blog page
 */
router.get("/blog/new", function(req, res) {
    res.render("admin/blog/create.html");
});
/**
 * Render Update Blog Page
 */
router.get("/blog/update", function(req, res) {
    res.render("admin/blog/update.html");
});
/**
 * return JSON all blogs
 */
router.get("/blogs", function(req, res) {
    blog.find(function(err, blogs) {
        if(err) throw(err);

        res.json(blogs);
    });
});

// =========================================
//              Angular Routes
// =========================================

/**
 * Angular Render Update blog
 */
router.get("/blog/:id/edit", function(req, res) {
    blog.findById(req.params.id, function(err, blog) {
        if(err) throw err;

        res.json(blog);
    });
});
/**
 * Angular Post Create Blog
 */
router.post("/blog/create", function(req, res) {
    blog.create(req.body, function(err) {
        if(err) throw err;

        res.json({ success: true })
    });
});
/**
 * Angular Post Update blog
 */
router.post("/blog/:id/update", function(req, res) {

    blog.findByIdAndUpdate(req.params.id, req.body, function(err) {
        if(err) throw err;

        res.json({success: true});
    });
});
/**
 * Angular Post Delete Blog
 */
router.post("/blog/:id/delete", function(req, res) {
    blog.findByIdAndRemove(req.params.id, function(err) {
        if(err) throw err;

        res.json({success: true});
    });
});


module.exports = router;