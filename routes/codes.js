var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  var connection = mysql.createConnection({
  	user : 'root',
  	host : 'localhost',
  	password : 'root',
  	database : 'Quak'

  });

  connection.connect(function(err){
  	if (err) {
  		console.log("Error connecting to Database");
  	}else{
  		console.log("Connection Successful");
  	}
  });

  connection.query("SELECT * FROM codes ORDER BY RAND()", function(error, results){
  	if (error) {
  		console.log("Error with Query :" + error);
  	}else{
  		res.json(results);
  	}
  })
  // res.send(JSON.stringify({name : " Chidelmun", email : "root@localhost.com"}));
});


router.get('/api/:digest', function(req,res,next){
	var digest = req.params.digest;

	var connection = mysql.createConnection({
  	user : 'root',
  	host : 'localhost',
  	password : 'root',
  	database : 'Quak'

  });

	  connection.connect(function(err){
  	if (err) {
  		console.log("Error connecting to Database");
  	}else{
  		console.log("Connection Successful");
  	}
  });


  connection.query("select * from codes where digest = ? ", [digest], function(error, results){
  	if (error) {
  		console.log("Error with Query :" + error);
  	}else{
  		if (results.length == 0) {
  			console.log("No Digest Found");
  			res.send("No Digest Found");
  		}else{
  		res.json(results[0].digest);	
  		}
  		
  	}
  });

	
});
module.exports = router;
