let config;


let behavior = {

    startTime: Date.now(),

    mouseMoves:0,

    clicks:0,

    keys:0

};


// Загружаем настройки

fetch("config.json")

.then(r=>r.json())

.then(data=>{

    config=data;

});




// движение мыши

document.addEventListener(
"mousemove",
()=>{

behavior.mouseMoves++;

});



// клики

document.addEventListener(
"click",
()=>{

behavior.clicks++;

});



// клавиатура

document.addEventListener(
"keydown",
()=>{

behavior.keys++;

});





function getFingerprint(){


return {

userAgent:
navigator.userAgent,

language:
navigator.language,

screen:
screen.width+"x"+screen.height,


timezone:
Intl.DateTimeFormat()
.resolvedOptions()
.timeZone


};


}







function calculateRisk(){


let risk=0;


// слишком быстро

let seconds =
(Date.now()-behavior.startTime)
/1000;


if(seconds < 3){

risk += 
config.weights.fastSubmit;

}




// нет движения

if(
behavior.mouseMoves < 5
){

risk +=
config.weights.noMouse;

}




// нет клавиатуры

if(
behavior.keys===0
){

risk +=
config.weights.noKeyboard;

}




// selenium

if(
navigator.webdriver
){

risk +=
config.weights.webdriver;

}





// отключены cookies

if(
!navigator.cookieEnabled
){

risk +=
config.weights.cookiesDisabled;

}



return risk;


}








document
.querySelector("#form")
.addEventListener(
"submit",
function(e){


e.preventDefault();



let risk =
calculateRisk();



let status =
document.querySelector("#status");



console.log({

risk,

fingerprint:
getFingerprint(),

behavior

});




if(
risk >= config.risk.block
){


status.innerHTML =
"❌ Проверка не пройдена";


status.style.color="red";


return;


}




if(
risk <= config.risk.allow
){


status.innerHTML =
"✅ Человек подтверждён";


status.style.color="green";


// тут отправка формы


return;


}




status.innerHTML =
"⚠ Требуется дополнительная проверка";


status.style.color="orange";



});
