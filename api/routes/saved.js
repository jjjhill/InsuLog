var express = require('express');
var router = express.Router();
var Retrieve= require('../models/Retrieve');
var Send= require('../models/Send');


router.get('/:id?', function(req, res, next) {
  if (req.params.id) {
    Retrieve.getSavedById(req.params.id, function(err, rows){
      if (err) {
        res.json(err);
      }
      else {
        res.json(rows);
      }
    });
  }
  else {
    Retrieve.getAllSaved(function(err, rows){
      if (err) {
        res.json(err);
      }
      else {
        res.json(rows);
      }
    });
  }
});

router.put('/', function(req, res, next) {
  Send.addUsage(req.body, function(err, rows){
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});

router.post('/', function(req, res, next) {
  Send.addSaved(req.body, function(err, rows){
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});

router.delete('/', function(req, res, next) {
  Send.deleteSaved(req.query, function(err, rows){
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});

module.exports = router;
