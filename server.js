global._ = require('lodash');
global.t = require('moment');

var bodyParser = require('body-parser');
var multer  = require('multer');

var Firebase = require("firebase");
var rootRef = null;
var fbAuthToken = null;

if(process.env.NODE_ENV === 'production') {
  rootRef = new Firebase("https://incandescent-heat-4351.firebaseio.com/");
  fbAuthToken = "oJV0I8wM92Wn7L6oxehtnZ4pWSI2T4gQpT5zyDy3";
}
else {
  rootRef = new Firebase("https://faceandela-dev.firebaseio.com/");
  fbAuthToken = "vqyUAlkoupI7401C6AxXDdkdVL1C05jn5IooBYsr";
}

rootRef.authWithCustomToken(fbAuthToken,
 function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Login Succeeded!", authData);
  }
});


(function run() {

  //Express
  var express = require('express');
  var app = express();

  //app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: true }));
  app.use(multer({
    dest: './tmp/',
    onError: function (error, next) {
      console.log(error);
      next(error);
    }
  }));

  app.dir = process.cwd();

  // things to do on each request
  app.use(function (req, res, next) {
    // tell the client what firebase to use
    if(process.env.NODE_ENV === 'production') {
      res.cookie('rootRef', "https://faceandela-prod.firebaseio.com/");
    }
    else {
      res.cookie('rootRef', "https://faceandela-dev.firebaseio.com/");
      // log the request
      console.log(t().format('HH:MM'), req.method, req.url, req.socket.bytesRead);
    }
    next();
  });

  // static files
  app.use(express.static(app.dir + '/public'));

  app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: './public'});
  });

  // Standard error handling
  app.use(function(err, req, res){
    console.error(err, "Error");
    res.status(500).send('Something broke!');
  });


  // Fire up server
  var server = app.listen(process.env.PORT || 5555, function() {
    console.log('Listening on port %d', server.address().port);
  });

})()