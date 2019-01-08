// ==UserScript==
// @name        Predavac
// @description script to sell and withdraw items
// @include     *://*s17-sk.gladiatus.gameforge.*/game/index.php?mod=inventory&sub=*&subsub=*&*
// @include     *://*s17-sk.gladiatus.gameforge.*/game/index.php?mod=packages*
// @author      Gucci
// @version  	2
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
    mode = 'Predavaj!';
}
else mode = 'Vytahuj!';
// console.log(mode);

button.innerHTML = mode;
button.addEventListener("click", prepinanie);
document.getElementById("content").insertBefore(button, document.getElementById("content").firstChild);

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function prepinanie() {
    if (tlacidlo) {
        tlacidlo = false;
    } else tlacidlo = true;
    // console.log(tlacidlo);

    if (tlacidlo) {
        if (mode == 'Predavaj') {
            predavaj();
        } else {
            vytahuj();
        }
    }
}

function predavaj() {
    if (tlacidlo) {
        var cas, inventar, item, polozka;
        inventar = document.getElementById("inv");
        item = inventar.getElementsByClassName("ui-draggable");
        cas = getRndInteger( 600, 1000 );
        var evt = new Event('dblclick');
        setTimeout(function(){
            if (item.length > 0 && (document.getElementById("inv").getElementsByClassName("ui-draggable").item(0) !== poslednyItem)) {
                poslednyItem = document.getElementById("inv").getElementsByClassName("ui-draggable").item(0);
                document.getElementById("inv").getElementsByClassName("ui-draggable").item(0).dispatchEvent(evt);
                predavaj();
            } else if (item.length > 0) {
                setTimeout(prepniObchodnika(), cas);
                } else {
                    tlacidlo = false;
                    setTimeout(prepniNaVykladnia(), cas);
                }
        }, cas);
    }
}

function vytahuj() {
    if (tlacidlo) {
        var item = document.getElementsByClassName('packageItem')[0];
        var evt = new Event('dblclick');
        var cas = getRndInteger( 1000, 1300 );
        if (item) {
            setTimeout(function() {
                if (poslednyItem !== document.getElementsByClassName('packageItem')[0].childNodes[5].childNodes[0]) {
                    poslednyItem = document.getElementsByClassName('packageItem')[0].childNodes[5].childNodes[0];
                    document.getElementsByClassName('packageItem')[0].childNodes[5].childNodes[0].dispatchEvent(evt);
                    vytahuj()

                } else {
                    // console.log("plny inventar");
                    tlacidlo = false;
                    setTimeout(prepniNaPredavanie(), cas);
                }
            }, cas);
        } else {
            // console.log("nic v balikoch");
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