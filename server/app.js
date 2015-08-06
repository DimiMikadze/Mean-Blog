var express         = require("express");
var app             = express();
var mongoose        = require("mongoose");
var bodyParser      = require("body-parser");
var morgan          = require("morgan");
var config          = require("./config/config");

var session         = require("express-session");
var cookieParser    = require("cookie-parser");
var flash           = require("connect-flash");
var passport        = require("passport");
var LocalStrategy   = require("passport-local").Strategy;
var User            = require("./models/user");

// configuration
mongoose.connect(config.database);

// template engine
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/../client/views");

// use
app.use(express.static("../client/public"));
app.use(express.static("../client/app"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// =================================================
//                 Authentication
// =================================================

app.use(cookieParser());
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// serialize user
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
// deserialize user
passport.deserializeUser(function(id, done) {
    User.findById({ _id: id }, function(err, user) {
        done(err, user);
    });
});

// passport local strategy
passport.use(new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password'
    },
    function(name, password, done) {
        User.findOne({ name: name }, function (err, user) {

            if (err) { return done(err); }

            if ( ! user) {
                return done(null, false, { message: "Name is not correct" });
            }
            if( ! user.admin) {
                return done(null, false, { message: "User is not admin" });
            }

            user.validPassword(password, function(err, data) {
                if(err) return done(err);

                if( ! data){
                    return done(null, false, { message: "password is not correct"} );
                }

                return done(null, user);
            });
        });
    }
));

// post auth
app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true }), function(req, res) {
    if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
        req.session.cookie.expires = false;
    }
    res.redirect("/admin#/blogs");
});

/**
 * Routes
 */
app.use("/", require("./routes"));
app.use("/admin", require("./routes/admin"));
app.use("/test", require("./routes/testUser"));

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("app listening on " + host + " " + port);
});