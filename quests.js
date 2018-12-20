// ==UserScript==
// @name        Uloha
// @description gladiatus auto dungeon and expedition clicker
// @include     *://*s17-sk.gladiatus.gameforge.*/game/index.php?mod=quests*
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
    var questTime, ulohaMinuty, ulohaSekundy;
    var ozajstneMinuty, ozajstneSekundy, areCompleted;
    var neaktivneUlohy, x, y, z, odkazArena, odkazCT;
    var neaktivneUlohyArena, neaktivneUlohyCT, odkazDoneUlohy;
    var odakzUlohy, noveUlohy, areFailed, linkUlohy, refresh;
    var zivoty, aktzivoty, zivotperh, cakatzivoty, reloadd;
    var neaktivneVyprava, pocetUlohVyprava,neaktivneUlohyVyp;
    var pocetAcceptnutychVyprava, r;
    z = getRndInteger( 3000, 6000 );
    zivoty = document.getElementById("header_values_hp_bar");
    aktzivoty = zivoty.getAttribute('data-value');
    zivotperh = zivoty.getAttribute('data-regen-per-hour');
    cakatzivoty = (1601-aktzivoty) / (zivotperh/3600);
    if (aktzivoty < 1600) {
        setTimeout(function(){ window.location.reload(true); }, Math.abs(cakatzivoty*1000) + z);
        return;
    }
    ulohaSekundy = 0;
    x = getRndInteger( 0, 2899 );
    y = getRndInteger( 300, 500 );
    setTimeout( function() {
        linkUlohy = document.getElementsByClassName("menuitem advanced_menu_link")[1].href;
        if (linkUlohy.includes("quests") && window.location.href != linkUlohy){
            setTimeout(function(){ console.log("Idem na ulohy"); window.location.assign(linkUlohy); }, 2510 + x);
        }
        ulohaSekundy = 0;
        questTime = document.getElementById("QuestTime").innerHTML;
        pocetAcceptnutychVyprava = document.getElementById("qcategory_expedition").getElementsByClassName("contentboard_slot contentboard_slot_active").length;
        console.log(pocetAcceptnutychVyprava);
        if (document.getElementById("qcategory_restart")) {
            if (document.getElementById("qcategory_restart").getElementsByClassName("quest_slot_button quest_slot_button_restart")[0]){
                areFailed = document.getElementById("qcategory_restart").getElementsByClassName("quest_slot_button quest_slot_button_restart")[0];
                console.log("Idem obnovit zlyhania");
                setTimeout( function(){
                    areFailed.click();}, x);
            }
        }
        if (document.getElementById("qcategory_finished")) {
            if (document.getElementById("qcategory_finished").getElementsByClassName("quest_slot_button quest_slot_button_finish")[0]) {
                areCompleted = document.getElementById("qcategory_finished").getElementsByClassName("quest_slot_button quest_slot_button_finish")[0];
                console.log("Idem potvrdit ulohy");
                setTimeout( function(){
                    areCompleted.click();}, x);
            }
        }
        if (questTime.substring(19,23) == "Plný"){
           setTimeout( function(){console.log("Quest log je plny, bude reload o " + z);}, z);
        } else if (questTime.substring(22,27) == "Úloha" && pocetAcceptnutychVyprava < 2) {
            neaktivneUlohyArena = document.getElementById("qcategory_arena").getElementsByClassName("contentboard_slot contentboard_slot_inactive")[0];
            neaktivneUlohyCT = document.getElementById("qcategory_grouparena").getElementsByClassName("contentboard_slot contentboard_slot_inactive")[0];
            neaktivneUlohyVyp = document.getElementById("qcategory_expedition").getElementsByClassName("contentboard_slot contentboard_slot_inactive");
            noveUlohy = document.getElementById("quest_footer_reroll").getElementsByClassName("awesome-button big")[0];
            var poziciaBoss, poziciaLubo, odkazVyprava;
            for (var i = 0; i < neaktivneUlohyVyp.length; i++) {
                if ((neaktivneUlohyVyp[i].getElementsByClassName("quest_slot_title")[0].innerHTML).includes("oblasti")
                   && (neaktivneUlohyVyp[i].getElementsByClassName("quest_slot_title")[0].innerHTML).includes("Baňa")) {
                    poziciaBoss = i;
                }
                if ((neaktivneUlohyVyp[i].getElementsByClassName("quest_slot_title")[0].innerHTML).includes("ľubovo")
                   && (neaktivneUlohyVyp[i].getElementsByClassName("quest_slot_title")[0].innerHTML).includes("Baňa")) {
                    poziciaLubo = i;
                }
            }

            if (poziciaBoss != null) {
                odkazVyprava = neaktivneUlohyVyp[poziciaBoss].getElementsByClassName("quest_slot_button quest_slot_button_accept")[0];
                console.log("Idem prijat ulohy na seknutie bossa vypravy.");
                setTimeout( function(){
                    odkazVyprava.click();}, x);
            } else if (poziciaLubo != null) {
                odkazVyprava = neaktivneUlohyVyp[poziciaLubo].getElementsByClassName("quest_slot_button quest_slot_button_accept")[0];
                console.log("Idem prijat ulohy na seknutie lubovolnych protivnikov vypravy.");
                setTimeout( function(){
                    odkazVyprava.click();}, x);
            //} else if (neaktivneUlohyArena) {
            //    odkazArena = neaktivneUlohyArena.getElementsByClassName("quest_slot_button quest_slot_button_accept")[0];
            //    console.log("Idem prijat ulohy z Areny.");
            //    setTimeout( function(){
            //        odkazArena.click();}, x);
            //} else if (neaktivneUlohyCT) {
            //   odkazCT = neaktivneUlohyCT.getElementsByClassName("quest_slot_button quest_slot_button_accept")[0];
            //    console.log("Idem prijat ulohy z CT.");
            //    setTimeout( function(){
            //        odkazCT.click();}, x);
            } else {
                console.log("Idem refreshnut ulohy");
                setTimeout( function(){
                    noveUlohy.click();}, x);
            }

        } else if (pocetAcceptnutychVyprava == 2) {
            r = getRndInteger( 20000, 50000 );
            odakzUlohy = document.getElementsByClassName("menuitem active advanced_menu_link_active")[0];
            console.log("Budem cakat " + (r/1000).toFixed(0) + " sekund.");
            setTimeout(function(){
                odakzUlohy.click();}, r);
        } else {
            reloadd = getRndInteger( 20000, 30000 );
            console.log("Bude reload o " + (reloadd/1000).toFixed(0) + " sekund.");
            ulohaMinuty = parseInt(questTime.substring(1,3));
            ulohaSekundy = parseInt(questTime.substring(4,6));
            if (ulohaMinuty > 0) {
                    ulohaSekundy += ulohaMinuty * 60;
            }
            if ((reloadd/1000).toFixed(0) < ulohaSekundy) {
            setTimeout(function(){ window.location.reload(true); }, reloadd);
            }
            console.log("Idem cakat " + ulohaSekundy + " sekúnd.");
            odakzUlohy = document.getElementsByClassName("menuitem active advanced_menu_link_active")[0];
            setTimeout(function(){
                       odakzUlohy.click();}, (ulohaSekundy*1000));
        }
    }, ulohaSekundy*1000 + y);

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
    //console.log("[GAD] runtime: " + eRuntime + "ms" );
}


