const secp = require("ethereum-cryptography/secp256k1");
const {toHex} = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const obj={}

for (i=0; i<=20; i++){
    const privateKey = secp.utils.randomPrivateKey()
const publicKey = secp.getPublicKey(privateKey);
const address = keccak256(publicKey.slice(1,publicKey.length)).slice(-20)
console.log("Address:", toHex(address))
console.log("Private Key:", toHex(privateKey));
console.log( "Public Key:", toHex(publicKey), '\n');
obj["0x"+toHex(address)]=100
}
console.log(obj);

