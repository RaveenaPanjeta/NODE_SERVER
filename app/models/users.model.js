var mongoose = require('mongoose');

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('users', {
 	name: {type :String},
	place: {type : String},
	email : {type : String}
});

