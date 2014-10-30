var express = require('express');
var hp1 = require('../data/hp1');
var vme = require('../data/vme');
var jc = require('../data/jc');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Colorbooks' });
});

router.get('/color/:id', function(req, res) {
  console.log(hp1.name);
  if(req.params.id == 'hp1')
    res.render('color', { title: 'Colorbooks | ' + hp1.name });
  else if(req.params.id == 'vme')
    res.render('color', { title: 'Colorbooks | ' + vme.name }); 
  else if(req.params.id == 'jc')
    res.render('color', { title: 'Colorbooks | ' + jc.name });  
  else
    res.status(404).end();
});

router.get('/color/:id/data', function(req, res){
  if(req.params.id == 'hp1')
    res.send(hp1);
  else if(req.params.id == 'vme')
    res.send(vme);
  else if(req.params.id == 'jc')
    res.send(jc);
  else
    res.status(404).end();
});

module.exports = router;
