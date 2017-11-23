require('rootpath')();

	var users = require('app/models/login.model.js');
	var mongoose       = require('mongoose');


	var md5 = require('md5');
	var jwt = require('jsonwebtoken');

	exports.login = function( req , res){
		var data = req.body;
		var pw = md5(data.password);
		console.log(data);

		users.findOne({username :data.username, password : pw },function(err,user){
			if(err){
				res.json({
					type : 'error',
					message : err
				});
			} else {
				if(!user){
					res.json({
						type : 'error',
						message : 'User not found'
					});
				} else {
					var token = jwt.sign({ user : user },'helloSecret');
					res.json({
						type : 'success',
						message : 'Logged in successfully',
						token : token
					});
				}
			}
		})
	}

	exports.register = function( req , res){
		var data = req.body;
		var password = md5(data.password);
		data = {
			username : data.username,
			password : password,
			email : data.email
		};
		console.log(data);

		var InsertUser = new users(data); 

		InsertUser.save(function(err,user){
			if(err){
				return res.json({
					type : 'error',
					message : err
				});
			} else {
				var token = jwt.sign({ user :user },'helloSecret');
				return res.json({
					type : 'success',
					message : 'New user registered',
					token : token
				});
			}
		})
	}

