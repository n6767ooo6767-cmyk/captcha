const config =
require("./config.json");


function calculateRisk(data){

let risk=0;


// слишком быстро

if(data.time < 3){

risk +=
config.weights.fast;

}



// нет мыши

if(data.mouse < 5){

risk +=
config.weights.noMouse;

}



// нет клавиатуры

if(data.keys === 0){

risk +=
config.weights.noKeyboard;

}



// webdriver

if(data.webdriver){

risk +=
config.weights.webdriver;

}



return risk;

}


module.exports={
calculateRisk
};
