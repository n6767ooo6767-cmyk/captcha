let start =
Date.now();


let data={

mouse:0,

keys:0,

clicks:0

};



document
.addEventListener(
"mousemove",
()=>{

data.mouse++;

});



document
.addEventListener(
"keydown",
()=>{

data.keys++;

});





async function verifyCaptcha(){


data.time =
(Date.now()-start)
/1000;


data.webdriver =
navigator.webdriver || false;



let response =
await fetch(
"http://localhost:3000/captcha/check",
{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify(data)

});


let result =
await response.json();



console.log(result);



if(result.success){


alert(
"Человек подтверждён\n\n"+
result.token
);


}
else{


alert(
"Проверка провалена"
);


}


}
