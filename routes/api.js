var express = require('express');
var router = express.Router();

var mongoq = require('mongoq');
config = require('../config.local.js');

var db = mongoq(config.mongo_url);

var generateTicket = function(status_code,cb){
      switch(status_code) {
        case "SO_CREATED":
            db.collection("number_generator")
            .find({type : "sales order"}).toArray()
            .done(function(data){
              cb(null,data[0]);
            })
            .fail( function( err ) {
               cb(err);
            });
            break;
        case "DR_CREATED":
            db.collection("number_generator")
            .find({type : "delivery receipt"}).toArray()
            .done(function(data){
              cb(null,data[0]);
            })
            .fail( function( err ) {
               cb(err);
            });
            break;
        case "SI_CREATED":
            db.collection("number_generator")
            .find({type : "sales invoice"}).toArray()
            .done(function(data){
              cb(null,data[0]);
            })
            .fail( function( err ) {
               cb(err);
            });
            break;
      }
};

var updateTicket = function(status_code,ticket,cb){
      delete ticket._id;
      ticket.count+=1;
      switch(status_code) {
        case "SO_CREATED":
            db.collection("number_generator")
            .update({type : "sales order"}, ticket, {safe: true})
            .done(function(data){
              cb(null,data);
            })
            .fail( function( err ) {
              cb(err);
            });
            break;
        case "DR_CREATED":
            db.collection("number_generator")
            .update({type : "delivery receipt"}, ticket, {safe: true})
            .done(function(data){
              cb(null,data);
            })
            .fail( function( err ) {
              cb(err);
            });
            break;
        case "SI_CREATED":
            db.collection("number_generator")
            .update({type : "sales invoice"}, ticket, {safe: true})
            .done(function(data){
              cb(null,data);
            })
            .fail( function( err ) {
              cb(err);
            });
            break;
      }
};

var pad = function(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

router.get('/:object', function(req, res) {
    req.query.filter = JSON.parse(req.query.filter || '{}');
    req.query.columns = JSON.parse(req.query.columns || '{}');
    req.query.sorting = JSON.parse(req.query.sorting || '{}');

    db.collection(req.params.object)
    .find(req.query.filter,req.query.columns)
    .sort(req.query.sorting).skip(req.query.page || 0)
    .limit(req.query.rows || 0).toArray()
    .done(function(data){
    	res.status(200).json(data);
    })
    .fail( function( err ) {
    	 res.status(400).json(err);
    });

});
router.post('/:object', function(req, res) {
    if(req.params.object == "sales" && req.body.status_code){

        generateTicket(req.body.status_code,function(err,ticket){
            if(ticket){
                req.body[ticket.field] = ticket.prefix + pad(ticket.count,ticket.zero_count) + "-"+ ticket.suffix
                updateTicket(req.body.status_code,ticket,function(err,result){
                  delete req.body.status_code;
                });
            }
            delete req.body.status_code;
            db.collection(req.params.object)
            .insert(req.body, {safe: true})
            .done(function(data){
              res.status(200).json(data[0]);
            })
            .fail( function( err ) {
              res.status(400).json(err);
            });
        });
    }
    else{
        db.collection(req.params.object)
        .insert(req.body, {safe: true})
        .done(function(data){
          res.status(200).json(data[0]);
        })
        .fail( function( err ) {
          res.status(400).json(err);
        });
    }

});
router.get('/:object/:id', function(req, res) {
    var id = mongoq.mongodb.BSONPure.ObjectID.createFromHexString(req.params.id);
    req.query.filter = JSON.parse(req.query.filter || '{}');
    req.query.columns = JSON.parse(req.query.columns || '{}');
    req.query.sorting = JSON.parse(req.query.sorting || '{}');
    req.query.filter._id = id;
    db.collection(req.params.object)
    .find(req.query.filter,req.query.columns || {})
    .sort(req.query.sorting || {}).skip(req.query.page || 0)
    .limit(req.query.rows || 0).toArray()
    .done(function(data){
    	res.status(200).json(data[0]);
    })
    .fail( function( err ) {
    	res.status(400).json(err);
    });
});
router.put('/:object/:id', function(req, res) {

    var id = mongoq.mongodb.BSONPure.ObjectID.createFromHexString(req.params.id);
    delete req.body._id;
    req.query.filter = JSON.parse(req.query.filter || '{}');
    req.query.columns = JSON.parse(req.query.columns || '{}');
    req.query.sorting = JSON.parse(req.query.sorting || '{}');
    req.query.filter._id = id;
    if(req.params.object == "sales" && req.body.status_code){
        generateTicket(req.body.status_code,function(err,ticket){
            if(ticket){
                req.body[ticket.field] = ticket.prefix + pad(ticket.count,ticket.zero_count) + "-" +  ticket.suffix
                updateTicket(req.body.status_code,ticket,function(err,result){});
            }
            db.collection(req.params.object)
            .update(req.query.filter, req.body, {safe: true})
            .done(function(data){
              res.status(200).json(data);
            })
            .fail( function( err ) {
              res.status(400).json(err);
            });
        });
    }
    else{
      db.collection(req.params.object)
      .update(req.query.filter, req.body, {safe: true})
      .done(function(data){
        res.status(200).json(data);
      })
      .fail( function( err ) {
        res.status(400).json(err);
      });
    }

});
router['delete']('/:object/:id', function(req, res) {
    var id = mongoq.mongodb.BSONPure.ObjectID.createFromHexString(req.params.id);
    req.query.filter = JSON.parse(req.query.filter || '{}');
    req.query.filter._id = id;
    db.collection(req.params.object)
    .remove(req.query.filter, {safe: true})
    .done(function(data){
    	res.status(200).json(data);
    })
    .fail( function( err ) {
    	res.status(400).json(err);
    });
});

module.exports = router;
