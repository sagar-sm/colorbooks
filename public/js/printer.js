var text;
var selectedBook = 'hp1';
var spells = ['accio', 'aguamenti', 'alohomora', 'anapneo', 'aparecium', 'avada', 'kedavra', 'avifors', 'avis', 'inimicum', 'colloportus', 'confringo', 'confundus', 'conjunctivitis', 'crucio', 'defodio', 'deletrius', 'densaugeo', 'deprimo', 'diffindo', 'dissendium', 'duro', 'engorgio', 'ennervate', 'episkey', 'erecto', 'expecto','patronum', 'expelliarmus', 'expulso', 'ferula', 'fidelius', 'finite incantatum', 'flagrate', 'flipendo', 'furnunculus', 'geminio', 'glisseo', 'homenum', 'revelio', 'homorphus', 'immobulus', 'impedimenta', 'imperio', 'impervius', 'incarcerous', 'incendio', 'langlock', 'legilimens', 'levicorpus', 'liberacorpus', 'locomotor', 'mortis', 'lumos', 'meteolojinx', 'recanto', 'mobiliarbus', 'mobilicorpus', 'morsmorde', 'muffliato', 'nox', 'obliviate', 'obscuro', 'oppugno', 'orchideous', 'peskipiksi', 'pesternomi', 'petrificus', 'totalus', 'piertotum', 'locomotor', 'priori', 'incantatum', 'prior', 'incantato', 'protego', 'protego', 'horribilis', 'protego',  'totalum', 'quietus', 'reducio', 'reducto', 'relashio', 'rennervate', 'reparo', 'repello muggletum', 'rictusempra', 'riddikulus', 'salvio hexia', 'scruge', 'sectumsempra', 'serpensortia', 'silencio', 'sonorus', 'specialis revelio', 'stupefy', 'tarantallegra', 'tergeo', 'waddiwasi', 'wingardium', 'leviosa'];
var characters = ['vernon','dursley','petunia','dursley','dudley','dursley','lily','potter','james','potter','harry','potter','lord','voldemort','albus','dumbledore','minerva','mcgonagall','dedalus','diggle','poppy','pomfrey','rubeus','hagrid','sirius','black','marge','dursley','arabella','figg','tibbles','snowy','paws','tufty','yvonne','piers','polkiss','dennis','malcolm','gordon','evans','mckinnon','prewett','cornelius','fudge','miranda','goshawk','bathilda','bagshot','adalbert','waffling','emeric','switch','phyllida','spore','arsenus','jigger','newton','scamander','quentin','trimble','tom','doris','crockford','quirinus','quirrell','griphook','madam','malkin','draco','malfoy','lucius','malfoy','narcissa','malfoy','vindictus','viridian','hedwig','ollivander','ginny','weasley','molly','weasley','percy','weasley','fred','weasley','george','weasley','ron','weasley','neville','longbottom','augusta','longbottom','lee','jordan','bill','weasley','charlie','weasley','arthur','weasley','peter','wormtail','pettigrew','cornelius','agrippa','claudius','ptolemy','gellert','grindelwald','nicolas','flamel','morgan','le','fay','alberic','grunnion','circe','paracelsus','merlin','cliodna','bertie','bott','trevor','hermione','granger','vincent','crabbe','gregory','goyle','hermes','fat','friar','peeves','sorting','hat','hannah','abbott','susan','bones','terry','boot','mandy','brocklehurst','lavender','brown','millicent','bulstrode','justin','finch-fletchley','seamus','finnigan','morag','macdougal','theodore','nott','pansy','parkinson','padma','patil','parvati','patil','sally-anne','perks','dean','thomas','lisa','turpin','blaise','zabini','nearly-headless','nick','bloody','baron','finnigan','algie','enid','severus','snape','argus','filch','rolanda','hooch','norris','pomona','sprout','cuthbert','binns','emeric','the','evil','uric','the','oddball','filius','flitwick','fang','oliver','wood','gregory','smarmy','fluffy','baruffio','angelina','johnson','marcus','flint','alicia','spinnet','katie','bell','miles','bletchley','adrian','pucey','terence','higgs','irma','pince','perenelle','flamel','norbert','ronan','bane','firenze','unicorn','elfric'];

var count = {
  n: 0,
  adj: 0,
  adv: 0,
  v: 0,
  ch: 0,
  o: 0,
  reset: function(){
    count.n = count.adj = count.adv = count.v = count.ch = count.o = 0;
  }
};

