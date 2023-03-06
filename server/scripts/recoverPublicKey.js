const { keccak256 } = require("ethereum-cryptography/keccak");
const secp = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

const PRIVATE_KEY = "e4abf0971270147a760b1e713517d13fe3df7c3b74295b7888f5b5663430864d";

function hashMessage(stringMessage) {
    byteMessage = utf8ToBytes(stringMessage)
    return keccak256(byteMessage)
}

async function signMessage(message) {
    return await secp.sign(hashMessage(message), PRIVATE_KEY, { recovered: true })
}
async function recoverKey(stringMessage, signature, recoveryBit) {
    return await secp.recoverPublicKey(hashMessage(stringMessage), signature, recoveryBit)
}


signMessage("AlchemyUniversity").then(signatureValue => {
    return signatureValue[0];
})
.then(signatureValue => {
    return recoverKey("AlchemyUniversity", toHex(signatureValue), 1)
})
.then(publicKey => {
    const address = keccak256(publicKey.slice(1, publicKey.length)).slice(-20)
    console.log(toHex(address), "\n", toHex(publicKey));
})
