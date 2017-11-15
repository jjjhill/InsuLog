var express = require('express');
var router = express.Router();
var Retrieve= require('../models/Retrieve');
var Send= require('../models/Send');


router.get('/:id?', function(req, res, next) {
  if (req.params.id) {
    Retrieve.getLogById(req.params.id, function(err, rows){
      if (err) {
        res.json(err);
      }
      else {
        res.json(rows);
      }
    });
  }
  else {
    Retrieve.getAllLogs(function(err, rows){
      if (err) {
        res.json(err);
      }
      else {
        res.json(rows);
      }
    });
  }
});

router.post('/', function(req, res, next) {
  Send.addLog(req.body, function(err, rows){
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});

module.exports = router;
