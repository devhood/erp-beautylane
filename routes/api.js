var express = require('express');
var router = express.Router();

var mongoq = require('mongoq');
config = require('../config.local.js');

var db = mongoq(config.MONGO_URL);


router.get('/:object', function(req, res) {
    db.collection(req.params.object)
    .find(req.query.filter || {},req.query.columns || {})
    .sort(req.query.sorting || {}).skip(req.query.page || 0)
    .limit(req.query.rows || 0).toArray()
    .done(function(result){   
        res.json(200,data);
    })
    .fail( function( err ) { 
        res.json(400,err);
    });  
	
});
router.post('/:object', function(req, res) {
    db.collection(req.params.object)
    .insert(req.body, {safe: true})
    .done(function(result){   
        res.json(200,data);
    })
    .fail( function( err ) { 
        res.json(400,err);
    });   
});
router.get('/:object/:id', function(req, res) {
    var id = mongoq.mongodb.BSONPure.ObjectID.createFromHexString(req.params.id);
    var filter = req.query.filter || {};
    filter._id = id;
    db.collection(req.params.object)
    .find(filter,req.query.columns || {})
    .sort(req.query.sorting || {}).skip(req.query.page || 0)
    .limit(req.query.rows || 0)
    .done(function(result){   
        res.json(200,data);
    })
    .fail( function( err ) { 
        res.json(400,err);
    }); 
});
router.put('/:object/:id', function(req, res) {
    var id = mongoq.mongodb.BSONPure.ObjectID.createFromHexString(req.params.id);
    var filter = req.query.filter || {};
    filter._id = id;
	db.collection(req.params.object)
    .update(filter, req.body, {safe: true})
    .done(function(result){   
        res.json(200,data);
    })
    .fail( function( err ) { 
        res.json(400,err);
    }); 
});
router.delete('/:object/:id', function(req, res) {
    var id = mongoq.mongodb.BSONPure.ObjectID.createFromHexString(req.params.id);
    var filter = req.query.filter || {};
    filter._id = id;
    db.collection(req.params.object)
    .remove(filter, {safe: true})
    .done(function(result){   
        res.json(200,data);
    })
    .fail( function( err ) { 
        res.json(400,err);
    });
});

module.exports = router;
