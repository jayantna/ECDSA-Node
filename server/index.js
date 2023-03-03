const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  '0xdd28c462f713794fd82a910049f865171456f1f0': 100,
  '0x6a922715e7f99ecc92618850991f32ea15189fc0': 100,
  '0xdd21711d6cfda24cc2a437634ca5116fbb496bd8': 100,
  '0xba616e41d4b51bf6dbb56cabe92ba80acc24757b': 100,
  '0x576107b8f049bed31c4d6cd30badda8e4cb322ad': 100,
  '0xb0bb25eddbf4543354a33dea457d0aa5861ad99e': 100,
  '0x050ef9c78d82241357b5003179f236a616ded713': 100,
  '0xea06c65f16b7068554df3acda8062583928657a3': 100,
  '0xd6682e2057fafccbcbe2eeac0e5b715acc5a802f': 100,
  '0x4a053d4c1086f594354dd59272575467432fd817': 100,
  '0xb54b81aa828895d8cbdd779bc706eb475826a83e': 100,
  '0xdb99c619421e2b86c377f397439bff2ee196423b': 100,
  '0x8f4fb3ccd6fad4087d228c2d87c0eca5e0190147': 100,
  '0x14e0bc9cd39ff4a4ababf546c74f7feeb5cb0ce9': 100,
  '0xeae7ccba3d477d1def41728e1e9c99379dd2ad36': 100,
  '0xe913d93f2444ed4d833a8042e7155aa773842f3c': 100,
  '0xba93d116f9cb20c45348842f88f3d0654391aab5': 100,
  '0x42fa17b342c1114675e97938f1cf9fea0dbb0a58': 100,
  '0xee1fd76644a7d3192de3dcba0c2da5601a6d5e16': 100,
  '0x4852ca911346f40e18696ca9bf2558a7d8333bb6': 100,
  '0x8cdfe793df917a755cc8265695799e14192e9bf8': 100
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
