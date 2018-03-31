var
  express = require('express'),
  router = express.Router();

router.post('/save', function(req, res) {
	const insertDocuments = function(db, callback) {
		// Get the documents collection
		const collection = db.collection('btc');
		// Insert some documents
		collection.insert([
			{a : 4, b : 1}, {a : 5, b : 2}, {a : 6, b : 3}
			], function(err, result) {
		    if (err) throw err;
		    console.log("Insert success");
		    callback(result);
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
  //
});

module.exports = router;