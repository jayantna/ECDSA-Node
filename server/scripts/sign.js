const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

const PRIVATE_KEY = "e4abf0971270147a760b1e713517d13fe3df7c3b74295b7888f5b5663430864d";

function hashMessage(message) {
    bMessage = utf8ToBytes(message)
    return keccak256(bMessage)
}

async function signMessage(msg) {
    const hash = hashMessage(msg)
    return await secp.sign(hash,PRIVATE_KEY, {recovered:true})
}

signMessage("AlchemyUniversity").then(signatureValue=>{
    console.log(toHex(signatureValue[0]), signatureValue[1]);
})




