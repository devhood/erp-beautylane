var express = require('express');
var router = express.Router();

var mongoq = require('mongoq');
config = require('../config.local.js');

var db = mongoq(config.mongo_url);


router.get('/:object', function(req, res) {
    db.collection(req.params.object)
    .find(req.query.filter || {},req.query.columns || {})
    .sort(req.query.sorting || {}).skip(req.query.page || 0)
    .limit(req.query.rows || 0).toArray()
    .done(function(data){   
    	res.status(200).json(data);
    })
    .fail( function( err ) { 
    	console.log(err);
    	 res.status(400).json(err);
    });  
	
});
router.post('/:object', function(req, res) {
    db.collection(req.params.object)
    .insert(req.body, {safe: true})
    .done(function(data){   
    	res.status(200).json(data);
    })
    .fail( function( err ) { 
    	res.status(400).json(err);
    });   
});
router.get('/:object/:id', function(req, res) {
    var id = mongoq.mongodb.BSONPure.ObjectID.createFromHexString(req.params.id);
    var filter = req.query.filter || {};
    filter._id = id;
    db.collection(req.params.object)
    .find(filter,req.query.columns || {})
    .sort(req.query.sorting || {}).skip(req.query.page || 0)
    .limit(req.query.rows || 0).toArray()
    .done(function(data){   
    	res.status(200).json(data);
    })
    .fail( function( err ) { 
    	res.status(400).json(err);
    }); 
});
router.put('/:object/:id', function(req, res) {
    var id = mongoq.mongodb.BSONPure.ObjectID.createFromHexString(req.params.id);
    var filter = req.query.filter || {};
    filter._id = id;
	db.collection(req.params.object)
    .update(filter, req.body, {safe: true})
    .done(function(data){   
    	res.status(200).json(data);
    })
    .fail( function( err ) { 
    	res.status(400).json(err);
    }); 
});
router['delete']('/:object/:id', function(req, res) {
    var id = mongoq.mongodb.BSONPure.ObjectID.createFromHexString(req.params.id);
    var filter = req.query.filter || {};
    filter._id = id;
    db.collection(req.params.object)
    .remove(filter, {safe: true})
    .done(function(data){   
    	res.status(200).json(data);
    })
    .fail( function( err ) { 
    	res.status(400).json(err);
    });
});

module.exports = router;
