var express = require('express');
var router = express.Router();
var fs= require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile("homepage.html", function(err, data){
    // console.log("data is"+data);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

module.exports = router;
