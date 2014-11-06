var text;
var selectedBook;

window.onload = function() {
  var params = window.location.href.split(/\//);
  selectedBook = params[params.length - 1];
  $.get('/color/' + selectedBook + '/data', function(d){
    console.log(d);
    text = d.chapters[0].text;
    $('#book').text(d.name);

    if(d.name != d.chapters[0].title)
      $('#chapter').text(d.chapters[0].title);
    var colors = new p5(sc); 
  });
}

var palette = {
  "hp1" : [
    [183,71,60],
    [80,67,70],
    [55,66,64],
    [17,63,62],
    [337,81,43]],
  "vme" : [
    [56,98,76],
    [35,87,60],
    [353,48,50],
    [298,19,33],
    [208,39,30]],
  "jc" : [
    [150 ,100,100],
    [35,87,60],
    [353,48,50],
    [298,19,33],
    [208,39,30]] 
};


var sc = function(s) { 

  // var inputText;
  var lex = new RiLexicon();
  var rWidth, rHeight;
  rWidth = rHeight = 9;

  s.setup = function() {
    s.noStroke();
    s.colorMode(s.HSB, 360,100,100);
    s.createCanvas(window.innerWidth,window.innerHeight-100); 

    analyze(text);
  }

  analyze = function(txt) {

    var rs = new RiString(txt);
    var features = rs.features();

    var pos = features.text.split(/\s/);

    var j = 0, k = 0, page = 0;

    pos.forEach(function(p, i){
      if(lex.isNoun(p))
        s.fill(palette[selectedBook][0][0], palette[selectedBook][0][1], palette[selectedBook][0][2]);
      else if(lex.isAdjective(p))
        s.fill(palette[selectedBook][1][0], palette[selectedBook][1][1], palette[selectedBook][1][2]);
      else if(lex.isAdverb(p))
        s.fill(palette[selectedBook][2][0], palette[selectedBook][2][1], palette[selectedBook][2][2]);
      else if(lex.isVerb(p))
        s.fill(palette[selectedBook][3][0], palette[selectedBook][3][1], palette[selectedBook][3][2]);
      else
        s.fill(255);
      if(k > 60) {
        k = 0;
        j++;
      }
      else
        k++;
      s.ellipse(k*rWidth, j*rHeight, rWidth, rHeight);
    });
  } 

}

