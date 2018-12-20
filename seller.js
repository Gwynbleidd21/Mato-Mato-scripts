// ==UserScript==
// @name        Gladiatus Auto seller
// @description gladiatus auto dungeon and expedition clicker
// @include     *://*s*.gladiatus.gameforge.*/game/index.php?mod=packages*
// @include     *://*s*.gladiatus.gameforge.*/game/index.php?mod=inventory&sub=*&subsub=2*
// @author      Bristix
// @version  		1.0
// @namespace   https://greasyfork.org/users/104906
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_addStyle
// ==/UserScript==
var mode,refreshInc;
init();
function init(){
	var link = window.location.href;
  link = link.split("=");
  if (link[1] == "inventory&sub")
    mode = 'sell';
  else mode = 'take';  
  console.log(mode);
  
  var button = document.createElement("BUTTON");
  button.innerHTML = 'Start/stop selling';
  button.addEventListener("click", start);
  document.getElementById("content").insertBefore(button, document.getElementById("content").firstChild);;
  saveToStorage("false");

}


function start () {
  console.log('Start Script start');
  if (localStorage.getItem("starter") == "true"){  
  	saveToStorage("false");
  }else saveToStorage("true");   
  
  var elemDrag, elemDrop; 
  if(mode == 'take'){
    document.getElementsByClassName('awesome-tabs')[2].click();
    elemDrag = document.getElementsByClassName('packageItem')[0].childNodes[5].childNodes[0];
    elemDrop = document.getElementById('inv');
  }else if(mode == 'sell'){
    console.log('first sell drag');
    document.getElementsByClassName('awesome-tabs')[3].click();
  	elemDrag = document.getElementById('inv')[1];
    elemDrop = document.getElementById('shop');
    console.log('end first sell drag');
  }
  dragAndDrop(elemDrag, elemDrop);
  console.log('after after');
  main();
  
}	



function main () {
    console.log('Start Script main');
  	var elemDrag, elemDrop; 
    if (localStorage.getItem("starter") == "true"){
      if(mode == 'take'){
        elemDrag = document.getElementsByClassName('packageItem')[0].childNodes[5].childNodes[0];
        elemDrop = document.getElementById('inv').childNodes[1];
      }else if(mode == 'sell'){
        console.log('another sell drag');
  			elemDrag = document.getElementById('inv')[1];
        elemDrop = document.getElementById('shop').childNodes[0]; 
      }
      dragAndDrop(elemDrag,elemDrop);
      
    }

    

}

// function for triggering mouse events
function dragAndDrop(elemDrag,elemDrop){
    var fireMouseEvent = function (type, elem, centerX, centerY) {
      var evt = document.createEvent('MouseEvents');
      evt.initMouseEvent(type, true, true, window, 1, 1, 1, centerX, centerY, false, false, false, false, 0, elem);
      elem.dispatchEvent(evt);
    };


    // calculate positions
    var pos = elemDrag.getBoundingClientRect();
    var center1X = Math.floor((pos.left + pos.right) / 2);
    var center1Y = Math.floor((pos.top + pos.bottom) / 2);
    pos = elemDrop.getBoundingClientRect();
    var center2X = Math.floor((pos.left + pos.right) / 2);
    var center2Y = Math.floor((pos.top + pos.bottom) / 2);

    // mouse over dragged element and mousedown
    fireMouseEvent('mousemove', elemDrag, center1X, center1Y);
    fireMouseEvent('mouseenter', elemDrag, center1X, center1Y);
    fireMouseEvent('mouseover', elemDrag, center1X, center1Y);
    fireMouseEvent('mousedown', elemDrag, center1X, center1Y);

    // start dragging process over to drop target
    fireMouseEvent('dragstart', elemDrag, center1X, center1Y);
    fireMouseEvent('drag', elemDrag, center1X, center1Y);
    fireMouseEvent('mousemove', elemDrag, center1X, center1Y);
    fireMouseEvent('drag', elemDrag, center2X, center2Y);
    fireMouseEvent('mousemove', elemDrop, center2X, center2Y);

    // trigger dragging process on top of drop target
    fireMouseEvent('mouseenter', elemDrop, center2X, center2Y);
    fireMouseEvent('dragenter', elemDrop, center2X, center2Y);
    fireMouseEvent('mouseover', elemDrop, center2X, center2Y);
    fireMouseEvent('dragover', elemDrop, center2X, center2Y);

    // release dragged element on top of drop target
    fireMouseEvent('drop', elemDrop, center2X, center2Y);
    fireMouseEvent('dragend', elemDrag, center2X, center2Y);
    fireMouseEvent('mouseup', elemDrag, center2X, center2Y);
  refreshInc = setTimeout(function(){ main()}, 2000);
}

function saveToStorage(starter){
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("starter", starter);
  } else {
    console.log("Storage Problem!");
  }
}


