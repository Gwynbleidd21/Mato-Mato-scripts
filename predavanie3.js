// ==UserScript==
// @name        Predavac
// @description script to sell and withdraw items, also with off-line mode
// @include     *://*s17-sk.gladiatus.gameforge.*/game/index.php?mod=inventory&sub=*&subsub=*&*
// @include     *://*s17-sk.gladiatus.gameforge.*/game/index.php?mod=packages*
// @author      Gucci
// @version  	3
// @namespace   https://greasyfork.org/users/104906
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_addStyle
// ==/UserScript==
GM_addStyle("\
.GADbutton1{\
background-image: url(https://i.imgur.com/iXZKKOQ.jpg);\
background-repeat: no-repeat;\
background-size: 144px 19px;\
background-position: center;\
text-align: center;\
color: #c8b38a;\
font-weight: bold;\
width: 144px;\
margin-left: 20px;\
margin-right: 20px;\
cursor: pointer;\
outline-style: none;\
outline-color: #ffff00;\
outline-width: 1px;\
}\
.buttony{\
 text-align:center;\
padding-bottom:20px\
}\
")
var tlacidlo = false;
var mode;
var poslednyItem = null;
var link = window.location.href;
var button = document.createElement("BUTTON");
var button2 = document.createElement("BUTTON");
var divko = document.createElement("div");

link = link.split("=");
if (link[1] == "inventory&sub") {
    mode = 'Predavanie';
}
else mode = 'Vyberanie';
console.log(mode);

button.innerHTML = mode;
button.addEventListener("click", prepinanie);
button.setAttribute("class", "GADbutton1");

button2.innerHTML = "Off-line";
button2.addEventListener("click", prepinanieAutonomne);
button2.setAttribute("class", "GADbutton1");

divko.innerHTML += '<h1>Sekcia Pre Automaticke ' + mode + '</h1>';
divko.appendChild(button);
divko.appendChild(button2);
divko.setAttribute("class", "buttony");

document.getElementById("content").insertBefore(divko, document.getElementById("content").firstChild);
if (localStorage.getItem("starter") == "null") {
    saveToStorage("false");
}

if (localStorage.getItem("starter") == "true") {
    if (mode != 'Predavanie') {
        setTimeout(vytahuj(), 500);
    } else if (mode == 'Predavanie') {
        setTimeout(predavaj(), 500);
    } else {
        console.log("zmini");
    }

}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function prepinanieAutonomne() {
    if (localStorage.getItem("starter") == "true") {
        saveToStorage("false");
    } else saveToStorage("true");
    if (localStorage.getItem("starter") == "true") {
        if (mode != 'Predavanie') {
            setTimeout(vytahuj(), 500);
        } else if (mode == 'Predavanie') {
            setTimeout(predavaj(), 500);
        } else {
            console.log("zmini");
        }
    }
}

function prepinanie() {
    if (tlacidlo) {
        tlacidlo = false;
    } else tlacidlo = true;
    // console.log(tlacidlo);

    if (tlacidlo) {
        if (mode == 'Predavanie') {
            predavaj();
        } else {
            vytahuj();
        }
    }
}

function predavaj() {
    if (tlacidlo || localStorage.getItem("starter") == "true") {
        var cas, inventar, item, polozka;
        inventar = document.getElementById("inv");
        item = inventar.getElementsByClassName("ui-draggable");
        cas = getRndInteger( 600, 1000 );
        var evt = new Event('dblclick');
        setTimeout(dragToSell, cas);
    }
}

function vytahuj() {
    if (tlacidlo || localStorage.getItem("starter") == "true") {
        var item = document.getElementsByClassName('packageItem')[0];
        var evt = new Event('dblclick');
        var cas = getRndInteger( 1000, 1300 );

        if (item) {
            setTimeout(dragToPick, cas);
        } else {
            console.log("nic v balikoch");
            tlacidlo = false;
            setTimeout(prepniNaPredavanie(), cas);
        }
    }
}

function prepniNaPredavanie() {
    var predavacX;
    var cas = getRndInteger( 900, 1200 );
    predavacX = document.getElementById("submenu1").getElementsByClassName("menuitem")[3];
    setTimeout(function() {
        predavacX.click();
    }, cas);
}

function prepniObchodnika() {
    var actualObchodnik = window.location.href;
    var cas = getRndInteger( 900, 1200 );
    var celymMenom, poradie, predavacX;
    actualObchodnik = actualObchodnik.split("&");
    celymMenom = actualObchodnik[1];
    poradie = celymMenom.split("=");
    poradie = parseInt(poradie[1]);
    if (poradie > 0 && poradie < 6) {
        predavacX = document.getElementById("submenu1").getElementsByClassName("menuitem")[3 + poradie];
        setTimeout(function() {
            predavacX.click();
        }, cas);
    }
}

