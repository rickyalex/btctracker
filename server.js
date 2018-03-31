var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://ricky:mlab2017@ds255308.mlab.com:55308/lexadata";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//make the server run at port 8080
var port = process.env.PORT || 8080;

var router = express.Router(); 

router.post('/btc', function(req, res) {
    res.json({ message: JSON.stringify(req.body) });   

    const insertDocuments = function(db, callback) {
		// Get the documents collection
		const collection = db.collection('btc');
		// Insert some documents
		collection.insert([
			{Ask: req.body.Ask, Last: req.body.Last, Bid: req.body.Bid, Time: req.body.Time}
			], function(err, result) {
		    if (err) throw err;
		    console.log("Insert success");
			});
	}

	MongoClient.connect(url, function(err, client) {
		if (err) throw err;
	  
		const db = client.db('lexadata');

		insertDocuments(db, function() {
	    	client.close(); 
		});
	});
});

router.get('/search', function(req, res) {
    const getDocuments = function(db, callback) {
		// Get the documents collection
		const collection = db.collection('btc');
		// Find all documents
		collection.find({}).toArray(function(err, docs) {
		    res.json({result: docs});
		});
	}

	MongoClient.connect(url, function(err, client) {
		if (err) throw err;
	  
		const db = client.db('lexadata');

		getDocuments(db, function() {
	    	client.close(); 
		});
	});

});

//give a prefix 'api' for each api requests
app.use('/api', router);

app.listen(port);
console.log('BTC Tracker server started on port ' + port);