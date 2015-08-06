var app             = require("express");
var router          = app.Router();
var User            = require("../models/user");

router.get("/create-user/:name/:password", function(req, res) {
	user = new User({
		name: req.params.name,
		password: req.params.password,
		admin: true
	});

	user.save(function(err) {
		if(err) throw(err);

		res.send("User Created");
	});
});

module.exports = router;