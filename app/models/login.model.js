var mongoose = require('mongoose');

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('login', {
 	username: {type :String ,required : true},
	password: {type : String ,required : true}
});

