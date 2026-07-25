let captcha = {

    mouseMoves:0,
    clicks:0,
    keys:0,
    start:Date.now()

};


document.addEventListener(
"mousemove",
()=>{

captcha.mouseMoves++;

});


document.addEventListener(
"click",
()=>{

captcha.clicks++;

});


document.addEventListener(
"keydown",
()=>{

captcha.keys++;

});
