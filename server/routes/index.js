var express     = require("express");
var router      = express.Router();
var blog        = require("../models/blog");

/**
 * Render Login Page
 * if auth redirect to blogs
 */
router.get("/login", function authenticatedOrNot(req, res, next) {
    if(req.isAuthenticated()) {
        res.redirect("/admin#/blogs");
    } else {
        next();
    }}, function(req, res) {

    res.render("admin/login", { message: req.flash('error') });
});

/**
 * Logout
 */
router.get("/logout", function(req, res) {
    req.logout();

    res.redirect("/login");
});

/**
 * Render Main Page
 */
router.get("/", function(req, res) {
    blog.find({}).sort({ created_at: -1 }).exec(function(err, blogs) {
        if(err) throw(err);

        res.render("client/index", {
            title: "Dimitri Mikadze",
            blogs: blogs,
            desc: "Dimitri Mikadze Personal Blog",
            url: "/"
        });
    });
});

/**
 * Render blog by url param id
 */
router.get("/blog/programming/:name/:id", function(req, res) {

    var name = req.params.name;
    var id = req.params.id;

    blog.findById(id, function(req, blog) {
       res.render("client/blog/blog", {
           title: name.split('-').join(' '),
           blog: blog,
           desc: blog.short_desc,
           url: "/blog/programming/" + name + "/" + id
       })
    });
});

/**
* Render Sitemap.xml
*/
router.get("/sitemap.xml", function(req, res) {
    blog.find({}).sort({ created_at: -1 }).exec(function(err, blogs) {

        if(err) throw(err);

        res.setHeader('content-type', 'application/xml');
        res.render("sitemap", {
            blogs: blogs
        });
    });
});

// ========================================================
//                          Demos
// ========================================================

router.get("/demos/vanilla-slideshow", function(req, res) {
    res.render("demos/vanilla-slideshow.html");
});

/**
 * Download vanilla slideshow
 */
router.get("/download-vanilla-slideshow", function(req, res) {
    res.download("../client/views/demos/vanilla-slideshow.rar");
});


module.exports = router;