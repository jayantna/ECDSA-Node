import Wallet from "./Wallet";
import Transfer from "./Transfer";
import QueryWallet from "./QueryWallet";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("0x")
  const [sign, setSign] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        sign={sign}
        setSign={setSign}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} />
      <QueryWallet/>
    </div>
  );
}

export default App;