var allCounts = [];

window.onload = function() {

  $.get('/color/' + selectedBook + '/data', function(d){
    console.log(d);
    text = d.chapters;

    // var colors = new p5(sc);
    $('#printBtn').click(function(){
      $('#status').text('Printing...');
      var colors = new p5(sc);
    });
  });

}

var sc = function(s) { 

  // var inputText;
  var lex = new RiLexicon();
  var rWidth, rHeight;
  rWidth = rHeight = 33;
  var bolt;

  var palette = {
    "hp1" : [
      [58,154,217],
      [241,125,128],
      [0,160,62],
      [255,162,0],
      [205,205,205]],
    "vme" : [
      [56,98,76],
      [35,87,60],
      [353,48,50],
      [298,19,33],
      [208,39,30]],
    "jc" : [
      [150,100,100],
      [35,87,60],
      [353,48,50],
      [298,19,33],
      [208,39,30]],
    setFill: function(i){
      var f = palette[selectedBook];
      s.fill(f[i][0], f[i][1], f[i][2]);
    },
    setStroke: function(f,i){
      s.stroke(f[i][0], f[i][1], f[i][2]);
    }
  };

  s.preload = function() {
    console.log('preloaded');
    bolt = s.loadImage('images/bolt.png');
  }

  s.setup = function() {
    s.createCanvas(3000,4000); 
    s.noStroke();
    //debugger;
    
    text.forEach(function(chapter, i){
      s.background(255);
      print(chapter.text, i+1);
    });
    $('#status').text('Done');
  }

  print = function(txt, i) {
    var rs = new RiString(txt);
    var features = rs.features();

    var pos = features.text.split(/\s/);
    

    var j = 1, k = 1, page = 0;

    pos.forEach(function(p, i){
      if(lex.isNoun(p)){
        palette.setFill(0);
        count.n++;
      }
      else if(lex.isAdjective(p)){
        palette.setFill(1);
        count.adj++;
      }
      else if(lex.isAdverb(p)){
        palette.setFill(2);
        count.adv++;
      }
      else if(lex.isVerb(p)){
        palette.setFill(3);
        count.v++;
      }
      else if(characters.indexOf(p.toLowerCase()) != -1){
        palette.setFill(4);
        count.ch++;
      }
      else {
        s.fill(255);
        count.o++;
      }

      if(k > 71) {
        k = 1;
        j++;
      }
      else
        k++;

      s.noStroke();
      // s.rect(k*rWidth, j*rHeight, rWidth, rHeight);

    });

    console.log(count);
    allCounts.push(count);

    var thickness = 10, fact = 0.75;
    var offset = 30, leading = 44;

    s.textFont('Lato');
    s.textSize(30);

    function map(qty){
      var c_arr = [];
      Object.keys(count).forEach(function(key) {
        c_arr.push(count[key]);
      });
      c_arr[6] = 0; //remove function reset
      
      return s.map(qty, 0, Math.max.apply(null, c_arr), 0, 1000);
    }

    palette.setFill(0);
    s.text(count.n.toString(),10,offset);
    s.rect(10,offset, map(count.n), thickness);

    palette.setFill(1);
    s.text(count.adj.toString(),10,offset+leading);
    s.rect(10,offset+leading, map(count.adj), thickness);

    palette.setFill(2);
    s.text(count.adv.toString(),10,offset+2*leading);
    s.rect(10,offset+2*leading, map(count.adv), thickness);

    palette.setFill(3);
    s.text(count.v.toString(),10,offset+3*leading);
    s.rect(10,offset+3*leading, map(count.v), thickness);

    s.fill(200);
    s.text(count.ch.toString(),10,offset+4*leading);
    s.rect(10,offset+4*leading, map(count.ch), thickness);

    s.fill(20);
    s.text(count.o.toString(),10,offset+5*leading);
    s.rect(10,offset+5*leading, map(count.o), thickness);




    count.reset();
    sendForPrinting('meta' + pad(i, 2) + '.png');
  }
}


function sendForPrinting(fname){
  var canvas = document.getElementsByTagName('canvas');
  var dataURL = canvas[0].toDataURL();

  $.ajax({
    type: "POST",
    url: "/saveImage",
    data: { 
      filename: fname,
      imgBase64: dataURL
    },
    dataType: 'json',
    success: function(data, textStatus, jqXHR){
        console.log("sent")
      }
  });
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}