function prepniNaVykladnia() {
    var baliky;
    var cas = getRndInteger( 900, 1200 );
    baliky = document.getElementById("menue_packages");
    setTimeout(function() {
        baliky.click();
    }, cas);
}

function najdiVypln() {
    var inventar, item;
    var cas = getRndInteger( 600, 1000 );
    inventar = document.getElementById("inv");
    var nasiel = false;
    item = inventar.getElementsByClassName("ui-draggable");
    for (var i = 0; i < item.length; i++) {
        if (item.item(i).clientHeight == 32) {
            //setTimeout(dragToSell(i), cas);
            return i;
        }
    }
    return 0;
}

function najdiNaDolozenie() {
    var balik = document.getElementsByClassName('packageItem');
    var pocet = 0;
    for (var i = 0; i < balik.length; i++) {
        if (balik[i].childNodes[5].childNodes[0].clientHeight == 32) {
            return i;
        }
    }
    return 0;
}

function dragToPick(zaciatok = 0) {
    var evt = new Event('dblclick');
    var balik = document.getElementsByClassName('packageItem');
    var cas = getRndInteger(1000, 1300);
    if (balik.length > 0 && poslednyItem !== document.getElementsByClassName('packageItem')[zaciatok].childNodes[5].childNodes[0]) {
        console.log("Zase prace...");
        poslednyItem = document.getElementsByClassName('packageItem')[zaciatok].childNodes[5].childNodes[0];
        document.getElementsByClassName('packageItem')[zaciatok].childNodes[5].childNodes[0].dispatchEvent(evt);
        vytahuj()
    } else if (balik.length > 0) {
        console.log("Pozrem ci sa este nieco nemesti...");
        var poziciaVyplne = najdiNaDolozenie();
        if (poziciaVyplne > 0) {
            setTimeout(function() {
                if (balik.length > 0 && poslednyItem !== document.getElementsByClassName('packageItem')[poziciaVyplne].childNodes[5].childNodes[0]) {
                    poslednyItem = document.getElementsByClassName('packageItem')[poziciaVyplne].childNodes[5].childNodes[0];
                    document.getElementsByClassName('packageItem')[poziciaVyplne].childNodes[5].childNodes[0].dispatchEvent(evt);
                    dragToPick(poziciaVyplne);
                }
                else {
                    console.log("Plny inventar, idem k obchodnikovi.");
                    setTimeout(prepniNaPredavanie(), cas);
                }
            }, cas);
        } else {
            console.log("Plny inventar, idem k obchodnikovi.");
            setTimeout(prepniNaPredavanie(), cas);
        }
    } else {
        console.log("Plny inventar, idem k obchodnikovi.");
        setTimeout(prepniNaPredavanie(), cas);
    }
}

function dragToSell(zaciatok = 0) {
    var inventar, item, cas;
    inventar = document.getElementById("inv");
    item = inventar.getElementsByClassName("ui-draggable");
    cas = getRndInteger( 600, 1000 );
    var evt = new Event('dblclick');
    if (item.length > 0 && (document.getElementById("inv").getElementsByClassName("ui-draggable").item(zaciatok) !== poslednyItem)) {
        console.log("Zase prace...");
        poslednyItem = document.getElementById("inv").getElementsByClassName("ui-draggable").item(zaciatok);
        document.getElementById("inv").getElementsByClassName("ui-draggable").item(zaciatok).dispatchEvent(evt);
        predavaj();
    } else if (item.length > 0) {
        console.log("Pozrem ci sa este nieco nemesti...");
        var poziciaVyplne = najdiVypln();
        //setTimeout(najdiVypln(), cas);
        if (poziciaVyplne > 0) {
            setTimeout(function() {
                if (document.getElementById("inv").getElementsByClassName("ui-draggable").item(poziciaVyplne) !== poslednyItem) {
                    poslednyItem = document.getElementById("inv").getElementsByClassName("ui-draggable").item(poziciaVyplne);
                    document.getElementById("inv").getElementsByClassName("ui-draggable").item(poziciaVyplne).dispatchEvent(evt);
                    dragToSell(poziciaVyplne);
                }
                else {
                    console.log("Tento obchodnik plny, idem na nasledujuceho.");
                    setTimeout(prepniObchodnika(), cas);
                }
            }, cas);
        } else {
            console.log("Tento obchodnik plny, idem na nasledujuceho.");
            setTimeout(prepniObchodnika(), cas);
        }
    } else {
        console.log("Inventar je prazdny, ide do balikov.");
        setTimeout(prepniNaVykladnia(), cas);
    }
}

function saveToStorage(starter){
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("starter", starter);
  } else {
    console.log("Storage Problem!");
  }
}