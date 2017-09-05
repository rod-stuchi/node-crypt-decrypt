let randomstring = require("randomstring");
let key = randomstring.generate();

let {encrypt, decrypt} = require('./encryption');
let obj = {
  id: 11,
  modules: [4134, 432, 51234, 53432, 9948],
  modules2: [4134, 432, 51234, 53432, 9948],
  name: 'seu nome vai aqui XX',
  name: 'seu nome vai aqui YYY'
};

console.log('randomstring__: ', key);

let txt_c = encrypt(key,JSON.stringify(obj));
let txt_p = decrypt(key, txt_c);
console.log(txt_c);
console.log('\n');
!!txt_p
  && console.log(JSON.parse(txt_p)) | true
  || console.log('decrypt is invalid');


console.log('\n\n');
console.time('start bulk operation');

Array.from(Array(100000)).map((x,i) => {
  const en = encrypt(key, JSON.stringify(obj));
  const payload = decrypt(key, en);
  const de = !!payload && JSON.parse(payload);
})

console.timeEnd('start bulk operation');
