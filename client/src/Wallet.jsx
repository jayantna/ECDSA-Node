import server from "./server";
import { recoverPublicKey } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak"
// const secp = require("ethereum-cryptography/secp256k1");
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils"
import { useEffect, useState } from "react";


function Wallet({ sign, setSign, balance, setBalance, address, setAddress }) {

  const [signMsg, setSignMsg] = useState("")

  useEffect(()=>{
    if (sign) {
      recoverKey(signMsg, sign, 1)
        .then((publicKey) => {
          return keccak256(publicKey.slice(1, publicKey.length)).slice(-20)
        })
        .then((address) => {
          setAddress(`0x${toHex(address)}`)
          return server.get(`balance/0x${toHex(address)}`);
        })
        .then((data) => {
          setBalance(data.data.balance);
        })
        .catch(err=>{})
    } else {
      setBalance(0);
    }
  })

  async function onChange(evt) {
    const sign = evt.target.value;
    setSign(sign);
  }

  function hashMessage(stringMessage) {
    const byteMessage = utf8ToBytes(stringMessage)
    return keccak256(byteMessage)
  }

  async function recoverKey(stringMessage, signature, recoveryBit) {
    return await recoverPublicKey(hashMessage(stringMessage), signature, recoveryBit)
  }


  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Signature
        <input 
        placeholder="Enter Signature" 
        value={sign} 
        onChange={onChange}
        >
        </input>
      </label>
      <label>
        Siggned Message
        <input 
        placeholder="Enter Signed Message" 
        value={signMsg} 
        onChange={(e)=>{
          setSignMsg(e.target.value);
          }}
        >
        </input>
      </label>

      <div className="balance">Address: {address}</div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
