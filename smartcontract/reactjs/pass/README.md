# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)




import Pact from 'pact-lang-api';
import React, { Component } from 'react'





// ██╗░░██╗  ░░░░░░  ░██╗░░░░░░░██╗░█████╗░██╗░░░░░██╗░░░░░███████╗████████╗
// ╚██╗██╔╝  ░░░░░░  ░██║░░██╗░░██║██╔══██╗██║░░░░░██║░░░░░██╔════╝╚══██╔══╝
// ░╚███╔╝░  █████╗  ░╚██╗████╗██╔╝███████║██║░░░░░██║░░░░░█████╗░░░░░██║░░░
// ░██╔██╗░  ╚════╝  ░░████╔═████║░██╔══██║██║░░░░░██║░░░░░██╔══╝░░░░░██║░░░
// ██╔╝╚██╗  ░░░░░░  ░░╚██╔╝░╚██╔╝░██║░░██║███████╗███████╗███████╗░░░██║░░░
// ╚═╝░░╚═╝  ░░░░░░  ░░░╚═╝░░░╚═╝░░╚═╝░░╚═╝╚══════╝╚══════╝╚══════╝░░░╚═╝░░░


const Index = () => {

  const NETWORK_ID = "testnet04";
  const GAS_PRICE = 0.0000001;
  const GAS_LIMIT = 15000;
  const TTL = 28000;
  const CHAIN_ID = "1";
  const creationTime = () => Math.round((new Date()).getTime() / 1000) - 15;
  const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
  const { kadena } = window;
  const a = "k:057644c6dc3da0b6e5c695508afd24198171577802fcaaa351ae77bc0f2244c1"
  const b = "demobankacc6"
  const GAS_STATION = 'election-gas-station';

  const get_token = async () => {
    window.kadena.request({
      method: 'kda_connect',
      networkId: NETWORK_ID,
    });
    const signTx = async () => {
      const cmd = {
        networkId: NETWORK_ID,
      pactCode: `(free.passtest5.create-collection "col5" "pp" 150 free.policytest5 (read-keyset "guard") "k:c1d0eb761e0faf97d1d1082cd7a3b319b93ef2d2aac7952a24cccbafbdf0779d" (read-msg "token"))`,
        // pactCode:`(free.passtest5.mint-bulk-pass  ${JSON.stringify(a)} (read-keyset "demothreeaccount-keyset") 1.0 "col4" 1)`,
        caps:[
          Pact.lang.mkCap(
            "GAS",
            "Capability to allow buying gas",
            "coin.GAS",
            []
          ),
          Pact.lang.mkCap("PRIVATE",
           "Capability for owner", "free.passtest5.PRIVATE"),
           Pact.lang.mkCap(
            "Transfer",
            "Capability to allow coin transfer",
            "coin.TRANSFER",
            [a, b, 2.0]
          ),
          Pact.lang.mkCap("CREDIT",
           "Capability for owner", "free.passtest5.CREDIT",
            ["",a]),
          Pact.lang.mkCap("CREDIT",
            "Capability for owner", "free.passtest5.MINT-PASS",
             [a,1.0]),
          Pact.lang.mkCap("CREDIT_MERCH",
            "Capability for owner", "free.passtest5.CREDIT-MERCH",
             [a]),
          Pact.lang.mkCap("MERCH",
           "Capability for owner", "free.passtest5.MERCH",
            ["pfive-ks"])
        ],
        // envData: { "demothreeaccount-keyset": { keys: ["057644c6dc3da0b6e5c695508afd24198171577802fcaaa351ae77bc0f2244c1"], pred: "keys-all" } },
        envData:
          {
            "guard":{"keys": ["c1d0eb761e0faf97d1d1082cd7a3b319b93ef2d2aac7952a24cccbafbdf0779d"], "pred": "keys-all"},
            "token":
            {
             "id":"",
             "manifest":{
                "hash": 'lfvIJl_WhOSYHX8IIDS_ZFQDTTO5-RkFRIMPlVBq7ow',
                "data": [
                  {
                    "hash": 'GPN8DUaiaoDkiE5gxM7JZgTs6H2-FJyTfkxxU5cEobY',
                    "uri": {
                      "data": 'QmNfY9MeemyF1hFNpVj5gJDAmRgb9cRjfRwAjeDMnfJkpW',
                      "scheme": 'https://gateway.pinata.cloud/ipfs/'
                    },
                    "datum": {
                      "name": "fox.art",
                      "description" : "priority pass token",
                      "image": "https://gateway.pinata.cloud/ipfs/QmNfY9MeemyF1hFNpVj5gJDAmRgb9cRjfRwAjeDMnfJkpW",
                      }
                  }
                ],
                "uri": {
                  "data": 'QmNfY9MeemyF1hFNpVj5gJDAmRgb9cRjfRwAjeDMnfJkpW',
                  "scheme": 'https://gateway.pinata.cloud/ipfs/'
                }  } ,
             "precision": 0,
             "supply": 1.0       
             }
    },
        creationTime: creationTime(),
        ttl: TTL,
        gasLimit: GAS_LIMIT,
        chainId: CHAIN_ID,
        gasPrice: GAS_PRICE,
        sender: a,
      };
      
      return window.kadena.request({
        method: 'kda_requestSign',
        data: {
          networkId: NETWORK_ID,
          signingCmd: cmd,
        },
      });
    }

    const sendTx = async (signedCmd) => {
      return await Pact.wallet.sendSigned(signedCmd, API_HOST);
    }
    const cxx = await signTx(a, b)
    console.log(cxx.signedCmd)
    const requestKey =await sendTx(cxx.signedCmd);
    
    const listenTx =  await Pact.fetch.listen({ listen: requestKey.requestKeys[0]}, API_HOST);
    

  
  };
  return (
    <div>
      <button onClick={get_token}>Buy</button>
    </div>
  )
}
export default Index;