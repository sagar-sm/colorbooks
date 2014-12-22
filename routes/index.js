var express = require('express');
var hp1 = require('../data/hp1');
var vme = require('../data/vme');
var jc = require('../data/jc');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Colorpress' });
});

router.get('/printer', function(req, res) {
  res.render('printer', { title: 'Colorpress Printer' });
});

router.get('/color/:id', function(req, res) {
  console.log(hp1.name);
  if(req.params.id == 'hp1')
    res.render('color', { title: 'Colorpress | ' + hp1.name });
  else if(req.params.id == 'vme')
    res.render('color', { title: 'Colorpress | ' + vme.name }); 
  else if(req.params.id == 'jc')
    res.render('color', { title: 'Colorpress | ' + jc.name });  
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

router.post('/saveImage', function(req, res){

  var img = req.body.imgBase64;
  var fname = req.body.filename;
  var data = img.replace(/^data:image\/\w+;base64,/, "");
  //var buf = new Buffer(data, 'base64');

  require("fs").writeFile(fname, data, 'base64', function(err) {
    if(err){
      console.log(err);
      res.status(500).end();
    }
    else
      res.status(200).end();
  });


});

module.exports = router;
