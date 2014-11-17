var express = require('express');
var router = express.Router();

var mongoq = require('mongoq');
config = require('../config.local.js');

var db = mongoq(config.mongo_url);

var generateTicket = function(status_code,cb){
  if(status_code){
      db.collection("number_generator")
      .find({status_code : status_code}).toArray()
      .done(function(data){
        cb(null,data[0]);
      })
      .fail( function( err ) {
         cb(err);
      });
  }
  else{
    cb(null,null);
  }
};

var updateTicket = function(ticket,cb){
    delete ticket._id;
    ticket.count+=1;
    db.collection("number_generator")
    .update({status_code : ticket.status_code}, ticket, {safe: true})
    .done(function(data){
      cb(null,data);
    })
    .fail( function( err ) {
      cb(err);
    });
};

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
    if(req.body.status_code){
        generateTicket(req.body.status_code,function(err,ticket){
            if(ticket){
                req.body[ticket.field] = ticket.prefix + ticket.count + "-"+ ticket.suffix
                updateTicket(ticket,function(err,result){});
            }
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
            if(ticket && !req.body[ticket.field]){
                req.body[ticket.field] = ticket.prefix + ticket.count + "-" +  ticket.suffix
                updateTicket(ticket,function(err,result){});
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

module.exports.login = function(username,password,cb){
  db.collection('users')
  .find({username:username,password:password},{}).toArray()
  .done(function(data){
    if(data[0]){
      cb(null,data[0])
    }
    else{
      cb(null,false,{message:"Account not found"});
    }

  })
  .fail( function( err ) {
    cb(err);
  });
};
module.exports.user = function(id,cb){
  db.collection('users')
  .find({_id:id},{}).toArray()
  .done(function(data){
    if(data[0]){
      cb(null,data[0]);
    }
    else{
      cb(null,false,{message : "Account not found"});
    }
  })
  .fail( function( err ) {
    cb(err);
  });
};
