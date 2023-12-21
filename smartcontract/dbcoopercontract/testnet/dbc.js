const Pact = require('pact-lang-api');
const fs = require('fs');

const NETWORK_ID = 'mainnet01';
const CHAIN_ID = '8';
const API_HOST = `https://api.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
const CONTRACT_PATH = '/Users/shubhamarya/Desktop/Flexsin/main_files/dbcoopercontract /dbcoppercontract4.pact';
//   'publicKey': 'ca5ca1076e30bb9244453799f8c088af97a66973eb8e3dd3cff88b82b95cc4bd',
//   'secretKey': '4b4b0077b33b61ec69f26787cc60383af7bc80e6aa8adcd465cc003221685ee9'
// }

const KEY_PAIR = {
    publicKey: "260fe7bca08c45c03d4fc5f3d0a7fafaa8d28d4a3c3db0b2158dd18725ab0586",
    secretKey: "01faa327e37b1ec26b7adca1469e25ccd776e33776496edc860d3834aaeb0906"
  }

const pactCode = fs.readFileSync(CONTRACT_PATH, 'utf8');
const creationTime = () => Math.round((new Date).getTime() / 1000);

deployContract(pactCode);

async function deployContract(pactCode) {
  const cmd = {
    networkId: NETWORK_ID,
    keyPairs: KEY_PAIR,
    pactCode: pactCode,
    envData: {
      'dbtest-ks-six': [KEY_PAIR['publicKey']]

    },
    meta: {
      creationTime: creationTime(),
      ttl: 28000,
      gasLimit: 100000,
      chainId: CHAIN_ID,
      gasPrice: 0.000001,
      sender: "k:" + KEY_PAIR.publicKey // the account paying for gas
    }
  };
  const response = await Pact.fetch.send(cmd, API_HOST);
  
  const response1 = await Pact.fetch.local(cmd, API_HOST);
  
  const txResult = await Pact.fetch.listen({ listen: response.requestKeys[0] }, API_HOST);
  
};
