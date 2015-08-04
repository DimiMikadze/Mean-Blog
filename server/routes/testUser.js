var app             = require("express");
var router          = app.Router();
var User            = require("../models/user");

router.get("/create-user/:name/:password", function(req, res) {
	user = new User({
		name: 'Dimitri',
		password: 'Mikadze123Dimitri',
		admin: true
	});

	user.save(function(err) {
		if(err) throw(err);

		res.send("User Created");
	});
});

module.exports = router;