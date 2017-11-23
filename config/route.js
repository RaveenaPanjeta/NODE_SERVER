require('rootpath')();

    var home = require('app/controllers/home.controller.js');
    var access = require('app/controllers/login.controller.js');
    var auth = require('app/controllers/auth.controller.js');

    module.exports = function(app) {

        app.get('/app', home.getUsers);
        app.post('/input',auth.authenticate, home.inUsers);
        app.post('/file',home.file);
        app.post('/email',auth.authenticate, home.sendEmail);
        app.post('/files-multi', home.filesMulti);
        app.post('/login', access.login);
        app.post('/register', access.register);
        
        app.get('*', function(req, res) {
            return res.json('ok connected');
        });
        

    };