require('rootpath')();

var users = require('app/models/users.model.js');
var emailDetails = require('email.details.json');


var fs = require('fs');
var multiparty = require('multiparty');
var nodemailer = require('nodemailer');

exports.getUsers = function(req, res) {
    users.find({}, function(err, user) {
        console.log("qqqqq",(err)? err : user);
        /*if (err) {
            res.json({
                type: 'error',
                message: err
            });
        } else {
            if (!user) {
                res.json({
                    type: 'success',
                    message: 'No data found'
                });
            } else {
                res.json({
                    type: 'success',
                    data: user
                });
            }
        }*/

        

    })
}

exports.inUsers = function(req, res) {
    var data = req.body;
    data = {
        name: data.name,
        place: data.place
    };

    var InsertUser = new users(data);

    InsertUser.save(function(err, user) {
        if (err) {
            return res.json({
                type: 'error',
                message: err
            });
        } else {
            return res.json({
                type: 'success',
                message: 'inserted'
            });
        }
    })
}

exports.file = function(req, res) {
    console.log("hello inside node api");
    var form = new multiparty.Form();
    form.on('file', function(name, file) {
        var oldpath = file.path;
        var dotIndex = file.originalFilename.lastIndexOf(".");
        var filemime = file.originalFilename.slice(dotIndex);
        var fileName = new Date().getTime() + 'myfile' + filemime;
        var newpath = __dirname + '/../../public/files/' + fileName;
        fs.rename(oldpath, newpath, function(err) {
            if (err) {
                res.json({
                    type: 'error',
                    message: err
                });
            } else {
                res.json({
                    type: 'success',
                    message: 'uploaded'
                });
            }

        });
    });

    form.on('error', function(err) {
        console.log('Error parsing form: ' + err.stack);
        res.json({
            type: 'error',
            message: 'error'
        });

    });

    form.parse(req);
}

exports.filesMulti = function(req, res) {
    var form = new multiparty.Form();
    form.on('file', function(name, file) {
        var oldpath = file.path;
        var dotIndex = file.originalFilename.lastIndexOf(".");
        var filemime = file.originalFilename.slice(dotIndex);
        var fileName = new Date().getTime() + 'myfile' + filemime;
        var newpath = __dirname + '/../../public/multifiles/' + fileName;
        fs.rename(oldpath, newpath, function(err) {});
    });

    form.on('error', function(err) {
        console.log('Error parsing form: ' + err.stack);
        res.json({
            type: 'error',
            message: 'error'
        });
    });

    form.on('close', function() {
        res.json({
            type: 'success',
            message: 'uploaded'
        });
    });

    form.parse(req);
}

exports.sendEmail = function(req, res) {
    var email = req.body.email;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailDetails.data.email,
            pass: emailDetails.data.password
        }
    });

    let mailOptions = {
        from: emailDetails.data.from,
        to: email,
        subject: emailDetails.data.subject,
        text: 'Hello world ? this is text content',
        html: {
            path: __dirname + "/../views/email.html"
        },
        attachments: [{
            filename: 'attach1.jpeg',
            path: __dirname + "/../../public/files/1495020361352myfile"
        },
        {
            filename: 'hey.jpg',
            path: __dirname + "/../../public/files/1495021646396myfile.jpg",
            cid : 'unique@nodemailer.com' 
        }
        ]

    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return res.json({
                type: 'error',
                message: err
            });
        } else {
            return res.json({
                type: 'success',
                message: 'inserted'
            });
        }
    });
}