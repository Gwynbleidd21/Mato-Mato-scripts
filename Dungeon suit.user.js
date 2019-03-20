// ==UserScript==
// @name        Dungeon suit
// @description only dungeon clicker
// @description clicking in advance to area,
// @include     *://*s17-sk.gladiatus.gameforge.*/game/index.php?mod=dungeon*
// @include     *://*s17-sk.gladiatus.gameforge.*/game/index.php?mod=reports&submod=showCombatReport*t=1*
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
var statusLocal = GM_getValue("status", true);
var refreshInc = setTimeout(function(){ window.location.reload(true); }, 10000);
window.addEventListener("load", calculateRuntime);

function main () {
    var i, elemLink, explink, eXptime, x, elemFights,hodiny,faill,zivoty,aktzivoty,zivotperh,cakatzivoty , dungeonLink , time, sekundy, minuty;
    var jobLink;
    elemLink = document.getElementsByClassName("cooldown_bar_link");
    dungeonLink = elemLink[1].href;
    time = getRemainingTime();


     if (window.location.href != dungeonLink) {
         x = getRndInteger( 100, 300 );
         setTimeout(function(){ console.log("[GAD]: going to expedition"); window.location.assign(dungeonLink); }, 150 + x);
         return;
     }

    if (!isNaN(time) && window.location.href == dungeonLink) {
            setTimeout(function(){ window.location.reload(true); }, time - 500);
    }

    if (isNaN(time) && window.location.href == dungeonLink) {
         elemFights = document.getElementsByTagName("area");
        x = getRndInteger( 0, 3281 );
        if(elemFights.length > 0){
            setTimeout( function(){ elemFights[0].click(); }, x);
            return;
        }
        else{
            elemFights = document.getElementsByClassName("button1");

            if (elemFights[1].disabled) {
                setTimeout( function(){ elemFights[2].click(); }, x);
            } else {
                setTimeout( function(){ elemFights[3].click(); }, x);
            }

        }
    }
}


function getRemainingTime(){
    var elemTime, timeText, x, time;
    elemTime = document.getElementById("cooldown_bar_text_dungeon");
    timeText = elemTime.innerText;
    x = getRndInteger( 1, 4 );
    time = timeText[0]*3600 + timeText[2]*10*60 + timeText[3]*60 + timeText[5]*10 + timeText[6]*1 + x*1;
    //console.log( timeText[0]*3600 + " " + timeText[2]*10*60 + " " + timeText[3]*60 + " " + timeText[5]*10 + " " + timeText[6] + " " + x + " timp= " + time);
    if(time >= 60) {
        console.log( "I am going to enter a dungeon in " + (Math.abs(time/60)).toFixed(0) + " minutes and " + (Math.abs(time/60 - Math.floor(time/60))*60).toFixed(0) + " seconds.");
    } else if (!time) {
        console.log( "I am ready to go to a dungeon." );
    } else {
        console.log( "I am going to enter a dungeon in " + time/1000 + " seconds." );
    }
    time = time*1000;
    return time;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function calculateRuntime(){
    var sRuntime = Date.now();
    var eRuntime;
    clearTimeout(refreshInc);
    if(statusLocal){
        main();
    }
    eRuntime = Date.now() - sRuntime;
    console.log("[GAD] runtime: " + eRuntime + "ms" );
}
