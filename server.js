// server.js

// modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
app.use(cors());


// FOR USING MONGODB:
// ======================================================================
// ======================================================================
// var mongoose       = require('mongoose');
// var db = require('./config/db');
// mongoose.connect('mongodb://localhost/myappdatabase', function(err,db){
//     if(err){
//         console.log("error",err);
//     } else {
//         console.log('connected');
//         console.log(mongoose.connection.readyState);
//     }
// });
// require('./config/route')(app); // configure our routes
// =========================================================================
// =========================================================================

// set our port
var port = process.env.PORT || 3008;


// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================

// start app ===============================================
// startup our app at http://localhost:9200
app.listen(port);
var response = "no response";



// USING DATASTORAGE
// ============================================================================
// ============================================================================
// var datastore = require('@google-cloud/datastore')({
//   projectId: 'astute-tractor-186710',
//   keyFilename: './googleDataStore-8bed3e290d37.json'
// });
// app.get('/', function (req, res) {
//   var key = datastore.key({
//     namespace: 'SampleDB',
//     path: ['users', "name"]
//   });
//   var query = datastore.createQuery("SampleDB",'users');
//   query.filter('location', 'ny');
//   datastore.runQuery(query, function (err, entity) {
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json(entity ? entity : "no entity");
//     }
//   });
// })
// =================================================================================
// =================================================================================


// USING BIGQUERY
// ============================================================================
// ============================================================================
// const BigQuery = require('@google-cloud/bigquery')({
//   projectId: 'astute-tractor-186710',
//   keyFilename: './googleDataStore-032d94cd7292.json'
// });

// app.get('/', function (req, res) {
//   const datasetName = 'my_new_dataset';
//   BigQuery.createDataset(datasetName)
//     .then((results) => {
//       const dataset = results[0];
//       console.log(`Dataset ${dataset.id} created.`);
//     })
//     .catch((err) => {
//       console.error('ERROR:', err);
//     });
// });
// ================================================================================
// ================================================================================

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;