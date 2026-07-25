const crypto =
require("crypto");


const secret =
process.env.SECRET;



function createToken(data){


let text =
JSON.stringify(data);



let hash =
crypto
.createHmac(
"sha256",
secret
)
.update(text)
.digest("hex");



return {

token:
"human_"+hash,

time:
Date.now()

};


}



module.exports={
createToken
};
