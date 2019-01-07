// ==UserScript==
// @name        Klikanie inventar
// @description moving items
// @include     *://*s17-sk.gladiatus.gameforge.*/game/index.php?mod=inventory&sub=*&subsub=*&*
// @author      Gucci
// @version  	1.13
// @namespace   https://greasyfork.org/users/104906
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_addStyle
// ==/UserScript==
var tlacidlo = false;
var button = document.createElement("BUTTON");
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
        tahaj();
    }
}

function tahaj() {
    if (tlacidlo) {
        tlacidlo = true;
        var cas, inventar, item;
        inventar = document.getElementById("inv");
        item = inventar.getElementsByClassName("ui-draggable");
        cas = getRndInteger( 500, 700 );
        var evt = new Event('dblclick');
        if (item.length > 0) {
            setTimeout(function(){ item.item(0).dispatchEvent(evt); tahaj();}, cas);
        }
    }
}