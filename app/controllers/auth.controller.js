require('rootpath')();

	var jwt = require('jsonwebtoken');

	exports.authenticate = function(req, res,next){
		var token = req.headers['x-auth-token'];

		//verify if authenticated user.
		jwt.verify(token, 'helloSecret', function(err, decoded) {
			if(decoded){
				req.id = decoded.user._id;
				next();
			} else {
				res.json({
					type : 'error',
					message : 'Invalid token'
				});
			}
		});	
	}


