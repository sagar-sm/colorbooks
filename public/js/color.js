var text;
window.onload = function() {
  var params = window.location.href.split(/\//);
  var book = params[params.length - 1];
  $.get('/color/' + book + '/data', function(d){
    console.log(d);
    text = d.chapters[0].text;
    $('#book').text(d.name);

    if(d.name != d.chapters[0].title)
      $('#chapter').text(d.chapters[0].title);
    var colors = new p5(sc); 
  });
}

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
        s.fill(216,100,100);
      else if(lex.isAdjective(p))
        s.fill(50,100,100);
      else if(lex.isAdverb(p))
        s.fill(180, 100,100);
      else if(lex.isVerb(p))
        s.fill(82, 100,100);
      else
        s.fill(255);
      if(k > 60) {
        k = 0;
        j++;
      }
      else
        k++;
      s.rect(k*rWidth, j*rHeight, rWidth, rHeight);
    });
  } 

}

