// ==UserScript==
// @name        Hladanie supera v oboch arenach provinciovych
// @description scrpt for looking for selected players in provinciatum arenas
// @include     *://*s*.gladiatus.gameforge.*/game/index.php?mod=arena&submod=getNewOpponents&aType=2*
// @include     *://*s*.gladiatus.gameforge.*/game/index.php?mod=arena&submod=serverArena&aType=2*
// @include     *://*s*.gladiatus.gameforge.*/game/index.php?mod=arena&submod=getNewOpponents&aType=3*
// @include     *://*s*.gladiatus.gameforge.*/game/index.php?mod=arena&submod=serverArena&aType=3*
// @author      Gucci
// @version  	1.13
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
    var url = window.location.toString();
    if (url.includes("aType=3")) {
        hladatTrumu();
    } else if (url.includes("aType=2")) {
        hladatArenu();
    }
}

function hladatArenu() {
     var arenaTime;
    var enemy = 'Akkadan';
    var enemy7 = "Szaki";
    var enemy2 = "kazisvet";
    var enemy6 = "FreedyKruger";
    var enemy3 = "SpeedyGonzales";
    var enemy4 = "[V.V.V.]strido";
    arenaTime = getRemainingArenaTime();
    console.log("Som v arene a hladam hraca " + enemy + " na to, aby som rozmetal.");
    if (arenaTime > 0) {
        setTimeout(function(){
            console.log("Ide reload");
            window.location.reload(true); }, arenaTime - 500);
    }

    if (isNaN(arenaTime)) {
        var attackButton, x, name, riadkyCt, jeTu;
        jeTu = false;
        x = getRndInteger( 600, 900 );
        riadkyCt = document.getElementById("own2").getElementsByTagName("td");
        name = document.getElementById("own2").getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML.trim();
        if (name.includes(enemy)) {
            jeTu = true;
        }
        for(var iCt = 4; iCt < riadkyCt.length; iCt++) {
            if (iCt == 6 || iCt == 10 || iCt == 14 || iCt == 18) {
                name = document.getElementById("own2").getElementsByTagName("td")[iCt - 2].getElementsByTagName("a")[0].innerHTML.trim();
                if (name.includes(enemy)) {
                    jeTu = true;
                    console.log("jeTu");
                }
            }
        }
        attackButton = document.getElementsByClassName("button1");
        if (jeTu === false){
            setTimeout( function(){
                attackButton[2].click();}, x);
        }
    }
}

function hladatTrumu() {
    var turmaTime;
    var enemy10 = "HolyPapa";
    var enemy9 = "rychlik";
    var enemy8 = "*Kugel*";
    var enemy = 'KANAL_ZAVAN';
    var enemy4 = "[V.V.V.]strido";
    turmaTime = getRemainingTurmaTime();
    console.log("Som v turme a hladam hraca " + enemy + " na to, aby som rozmetal.");
    if (turmaTime > 0) {
        setTimeout(function(){
            console.log("Ide reload");
            window.location.reload(true); }, turmaTime - 500);
    }

    if (isNaN(turmaTime)) {
        var attackButton, x, name, riadkyCt, jeTu;
        jeTu = false;
        x = getRndInteger( 600, 900 );
        riadkyCt = document.getElementById("own3").getElementsByTagName("td");
        name = document.getElementById("own3").getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML.trim();
        if (name.includes(enemy)) {
            jeTu = true;
        }
        for(var iCt = 4; iCt < riadkyCt.length; iCt++) {
            if (iCt == 6 || iCt == 10 || iCt == 14 || iCt == 18) {
                name = document.getElementById("own3").getElementsByTagName("td")[iCt - 2].getElementsByTagName("a")[0].innerHTML.trim();
                if (name.includes(enemy)) {
                    jeTu = true;
                    console.log("jeTu");
                }
            }
        }
        attackButton = document.getElementsByClassName("button1");
        if (jeTu === false){
            setTimeout( function(){
                attackButton[2].click();}, x);
        }
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRemainingArenaTime() {
    var elemTime, timeText, x, time;
    elemTime = document.getElementById("cooldown_bar_text_arena");
    timeText = elemTime.innerText;
    x = getRndInteger( 1, 4 );
    time = timeText[0]*3600 + timeText[2]*10*60 + timeText[3]*60 + timeText[5]*10 + timeText[6]*1 + x*1;
    if(time >= 60) {
        console.log( "I am going to enter Arena in " + (Math.abs(time/60)).toFixed(0) +
                    " minutes and " + (Math.abs(time/60 - Math.floor(time/60))*60).toFixed(0) + " seconds.");
    } else if (!time) {
        console.log( "I am ready to go to Arena." );
    } else {
        console.log( "I am going to Arena in " + time + " seconds." );
    }
    time = time*1000;
    return time;
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

function getRemainingTurmaTime() {
    var elemTime, timeText, x, time;
    elemTime = document.getElementById("cooldown_bar_text_ct");
    timeText = elemTime.innerText;
    x = getRndInteger( 1, 4 );
    time = timeText[0]*3600 + timeText[2]*10*60 + timeText[3]*60 + timeText[5]*10 + timeText[6]*1 + x*1;
    if(time >= 60) {
        console.log( "I am going to Circus Turma in " + (Math.abs(time/60)).toFixed(0) +
                    " minutes and " + (Math.abs(time/60 - Math.floor(time/60))*60).toFixed(0) + " seconds.");
    } else if (!time) {
        console.log( "I am ready to go to Circus Turma." );
    } else {
        console.log( "I am going to Circus Turma in " + time + " seconds." );
    }
    time = time*1000;
    return time;
}