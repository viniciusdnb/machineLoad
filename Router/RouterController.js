const express = require('express');
const RouterController = express.Router();
const HomeController = require('../Controller/HomeController');
const MachineLoadController = require('../Controller/MachineLoadController');

RouterController.get('/', function(req, res){
    HomeController.index(req, res);
});

RouterController.get('/machine-load', function(req, res){
    MachineLoadController.index(req, res)
});

RouterController.post('/prevision', function(req, res){
   MachineLoadController.prevision(req, res);
   //console.log(req.body)
})

module.exports = RouterController;