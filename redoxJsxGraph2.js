<!--------------------------------------------------------------------------------------------------------------------------------><script>
  function isless(x,y) {return (x<y)};
  function iand(x,y)  {return (x&&y)};
  function igrt(x,y)  {return (x>y)};
  function igrtq(x,y)  {return (x>=y)};
  function ispositive(x) {return (x>0)};
  function ibetween(a,x,y) {return ((a>x)&&(a<y))};
  function dist(a,b){return Math.sqrt((a[0]-b[0])*(a[0]-b[0])+(a[1]-b[1])*(a[1]-b[1]))};
</script>

<!--JSXGraph MathJax Specifications-->
     <script>
               window.MathJax = {
               tex: {
               inlineMath: [ ['$','$'], ["\\(","\\)"] ],
               displayMath: [ ['<math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mo>'</mo><mo>,</mo><mo>'</mo><annotation encoding="LaTeX">','</annotation></semantics></math>'], ["\\[","\\]"] ],
               packages: ['base', 'ams'] },
               options: {
               ignoreHtmlClass: 'tex2jax_ignore',
               processHtmlClass: 'tex2jax_process'
               }
               };
     </script>


<script type="text/javascript">
 var checkAnswer=[];
</script>
  
[[jsxgraph  width="800px" height="400px" input-ref-states='statesRef' input-ref-positions='positionsRef'  input-ref-oxidation_maps='oxmapsRef' input-ref-reduction_maps='redmapsRef']]

 MathJax.Hub.Config({showMathMenu: false});
