// ==UserScript==
// @name        Klikanie inventar
// @description moving items
// @include     *://*s17-sk.gladiatus.gameforge.*/game/index.php?mod=inventory&sub=*&subsub=*&*
// @include     *://*s17-sk.gladiatus.gameforge.*/game/index.php?mod=packages*
// @author      Gucci
// @version  	1.13
// @namespace   https://greasyfork.org/users/104906
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_addStyle
// ==/UserScript==
var tlacidlo = false;
var mode;
var poslednyItem = null;
var link = window.location.href;
var button = document.createElement("BUTTON");

link = link.split("=");
if (link[1] == "inventory&sub") {
    mode = 'sell';
}
else mode = 'take';
console.log(mode);


button.innerHTML = 'Start/stop selling';
button.addEventListener("click", prepinanie);
document.getElementById("content").insertBefore(button, document.getElementById("content").firstChild);

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function prepinanie() {
    if (tlacidlo) {
        tlacidlo = false;
    } else tlacidlo = true;
    console.log(tlacidlo);

    if (tlacidlo) {
        if (mode == 'sell') {
            tahaj();
        } else {
            vytahuj();
        }
    }
}

function tahaj() {
    if (tlacidlo) {
        var cas, inventar, item;
        inventar = document.getElementById("inv");
        item = inventar.getElementsByClassName("ui-draggable");
        cas = getRndInteger( 500, 700 );
        var evt = new Event('dblclick');
        if (item.length > 0) {
            setTimeout(function(){
                item.item(0).dispatchEvent(evt);
                tahaj();}, cas);
        }
    }
}

function vytahuj() {
    if (tlacidlo) {
        var item = document.getElementsByClassName('packageItem')[0];
        var evt = new Event('dblclick');
        var cas = getRndInteger( 900, 1200 );
        if (item) {
            if (poslednyItem !== document.getElementsByClassName('packageItem')[0].childNodes[5].childNodes[0]) {
                console.log("tu");
                setTimeout(function() {
                    console.log(poslednyItem);
                    poslednyItem = document.getElementsByClassName('packageItem')[0].childNodes[5].childNodes[0];
                    console.log(poslednyItem);
                    document.getElementsByClassName('packageItem')[0].childNodes[5].childNodes[0].dispatchEvent(evt);
                    vytahuj()}, cas);
            } else {
                console.log("plny inventar");
                setTimeout(prepniNaPredavanie(), cas);
            }
        } else {
            console.log("nic v balikoch");
            setTimeout(prepniNaPredavanie(), cas);
        }
    }
}
function prepniNaPredavanie() {
    var predavacX;
    var cas = getRndInteger( 900, 1200 );
    predavacX = document.getElementById("submenu1").getElementsByClassName("menuitem ")[3];
    setTimeout(function() {
        predavacX.click();
    }, cas);
    console.log(predavacX);
}
