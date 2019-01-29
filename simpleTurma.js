// ==UserScript==
// @name        Endless Turma for lvl 110+
// @description gladiatus auto dungeon and expedition clicker
// @include     *://*s*.gladiatus.gameforge.*/game/index.php?mod=reports&submod=showCombatReport&t=3*
// @include     *://*s*.gladiatus.gameforge.*/game/index.php?mod=arena&submod=serverArena&aType=3*
// @author      Gucci
// @version  	2.0
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_addStyle
// ==/UserScript==

//addAutoExpeditionButton();
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

function main () {
    var turmaProvincLink, attackButton, turmaTime, elemLink, x;
    elemLink = document.getElementsByClassName("cooldown_bar_link");
    turmaProvincLink = elemLink[3].href;

    turmaTime = getRemainingTurmaTime();
    elemLink = document.getElementsByClassName("cooldown_bar");
    elemLink = elemLink[0].getElementsByTagName("a");

    if (window.location.href != turmaProvincLink) {
        x = getRndInteger( 200, 400 );
        setTimeout(function(){ console.log("[GAD]: going to turma"); window.location.assign(turmaProvincLink); }, 200 + x);
        return;
    }
    if (window.location.href == turmaProvincLink && turmaTime > 0){
        setTimeout(function(){
            console.log("Ide reload");
            window.location.reload(true); }, turmaTime - 500);
    }
    if (window.location.href == turmaProvincLink && isNaN(turmaTime)) {
        setTimeout( function() {
            x = getRndInteger( 400, 900 );

            attackButton = document.getElementsByClassName("attack");
            setTimeout( function(){
                attackButton[1].click();
                setTimeout( function(){
                    if (document.getElementById("blackoutDialogbod").style.display === 'block') {
                            document.getElementById("linkbod").click();
                        }
                    }, 600);
            }, x);
        }, 400);
    }
}


main();

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



function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