MathJax.Hub.Config({"HTML-CSS": {scale: (MathJax.Hub.Browser.isSafari ? {#safari#}: 100)
}
});
JXG.Options.text.cssDefaultStyle = 'direction:ltr; font-family:Arial;';
JXG.Options.text.highlightCssDefaultStyle = 'direction:ltr';
let rqm={#rqm#};

var board = JXG.JSXGraph.initBoard(divid, {
  boundingbox: [-5, 5, 15, -5],
  axis: false,
  showCopyright: false,
  showNavigation: false,
  keepaspectratio: true,
  pan:{enabled:false},
  zoom:{enabled:false},
  resize: {enabled:false},
  keyboard: {enabled: false}
  
});

var text_top = 2,
  radius = {#radius#},
  fontsize ={#fontsize#},
  minOx={#minOx#},
  maxOx={#maxOx#};
var radd = {#spaces#};
var maxatoms = {#maxat#};
var eqn = {#eq#};
var answered = false;

var text_col = '#000000', 
  /*black*/
  circle_col = '#0072B2',
  /*darkblue*/
  ox_col = '#D55E00', //vermillion
  red_col = "#0072B2"; //blue

var design = {#design#};
var oxid = [];

if (design!=1){
    var positions = {#positions_v#};
    var oxid_ans = {#oxid#};
}
else {
   var positions = [];
    var oxid_ans = [];
}

var positionsInput = document.getElementById(positionsRef);
var stateInput = document.getElementById(statesRef);
var oxInput= document.getElementById(oxmapsRef);
var redInput= document.getElementById(redmapsRef);
if (design!=1) {positionsInput.value=JSON.stringify(positions)};
// equation
var eq=board.create('text', [-4, text_top, function(){return eqn}], {
  useMathJax: true,
  fontSize: fontsize,
  fixed: true,
  anchorY: 'bottom'
});

//line that circles glide on
var lineU = board.create('segment', [
  [-4.5, text_top -  radd],
  [15, text_top - radd]
], {
  strokeWidth: 0,
  highlightStrokeWidth: 0,
  fixed: true
});

//line that the arrows glide on
var lineD = board.create('segment', [
  [-4.8, text_top -  radius-radd],
  [15, text_top - radius-radd]
//  [15, text_top - 2 * radd - radius]
], {
  strokeWidth: 0,
  highlightStrokeWidth: 0,
  fixed: true
});

var p = [],   c = [],   i=0;


//circle center and labels
for (i = 0; isless(i, maxatoms); i++) {

  var ppoint = [-4 + 2 * radius * i, text_top - radd];
  if (design != 1) {
    ppoint = [positions[i], text_top - radd];
     }
  p[i] = board.create('glider', [ppoint[0], ppoint[1], lineU], {
    size: 0,
    name: "",
    label: {
      offset: [-6.5, 0],
      cssStyle: "font-weight: bold"
    },
    showInfobox: false
  });




  //circles
  c[i] = board.create('circle', [p[i], radius], {
    strokeWidth: 1,
    strokeColor: circle_col
  });



} // end for loop

var pAtt = {
  name: '',
  size:0,
  attractors: [lineD],
  attractorDistance: 0.5,
  snatchDistance: 200,
  showInfobox: false,
  fixed:function(){return answered}

};
var p1Att = {
  name: '',
  fillcolor: red_col,
  strokeColor: red_col,
  size: 1.5,
  attractors: [lineD],
  attractorDistance: 0.5,
  snatchDistance: 200,
  showInfobox: false,
fixed:function(){return answered}
};
var p3Att = {
  name: '',
  fillcolor: ox_col,
  strokeColor: ox_col,
  size: 1.5,
  attractors: [lineD],
  attractorDistance: 0.5,
  snatchDistance: 200,
  showInfobox: false,
fixed:function(){return answered}
};
var psAtt = {
  name: '',
  size: 0,
 // attractors: c,
  attractorDistance: radius,
  showInfobox: false,
  fixed:function(){return answered}
};

//points for the reduction lines  
var ap1 = board.create('point', [-4.8, text_top - radd - radius], p1Att);
var ap2 = board.create('point', [function() {
  return ap1.X()
}, function() {
  return ap1.Y() - 1
}], pAtt);
var ap3 = board.create('point', [14.8, text_top -  radd - radius], p1Att);
var ap4 = board.create('point', [function() {
  return ap3.X()
}, function() {
  return ap3.Y() - 1
}], pAtt);
var as1=board.create('point',[function() {return ap1.X()},function() {return ap1.Y()+radius}],psAtt);
var as2=board.create('point',[function() {return ap3.X()},function() {return ap3.Y()+radius}],psAtt);

var L1 = board.create('line', [ap1, ap2], {
  strokecolor: red_col,
  straightFirst: false,
  straightLast: false
});
var L2 = board.create('line', [ap2, ap4], {
  strokecolor: red_col,
  straightFirst: false,
  straightLast: false
});
var L3 = board.create('line', [ap3, ap4], {
  strokecolor: red_col,
  firstArrow: {
    type: 7,
    size: 5
  },
  straightFirst: false,
  straightLast: false
});

if (design != 1) {
    var ta_red = {#red_map#};
    var ta_ox = {#ox_map#};
}
else
{
   var ta_red = [1,1];
    var ta_ox = [1,1];
}

var inter1 = board.create('intersection', [c[ta_red[0] - 1], L1, 0], {
  name: '',
  size: 0,
  showInfobox: false
});
var inter2 = board.create('intersection', [c[ta_red[1] - 1], L3, 0], {
  name: '',
  size: 0,
  showInfobox: false
});
//board.create('text',[0,-4.5,function(){return inter1.Y().toFixed(2)+' '+inter2.Y().toFixed(2)}]);

//line for the text to glide on  
var LH2 = board.create('line', [
  [function() {
    return ap2.X()
  }, function() {
    return ap2.Y() + 0.3
  }],
  [function() {
    return ap4.X()
  }, function() {
    return ap4.Y() + 0.3
  }]
], {
  visible: false,
  straightFirst: false,
  straightLast: false
});

//label for the line   
var red_txt = {#red_txt#};
var reductext = board.create('text', [0, 0, function() {
  return red_txt
}], {
  /*anchor:L2,*/
  useMathJax: true,
  fontSize: fontsize,
  attractors: [LH2],
  attractorDistance: 15,
  snatchDistance: 200,
  showInfobox: false
});


//points for the oxidation lines  

var ap11 = board.create('point', [-4.6, text_top -  radd - radius], p3Att);
var ap22 = board.create('point', [function() {
  return ap11.X()
}, function() {
  return ap11.Y() - 2
}], pAtt);
var ap33 = board.create('point', [14.6, text_top -  radd - radius], p3Att);
var ap44 = board.create('point', [function() {
  return ap33.X()
}, function() {
  return ap33.Y() - 2
}], pAtt);
var as11=board.create('point',[function() {return ap11.X()},function() {return ap11.Y()+radius}],psAtt);
var as22=board.create('point',[function() {return ap33.X()},function() {return ap33.Y()+radius}],psAtt);

var L11 = board.create('line', [ap11, ap22], {
  straightFirst: false,
  straightLast: false,
  strokecolor: ox_col
});
var L22 = board.create('line', [ap22, ap44], {
  straightFirst: false,
  straightLast: false,
  strokecolor: ox_col
});
var L33 = board.create('line', [ap33, ap44], {
  firstArrow: {
    type: 7,
    size: 5
  },
  straightFirst: false,
  straightLast: false,
  strokecolor: ox_col
});

var inter11 = board.create('intersection', [c[ta_ox[0] - 1], L11, 0], {
  name: '',
  size: 0,
  showInfobox: false
});
var inter22 = board.create('intersection', [c[ta_ox[1] - 1], L33, 0], {
  name: '',
  size: 0,
  showInfobox: false
});
//board.create('text',[0,-3.5,function(){return inter11.X().toFixed(2)+' '+inter22.X().toFixed(2)}]);


//line for the text to glide on  
var LH22 = board.create('line', [
  [function() {
    return ap22.X()
  }, function() {
    return ap22.Y() + 0.3
  }],
  [function() {
    return ap44.X()
  }, function() {
    return ap44.Y() + 0.3
  }]
], {
  visible: false,
  straightFirst: false,
  straightLast: false
});

//label for the line
var ox_txt = {#ox_txt#};
var oxidtext = board.create('text', [0, 0, function() {
  return ox_txt
}], {
  useMathJax: true,
  fontSize: fontsize,
  attractors: [LH22],
  attractorDistance: 15,
  snatchDistance: 200,
  showInfobox: false
});



//hide or show the fields for design
document.getElementById("div").setAttribute("id",{#rqm#});
if (design == 1) {
document.getElementById({#rqm#}).style.display = "block"
} 

var fill_ans = function() {
  for (i = 0; isless(i, maxatoms); i++) {
    p[i].setAttribute({
      name: oxid[i],
      cssStyle: "font-weight: bold"
    });
    p[i].prepareUpdate().update(true).updateRenderer();board.update();

  }
}

if (stateInput.value != '') {
 oxid = JSON.parse(stateInput.value);
 fill_ans();
  } else
{  for (i = 0; isless(i, maxatoms); i++) {oxid[i]="0"}
fill_ans();
stateInput.value=JSON.stringify(oxid);
}


if (redInput.value != '') {
  let tmp = JSON.parse(redInput.value);
  if (tmp[0] != 0) {
    ap1.setPositionDirectly(JXG.COORDS_BY_USER, [p[tmp[0] - 1].X(), p[tmp[0] - 1].Y()]);
    ap1.prepareUpdate().update(true).updateRenderer();
    board.update();
  }
  if (tmp[1] != 0) {
    ap3.setPositionDirectly(JXG.COORDS_BY_USER, [p[tmp[1] - 1].X(), p[tmp[1] - 1].Y()]);
    ap3.prepareUpdate().update(true).updateRenderer();
    board.update();
  }
} else {
  redInput.value = JSON.stringify([0, 0]);
  board.update();
}

if (oxInput.value != '') {
  let tmp = JSON.parse(oxInput.value);
  if (tmp[0] != 0) {
    ap11.setPositionDirectly(JXG.COORDS_BY_USER, [p[tmp[0] - 1].X(), p[tmp[0] - 1].Y()]);
    ap11.prepareUpdate().update(true).updateRenderer();
    board.update();
  }
  if (tmp[1] != 0) {
    ap33.setPositionDirectly(JXG.COORDS_BY_USER, [p[tmp[1] - 1].X(), p[tmp[1] - 1].Y()]);
    ap33.prepareUpdate().update(true).updateRenderer();
    board.update();
  }
} else {
  oxInput.value = JSON.stringify([0, 0]);
  board.update();
}


//need to load oxid correct values if they exist on the input


// if the oxidation or reduction gliders moves write the values to the input fields

//this is for the black point in the reduction glider
ap1.on('drag', function(e, i) {
  var j;
 let st=false;
  for (j = 0; isless(j, maxatoms); j++) {
    st=false;
     let aa=[as1.X(),as1.Y()],bb=[p[j].X(),p[j].Y()];
 if (igrtq(radius, dist(aa,bb)) ) {
      st=true;
      if (redInput.value != '') {
        let temp = JSON.parse(redInput.value);
        temp[0] = j + 1;
        redInput.value = JSON.stringify(temp);

      } else {
        redInput.value = JSON.stringify([j + 1])
      }
 break;
    }
if (!st){
 if (redInput.value != '') {
        let temp = JSON.parse(redInput.value);
       temp[0]=0;
        redInput.value = JSON.stringify(temp);

      } else {
        redInput.value = JSON.stringify([])
      }
  }
}
});

//this is for the arrow in the reduction glider;
ap3.on('drag', function(e, i) {
  var j;
 let st=false;
  for (j = 0; isless(j, maxatoms); j++) {
    st=false;
     let aa=[as2.X(),as2.Y()],bb=[p[j].X(),p[j].Y()];
 if (igrtq(radius, dist(aa,bb)) ) {
      st=true;
      if (redInput.value != '') {
        let temp = JSON.parse(redInput.value);
        temp[1] = j + 1;
        redInput.value = JSON.stringify(temp);

      } else {
        redInput.value = JSON.stringify([0,j + 1])
      }
 break;
    }
if (!st){
 if (redInput.value != '') {
        let temp = JSON.parse(redInput.value);
        temp[1]=0;
        redInput.value = JSON.stringify(temp);

      } else {
        redInput.value = JSON.stringify([])
      }
  }
}
});

//this is for the black point in the oxidation glider;
ap11.on('drag', function(e, i) {
  var j;
 let st=false;
  for (j = 0; isless(j, maxatoms); j++) {
    st=false;
     let aa=[as11.X(),as11.Y()],bb=[p[j].X(),p[j].Y()];
 if (igrtq(radius, dist(aa,bb)) ) {
      st=true;
      if (oxInput.value != '') {
        let temp = JSON.parse(oxInput.value);
        temp[0] = j + 1;
        oxInput.value = JSON.stringify(temp);

      } else {
        oxInput.value = JSON.stringify([j + 1])
      }
 break;
    }
if (!st){
 if (oxInput.value != '') {
        let temp = JSON.parse(oxInput.value);
       temp[0]=0;
        oxInput.value = JSON.stringify(temp);

      } else {
        oxInput.value = JSON.stringify([])
      }
  }
}
});

//this is for the arrow in the oxidation glider;

ap33.on('drag', function(e, i) {
  var j;
 let st=false;
  for (j = 0; isless(j, maxatoms); j++) {
    st=false;
     let aa=[as22.X(),as22.Y()],bb=[p[j].X(),p[j].Y()];
 if (igrtq(radius, dist(aa,bb)) ) {
      st=true;
      if (oxInput.value != '') {
        let temp = JSON.parse(oxInput.value);
        temp[1] = j + 1;
        oxInput.value = JSON.stringify(temp);

      } else {
        oxInput.value = JSON.stringify([0,j + 1])
      }
 break;
    }
if (!st){
 if (oxInput.value != '') {
        let temp = JSON.parse(oxInput.value);
       temp[1]=0;
        oxInput.value = JSON.stringify(temp);

      } else {
        oxInput.value = JSON.stringify([])
      }
  }
}
});
function createSelectDropdown() {
      let selectTag = {#ox_no_txt#}+': '+ '<select id="nameinput" style="font-family: Arial; font-size: 14px; padding: 5px; border: 1px solid #ccc; border-radius: 4px;>';
      for (let i = minOx; i < (maxOx+1); i++) {
	      console.log(i,' ',selectTag);
			const sign = Math.sign(i) === 1 ? '+' : '';
        
			if (i!=0)
			{selectTag += '<option value="' + sign + i + '">' + sign + i + '</option>';}
			else 			{selectTag += '<option value=0 selected  >0</option>';}

		
      }
      selectTag += '</select>';
      return selectTag;
    }
  
   const selectTag = createSelectDropdown();
    const select = board.create('text', [-3, 4, selectTag], { fixed: true, fontsize:fontsize });
    select.setAttribute({ visible: true });


//mouse button event
p.forEach(function(el, i, p) {
  el.on('up', function(e) {
    if (e.button == 0) {
      if (!answered) {
       const dropdown = document.getElementById("nameinput");
	     const selectedValue = dropdown.value;
        oxid[i]=selectedValue;

        if (stateInput.value == '') {
          stateInput.value = JSON.stringify(oxid)
        }
        p[i].setAttribute({
          name: oxid[i],
          cssStyle: "font-weight: bold"
        });
        p[i].prepareUpdate().update(true).updateRenderer();
      }
      let temp = JSON.parse(stateInput.value);
      temp[i] = oxid[i];
      stateInput.value = JSON.stringify(temp);
    } /*!answered*/
  });
  el.on('drag', function(e) {
      positions[i] = p[i].X().toFixed(3);
    positionsInput.value = JSON.stringify(positions);
  });

});

 //===================
checkAnswer[rqm] =function() {
  
 answered=true;

  if (iand((inter1.Y()!=0),(inter2.Y()!=0)))
  { red_txt='</span><span style="font-size: 1em; color: green;">'+ {#red_txt#}+'<i class="fa fa-check"></i></span><span style="font-size: 1rem;">';
  }
   else 
  { red_txt='</span><span style="font-size: 1em; color: red;">'+ {#red_txt#}+'<i class="fa fa-times"></i></span><span style="font-size: 1rem;">';
  }
  
  if (iand((inter11.Y()!=0),(inter22.Y()!=0)))
  { ox_txt='</span><span style="font-size: 1em; color: green;">'+ {#ox_txt#}+'<i class="fa fa-check"></i></span><span style="font-size: 1rem;">';
  }
   else 
  { ox_txt='</span><span style="font-size: 1em; color: red;">'+ {#ox_txt#}+'<i class="fa fa-times"></i></span><span style="font-size: 1rem;">';
  }
  board.update();
  for (i = 0; isless(i,maxatoms); i++){
  if (parseFloat(p[i].name)==parseFloat(oxid_ans[i])) {
  p[i].name='</span><span style="font-size: 1em; color: green;">'+p[i].name+'<i class="fa fa-check"></i></span><span style="font-size: 1rem;">';   board.update();}
  else 
 { p[i].name='</span><span style="font-size: 1em; color: red;">'+p[i].name+'<i class="fa fa-times"></i></span><span style="font-size: 1rem;">';  board.update();
 }
  
 }
  
}
 

//making sure not to change the order of the circles and other stuff

board.on('update', function() {

  var o, nameArr;

  if (iand((typeof board.touches != 'undefined'), isless(0, board.touches.length))) {
    o = board.touches[0].obj;
  } else if (iand((board.mouse != null), (typeof board.mouse.obj != 'undefined'))) {
    o = board.mouse.obj;
  } else {
    return;
  }

  for (i = 0; isless(i, maxatoms); i++) {
    if (o == p[0]) {
      if (isless(p[1].position - p[0].position, 0.025)) {
        p[0].position = p[1].position - 0.05;
        p[0].prepareUpdate().update(true).updateRenderer();
    positions[0] = p[0].X().toFixed(3);
    positionsInput.value = JSON.stringify(positions);

        return;
      }
    } else if (o == p[maxatoms - 1]) {
      if (isless(p[maxatoms - 1].position - p[maxatoms - 2].position, 0.025)) {
        p[maxatoms - 1].position = p[maxatoms - 1 - 1].position + 0.05;
        p[maxatoms - 1].prepareUpdate().update(true).updateRenderer();
        positions[maxatoms - 1] = p[maxatoms - 1].X().toFixed(3);
        positionsInput.value = JSON.stringify(positions);
        return;
      }
    } else if (o == p[i]) {
      if (isless(p[i].position - p[i - 1].position, 0.025)) {
        p[i].position = p[i - 1].position + 0.05;
        p[i].prepareUpdate().update(true).updateRenderer();
        positions[i] = p[i].X().toFixed(3);
       positionsInput.value = JSON.stringify(positions);

        return;
      }
      if (isless(p[i + 1].position - p[i].position, 0.025)) {
        p[i].position = p[i + 1].position - 0.05;
        p[i].prepareUpdate().update(true).updateRenderer();
        positions[i] = p[i].X().toFixed(3);
        positionsInput.value = JSON.stringify(positions);
        return;
      }

    }

  } //for
});


//----------------
if (design != 1) {
  for (i = 0; isless(i, maxatoms); i++) {    p[i].setAttribute({fixed: true});  }
} 

if (design==1){
       let temp=[];  for (i = 0; isless(i, maxatoms); i++) {temp[i]="0";oxid[i]="0"};
       stateInput.value=JSON.stringify(temp);
      positionsInput.value=JSON.stringify(temp);
      redInput.value=JSON.stringify([0,0]);
      oxInput.value=JSON.stringify([0,0]);
    var e = new Event('change');
    stateInput.dispatchEvent(e);
}
[[/jsxgraph]]
<!-- end of graph code -->
