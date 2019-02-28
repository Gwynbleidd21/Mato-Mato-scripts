// ==UserScript==
// @name        Expedition suit
// @description only expdeition clicker
// @description clicking in advance to area,
// @include     *://*s17-sk.gladiatus.gameforge.*/game/index.php?mod=location*
// @include     *://*s17-sk.gladiatus.gameforge.*/game/index.php?mod=reports&submod=showCombatReport&t=0*
// @author      Martiska
// @version  	2.0
// @namespace   https://greasyfork.org/users/104906
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_addStyle
// ==/UserScript==
(function() { "use strict"; } )();
GM_addStyle("\
.GADbutton1{\
background-image: url(https://i.imgur.com/Wcct3Hz.jpg);\
background-repeat: no-repeat;\
background-size: 144px 19px;\
background-position: center;\
text-align: center;\
color: #c8b38a;\
font-weight: bold;\
width: 144px;\
margin-left: auto;\
margin-right: auto;\
cursor: pointer;\
outline-style: none;\
outline-color: #ffff00;\
outline-width: 1px;\
}\
");
function getRemainingExpTime(){
    var elemTime, timeText, x, time;
    elemTime = document.getElementById("cooldown_bar_text_expedition");
    timeText = elemTime.innerText;
    x = getRndInteger( 1, 4 );
    time = timeText[0]*3600 + timeText[2]*10*60 + timeText[3]*60 + timeText[5]*10 + timeText[6]*1 + x*1;
    if(time >= 60) {
        console.log( "I am going to go on an adventure in " + (Math.abs(time/60)).toFixed(0) + " minutes and " + (Math.abs(time/60 - Math.floor(time/60))*60).toFixed(0) + " seconds.");
    } else if (!time) {
        console.log( "I am ready to go on an adventure." );
    } else {
        console.log( "I am going to go on an adventure in " + time/1000 + " seconds." );
    }
    time = time*1000;
    return time;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function main () {
    var i, elemLink, explink, eXptime, x, elemFights,hodiny,faill,zivoty,aktzivoty,zivotperh,cakatzivoty , dungeonLink , time, sekundy, minuty;
    var jobLink, arrow;
    elemLink = document.getElementsByClassName("cooldown_bar_link");
    elemLink = document.getElementsByClassName("cooldown_bar");
    elemLink = elemLink[0].getElementsByTagName("a");
    explink = elemLink[0].href;
    eXptime = getRemainingExpTime();


    zivoty = document.getElementById("header_values_hp_bar");
    aktzivoty = zivoty.getAttribute('data-value');
    zivotperh = zivoty.getAttribute('data-regen-per-hour');
    cakatzivoty = (1601 - aktzivoty) / (zivotperh / 3600);
    arrow = document.getElementsByClassName("attack arrow right");

    if (aktzivoty < 1601) {
        minuty = Math.abs(cakatzivoty/60);
        sekundy = Math.abs(minuty - Math.floor(minuty))*60;
        if (minuty > 59){
            var noveMinuty, noveHodiny, noveSekundy;
            noveHodiny = Math.abs(minuty/60);
            noveMinuty = Math.abs((noveHodiny - Math.floor(noveHodiny))*60);
            noveSekundy = Math.abs((noveMinuty - Math.floor(noveMinuty))*60);
            console.log("Due to low hp, I need to wait " + noveHodiny.toFixed(0) + " hours, " + noveMinuty.toFixed(0) + " minutes and " + noveSekundy.toFixed(0) + " seconds to go on an adventure again.");
        } else {
            console.log("Due to low hp, I need to wait " + minuty.toFixed(0) + " minutes and " + sekundy.toFixed(0) + " seconds to go on an adventure again.");
        }
    } else {
        console.log("I don't need to wait for more HP to go on an adventure.");
    }
    if (arrow[0] && (cakatzivoty < eXptime || cakatzivoty < 0)) {
        x = getRndInteger( 200, 500 );
        console.log("Idem kliknut o " + eXptime/1000 + " sekund.");
        setTimeout( function(){ arrow[0].click(); }, eXptime);
        return;
    }

    if (!isNaN(eXptime) && window.location.href == explink) {
        setTimeout(function(){ window.location.reload(true); }, eXptime - 500);
    }

    if (isNaN(eXptime) && (cakatzivoty < eXptime || cakatzivoty < 0) && window.location.href == explink) {
        elemFights = document.getElementsByClassName("expedition_button");
        x = getRndInteger( 200, 500 );
        hodiny = document.getElementsByClassName("expedition_cooldown_reduce");

        if((hodiny !== null) && (aktzivoty > 1600)){
            setTimeout( function(){ elemFights[3].click(); }, x);
            return;
        } else if (aktzivoty < 1600) {
            setTimeout(function(){ window.location.reload(true); }, Math.abs(cakatzivoty * 1000));
            return;
        }

    }
}

main();