'use strict';

const crypto = require('crypto');

const F_MAP =  [5, 2, 1, 7, 0, 3, 6, 4];
const IV_LENGTH = 16; // For AES, this is always 16

function fuzzyIV(iv) {
  let splited = iv.toString('hex').split(/(.{4})/).filter(x => !!x);
  return splited.map((e, i) => splited[F_MAP[i]]).join('');
}

function unFuzzyIV(fuzzyIV) {
  let splited = fuzzyIV.split(/(.{4})/).filter(x => !!x)
  return splited.map((e, i) => splited[F_MAP.indexOf(i)]).join('');
}

function encrypt(key, text) {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(key), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return fuzzyIV(iv.toString('hex')) + ':' + encrypted.toString('hex');
}

function decrypt(key, text) {
  try {
    let textParts = text.split(':');
    let iv = new Buffer(unFuzzyIV(textParts.shift()), 'hex');
    let encryptedText = new Buffer(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(key), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  } catch(err) {
    return undefined;
  }
}

module.exports = { decrypt, encrypt };
