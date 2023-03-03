import server from "./server";
import {secp} from "ethereum-cryptography/secp256k1";


function Wallet({ sign, setSign, balance, setBalance }) {
  async function onChange(evt) {
    const sign = evt.target.value;
    setSign(sign);
    if (sign) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }


  async function recoverKey(message, signature, recoveryBit) {
    return await secp.recoverPublicKey(hashMessage(message), signature, recoveryBit)
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Signature
        <input placeholder="Enter Signature" value={sign} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
