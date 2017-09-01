let randomstring = require("randomstring");
let key = randomstring.generate();

let {encrypt, decrypt} = require('./encryption');
let obj = {
  id: 11,
  modules: [4134, 432, 51234, 53432, 9948],
  name: 'seu nome vai aqui'
};

console.log('randomstring__: ', key);

let txt_c = encrypt(key,JSON.stringify(obj));
let txt_p = decrypt(key, txt_c);
console.log(txt_c);
console.log('\n');
!!txt_p
  && console.log(JSON.parse(txt_p))
  || console.log('decrypt is invalid');
