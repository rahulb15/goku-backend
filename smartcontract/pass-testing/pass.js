const Pact = require("pact-lang-api");
const NETWORK_ID = "testnet04";
const GAS_PRICE = 0.01111;
const GAS_LIMIT = 150000;
const TTL = 28000;
const CHAIN_ID = "1";
const creationTime = () => Math.round((new Date).getTime() / 1000) - 15;
const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
const KEY_PAIR = {
  publicKey: "260fe7bca08c45c03d4fc5f3d0a7fafaa8d28d4a3c3db0b2158dd18725ab0586",
  secretKey: "01faa327e37b1ec26b7adca1469e25ccd776e33776496edc860d3834aaeb0906"
}

const KP = {
    publicKey: "057644c6dc3da0b6e5c695508afd24198171577802fcaaa351ae77bc0f2244c1",
    secretKey: "e5b9aafbfafb4998ef3e2bfd5cc2671f6306258d34e4b8963ea9dea1e855884d"
    //secretKey: ""
  }
  const KPTWO = {
    publicKey: "fa48b2939c5b1770c9161f4eb9ccaddc73b18c6501243dd54697d757c1914934",
    secretKey: "a0c28907dce337e1d11042a4169615f5609be1204d847cdf68974f5c8a55df80"
  }
  const KPTHREE = {
    publicKey: "1722ce3844a7529ab36abfe6623508d775a8d21732f2231303efbcf188489989",
    secretKey: "743ae148240036448d9f80cf0f990ec454fc94bc188b24a92833d41cbcec8f3c"
  }
  const KPFOUR = {
    publicKey: "74bbe9e398f4c4a2abd0585aa33f79b40bbcfb31352d505a37f264533894f9b2",
    secretKey: "244e227911c4eec1e3897b623191cf9447bf429646d3fbc1024339dee2a0ffe0"
  }

//   const createUri = async (scheme,data) => 
//   {
//       const res = await Pact.fetch.local(
//         {
//           pactCode: `(kip.token-manifest.uri (read-string 'scheme) (read-string 'data))`,
//           envData: {scheme,data},
//           meta: Pact.lang.mkMeta("k:260fe7bca08c45c03d4fc5f3d0a7fafaa8d28d4a3c3db0b2158dd18725ab0586", "1", GAS_PRICE, GAS_LIMIT, creationTime(), 600),
//         },
//         `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`
//       );
//       const all = res.result.data;
//       createDatum(all);
//       return (all);    
// };

// const createDatum = async (uri,datum)=> {
//      const res = await Pact.fetch.local(
//        {
//          pactCode: `(kip.token-manifest.create-datum (read-msg 'uri) (read-msg 'datum))`,
//          envData: {uri,datum},
//          meta: Pact.lang.mkMeta("k:260fe7bca08c45c03d4fc5f3d0a7fafaa8d28d4a3c3db0b2158dd18725ab0586", "1", GAS_PRICE, GAS_LIMIT, creationTime(), 600),
//        },
//        `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`
//        );
//      const all = res.result.data;
//      const ary = [all];
//      createManifest(uri,ary);

//      return(all);
//  };

//  const createManifest = async (uri, data) => {

//     const res = await Pact.fetch.local(
//       {
//         pactCode: `(kip.token-manifest.create-manifest (read-msg 'uri) (read-msg 'data))`,
//         envData: {uri,data},
//         meta: Pact.lang.mkMeta("k:260fe7bca08c45c03d4fc5f3d0a7fafaa8d28d4a3c3db0b2158dd18725ab0586", "1", GAS_PRICE, GAS_LIMIT, creationTime(), 600),
//       },
//       `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`
//     );
//     const all = res.result.data;    
//     createCollection(all)
//     return(all);
// };

const createUri = async () => {
  const res = await Pact.fetch.local(
    {
      pactCode: `(kip.token-manifest.uri (read-string 'scheme) (read-string 'data))`,
      envData: { scheme:"https://gateway.pinata.cloud/ipfs/" ,data:"QmNfY9MeemyF1hFNpVj5gJDAmRgb9cRjfRwAjeDMnfJkpW"
      },
      meta: Pact.lang.mkMeta("k:260fe7bca08c45c03d4fc5f3d0a7fafaa8d28d4a3c3db0b2158dd18725ab0586", "1", GAS_PRICE, GAS_LIMIT, creationTime(), 600),
    },
    `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`
  );
  const all = res.result.data;
  createDatum(all);
  return (all);

  };

  const createDatum = async (uri)=> {
       const res = await Pact.fetch.local(
         {
           pactCode: `(kip.token-manifest.create-datum (read-msg 'uri) (read-msg 'datum))`,
           //pact-lang-api function to construct transaction meta data
           envData: {uri,
             datum: {
              "name": "fox.art",
              "description" : "priority pass token",
              "image": "https://gateway.pinata.cloud/ipfs/QmNfY9MeemyF1hFNpVj5gJDAmRgb9cRjfRwAjeDMnfJkpW",
              }},
           meta: Pact.lang.mkMeta("k:260fe7bca08c45c03d4fc5f3d0a7fafaa8d28d4a3c3db0b2158dd18725ab0586", "1", GAS_PRICE, GAS_LIMIT, creationTime(), 600),
         },
         `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`
         );
       const all = res.result.data;
       const ary = [all];
       createManifest(uri,ary);
 
       return(all);
   };

   const createManifest = async (uri, data) => {

      const res = await Pact.fetch.local(
        {
          pactCode: `(kip.token-manifest.create-manifest (read-msg 'uri) (read-msg 'data))`,
          envData: {uri,data},
          meta: Pact.lang.mkMeta("k:260fe7bca08c45c03d4fc5f3d0a7fafaa8d28d4a3c3db0b2158dd18725ab0586", "1", GAS_PRICE, GAS_LIMIT, creationTime(), 600),
        },
        `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`
      );
      const all = res.result.data;
      

      // createCollection(all);
      // createToken(all);
      // return(all);
  };

  // envData:


// async function createCollection(manifest)
// {
//   const p = 1
//  const pactCode = `(free.passtest10.create-collection "col5" "pp" 150 free.policytest5 (read-keyset "guard") "k:c1d0eb761e0faf97d1d1082cd7a3b319b93ef2d2aac7952a24cccbafbdf0779d" (read-msg "token"))`
//   const cmdObj = {
//     networkId: NETWORK_ID,
//     keyPairs: [
//       Object.assign(KEY_PAIR, {
//         clist: [
//           Pact.lang.mkCap(
//             "GAS",
//             "Capability to allow buying gas",
//             "coin.GAS",
//             []
//           ).cap,
//           Pact.lang.mkCap("MERCH",
//            "Capability for owner", "free.ptest5.MERCH",
//             ["pfive-ks"]).cap
//         ]
//       })
//     ],
//     // envData:
//     // {
//     //   "guard":{"keys": ["c1d0eb761e0faf97d1d1082cd7a3b319b93ef2d2aac7952a24cccbafbdf0779d"], "pred": "keys-all"},
//     //   "token":
//     //   {
//     //     "id":"",
//     //     "manifest": manifest,
//     //     "precision": 0,
//     //     "supply": 1.0       
//     //   }
//     // },
//     envData:{
//       manifest:{
//       hash: 'lfvIJl_WhOSYHX8IIDS_ZFQDTTO5-RkFRIMPlVBq7ow',
//       data: [
//         {
//           hash: 'GPN8DUaiaoDkiE5gxM7JZgTs6H2-FJyTfkxxU5cEobY',
//           uri: {
//             data: 'QmNfY9MeemyF1hFNpVj5gJDAmRgb9cRjfRwAjeDMnfJkpW',
//             scheme: 'https://gateway.pinata.cloud/ipfs/'
//           },
//           datum: {
//             "name": "fox.art",
//             "description" : "priority pass token",
//             "image": "https://gateway.pinata.cloud/ipfs/QmNfY9MeemyF1hFNpVj5gJDAmRgb9cRjfRwAjeDMnfJkpW",
//             }
//         }
//       ],
//       uri: {
//         data: 'QmNfY9MeemyF1hFNpVj5gJDAmRgb9cRjfRwAjeDMnfJkpW',
//         scheme: 'https://gateway.pinata.cloud/ipfs/'
//       }  } 
//     },
//     pactCode: pactCode,
//     meta: {
//       creationTime: creationTime(),
//       ttl: 28000,
//       gasLimit: 150000,
//       chainId: CHAIN_ID,
//       gasPrice: 0.0000001,
//       sender:"k:" + KEY_PAIR.publicKey
//     }
//   };
//   const response = await Pact.fetch.send(cmdObj, API_HOST);
//   
//   const txResult = await Pact.fetch.listen({ listen: response.requestKeys[0] }, API_HOST);
//   
//   //getTxStatus(gore)
// }

async function getcollection()
{
  const pactCode = `(free.policytest10.get-collection "pcol1")`
  const cmdObj = {
    networkId: NETWORK_ID,
    keyPairs: [
      Object.assign(KEY_PAIR, {
        clist: [
          Pact.lang.mkCap(
            "GAS",
            "Capability to allow buying gas",
            "coin.GAS",
            []
          ).cap,
          Pact.lang.mkCap("MERCH",
           "Capability for owner", "free.policytest10.MERCH",
            ["ppten-ks"]).cap
        ]
      })
    ],
    pactCode: pactCode,
    meta: {
      creationTime: creationTime(),
      ttl: 28000,
      gasLimit: 150000,
      chainId: CHAIN_ID,
      gasPrice: 0.0000001,
      sender:"k:" + KEY_PAIR.publicKey
    }
  };
  const response = await Pact.fetch.send(cmdObj, API_HOST);
  
  const txResult = await Pact.fetch.listen({ listen: response.requestKeys[0] }, API_HOST);
  
  
  



}

async function getminted()
{
  const pactCode = `(free.policytest10.get-minted)`

  const cmdObj = {
    networkId: NETWORK_ID,
    keyPairs: [
      Object.assign(KEY_PAIR, {
        clist: [
          Pact.lang.mkCap(
            "GAS",
            "Capability to allow buying gas",
            "coin.GAS",
            []
          ).cap,
          Pact.lang.mkCap("MERCH",
           "Capability for owner", "free.policytest10.DUMMPPOLICY",
            ["ppten-ks"]).cap
        ]
      })
    ],    
    pactCode: pactCode,
    meta: {
      creationTime: creationTime(),
      ttl: 28000,
      gasLimit: 150000,
      chainId: CHAIN_ID,
      gasPrice: 0.0000001,
      sender:"k:" + KEY_PAIR.publicKey
    }
  };
  const response = await Pact.fetch.send(cmdObj, API_HOST);
  
  const txResult = await Pact.fetch.listen({ listen: response.requestKeys[0] }, API_HOST);
  
}

async function createToken (manifest)
{
   const pactCode = `(free.passtest10.create-token "dummypasssix:OnaCvrAsM53g1QOVaAFkw6DcGpQ6vWYn6tBL8stUFSA" 0 (read-msg "manifest")  free.policytest10 "dummypasssix")`  
  const cmdObj = {
    networkId: NETWORK_ID,
    keyPairs: [
      Object.assign(KEY_PAIR, {
        clist: [
          Pact.lang.mkCap(
            "GAS",
            "Capability to allow buying gas",
            "coin.GAS",
            []
          ).cap,
          Pact.lang.mkCap("MERCH",
           "Capability for owner", "free.passtest10.MERCH",
            ["ppten-ks"]).cap
        ]
      })
    ],
    envData:
    {
        "manifest": manifest,
      },
    
    pactCode: pactCode,
    meta: {
      creationTime: creationTime(),
      ttl: 28000,
      gasLimit: 150000,
      chainId: CHAIN_ID,
      gasPrice: 0.0000001,
      sender:"k:" + KEY_PAIR.publicKey
    }
  };
  
  const response = await Pact.fetch.send(cmdObj, API_HOST);
  
  const txResult = await Pact.fetch.listen({ listen: response.requestKeys[0] }, API_HOST);
  


}

async function getprice()
{
  const pactCode = `(free.policytest10.get-price)`

  const cmdObj = {
    networkId: NETWORK_ID,
    keyPairs: [
      Object.assign(KEY_PAIR, {
        clist: [
          Pact.lang.mkCap(
            "GAS",
            "Capability to allow buying gas",
            "coin.GAS",
            []
          ).cap,
          Pact.lang.mkCap("MERCH",
           "Capability for owner", "free.policytest10.DUMMPPOLICY",
            ["ppten-ks"]).cap
        ]
      })
    ],    
    pactCode: pactCode,
    meta: {
      creationTime: creationTime(),
      ttl: 28000,
      gasLimit: 150000,
      chainId: CHAIN_ID,
      gasPrice: 0.0000001,
      sender:"k:" + KEY_PAIR.publicKey
    }
  };
  const response = await Pact.fetch.send(cmdObj, API_HOST);
  
  const txResult = await Pact.fetch.listen({ listen: response.requestKeys[0] }, API_HOST);
  
}


async function getTokenOwner()
{
  const pactCode = `(free.policytest10.get-tokens-owned "k:260fe7bca08c45c03d4fc5f3d0a7fafaa8d28d4a3c3db0b2158dd18725ab0586")`

  const cmdObj = {
    networkId: NETWORK_ID,
    keyPairs: [
      Object.assign(KEY_PAIR, {
        clist: [
          Pact.lang.mkCap(
            "GAS",
            "Capability to allow buying gas",
            "coin.GAS",
            []
          ).cap,
          Pact.lang.mkCap("MERCH",
           "Capability for owner", "free.policytest10.DUMMPPOLICY",
            ["ppten-ks"]).cap
        ]
      })
    ],    
    pactCode: pactCode,
    meta: {
      creationTime: creationTime(),
      ttl: 28000,
      gasLimit: 150000,
      chainId: CHAIN_ID,
      gasPrice: 0.0000001,
      sender:"k:" + KEY_PAIR.publicKey
    }
  };
  const response = await Pact.fetch.send(cmdObj, API_HOST);
  
  const txResult = await Pact.fetch.listen({ listen: response.requestKeys[0] }, API_HOST);
  


}

async function getOwner()
{
  const pactCode = `(free.policytest10.get-owner "demopass:ypHr-r69c8ux1DcBn5RZiuX5oWYELwidXDnxNL9VT5I")`

  const cmdObj = {
    networkId: NETWORK_ID,
    keyPairs: [
      Object.assign(KEY_PAIR, {
        clist: [
          Pact.lang.mkCap(
            "GAS",
            "Capability to allow buying gas",
            "coin.GAS",
            []
          ).cap,
          Pact.lang.mkCap("MERCH",
           "Capability for owner", "free.policytest10.DUMMPPOLICY",
            ["ppten-ks"]).cap
        ]
      })
    ],    
    pactCode: pactCode,
    meta: {
      creationTime: creationTime(),
      ttl: 28000,
      gasLimit: 150000,
      chainId: CHAIN_ID,
      gasPrice: 0.0000001,
      sender:"k:" + KEY_PAIR.publicKey
    }
  };
  const response = await Pact.fetch.send(cmdObj, API_HOST);
  
  const txResult = await Pact.fetch.listen({ listen: response.requestKeys[0] }, API_HOST);
  


}

async function mintPass()
{
  const a = "k:fa48b2939c5b1770c9161f4eb9ccaddc73b18c6501243dd54697d757c1914934"
  // const a = "k:1722ce3844a7529ab36abfe6623508d775a8d21732f2231303efbcf188489989"
  const b = "passdemoacc10"
  const pactCode = `(free.policytest10.mint-pass  ${JSON.stringify(a)} (read-keyset "demothreeaccount-keyset") 1.0 "pcol1" 1)`
  
  const cmdObj = {
    networkId: NETWORK_ID,
    keyPairs: [
      Object.assign(KPTWO, {
        clist: [
          Pact.lang.mkCap(
            "GAS",
            "Capability to allow buying gas",
            "coin.GAS",
            []
          ).cap,
          Pact.lang.mkCap("PRIVATE",
           "Capability for owner", "free.policytest10.PRIVATE").cap,
           Pact.lang.mkCap(
            "Transfer",
            "Capability to allow coin transfer",
            "coin.TRANSFER",
            [a, b, 2.0]
          ).cap, 
          Pact.lang.mkCap("CREDIT",
           "Capability for owner", "free.policytest10.CREDIT",
            ["",a]).cap,
          Pact.lang.mkCap("CREDIT",
            "Capability for owner", "free.policytest10.MINT-PASS",
             [a,1.0]).cap,
          Pact.lang.mkCap("CREDIT_MERCH",
            "Capability for owner", "free.policytest10.CREDIT-MERCH",
             [a]).cap,
          Pact.lang.mkCap("MERCH",
           "Capability for owner", "free.policytest10.DUMMPPOLICY",
            ["ppten-ks"]).cap
        ]
      })
    ],
    envData:
    {
      "demothreeaccount-keyset":{ keys:["fa48b2939c5b1770c9161f4eb9ccaddc73b18c6501243dd54697d757c1914934"],
                                    pred:"keys-all"}  ,

    },
    pactCode: pactCode,
    meta: {
      creationTime: creationTime(),
      ttl: 28000,
      gasLimit: 150000,
      chainId: CHAIN_ID,
      gasPrice: 0.0000001,
      sender:"k:" + KPTWO.publicKey
    }
  };
  const response = await Pact.fetch.send(cmdObj, API_HOST);
  
  const txResult = await Pact.fetch.listen({ listen: response.requestKeys[0] }, API_HOST);
  

}
// const pactCode = `(free.passtest10.mint-bulk-pass
//   ${JSON.stringify(userWallet)}
//   (read-keyset "keySet")
//   1.0
//   "dummypassix"
//   1
// )`
// async funtgion  getTokenGuard()
// {
//   const pactCode = `(coin.details)`
// }
async function mintPasstwo()
{
  const a = "k:fa48b2939c5b1770c9161f4eb9ccaddc73b18c6501243dd54697d757c1914934"
  // const a = "k:1722ce3844a7529ab36abfe6623508d775a8d21732f2231303efbcf188489989"
  // const b = "passdemoacc10"
  const b = "passdemoacc10"

  // adminsixaccount
  const pactCode = `(free.passtest10.mint-bulk-pass  ${JSON.stringify(a)} (read-keyset "demothreeaccount-keyset") 1.0 "pcol1" 1)`
  
  const cmdObj = {
    networkId: NETWORK_ID,
    keyPairs: [
      Object.assign(KPTWO, {
        clist: [
          Pact.lang.mkCap(
            "GAS",
            "Capability to allow buying gas",
            "coin.GAS",
            []
          ).cap,
          Pact.lang.mkCap("PRIVATE",
           "Capability for owner", "free.passtest10.PRIVATE").cap,
           Pact.lang.mkCap(
            "Transfer",
            "Capability to allow coin transfer",
            "coin.TRANSFER",
            [a, b, 2.0]
          ).cap, 
          Pact.lang.mkCap("CREDIT",
           "Capability for owner", "free.passtest10.CREDIT",
            ["dummypasssix:OnaCvrAsM53g1QOVaAFkw6DcGpQ6vWYn6tBL8stUFSA",a]).cap,
          Pact.lang.mkCap("CREDIT",
            "Capability for owner", "free.passtest10.MINT-PASS",
             [a,1.0]).cap,
          Pact.lang.mkCap("CREDIT_MERCH",
            "Capability for owner", "free.passtest10.CREDIT-MERCH",
             [a]).cap,
          Pact.lang.mkCap("MERCH",
           "Capability for owner", "free.passtest10.DUMMPPOLICY",
            ["ppten-ks"]).cap
        ]
      })
    ],
    envData:
    {
      "demothreeaccount-keyset":{ keys:["fa48b2939c5b1770c9161f4eb9ccaddc73b18c6501243dd54697d757c1914934"],
                                    pred:"keys-all"}  ,

    },
    pactCode: pactCode,
    meta: {
      creationTime: creationTime(),
      ttl: 28000,
      gasLimit: 150000,
      chainId: CHAIN_ID,
      gasPrice: 0.0000001,
      sender:"k:" + KPTWO.publicKey
      // sender:"k:fa48b2939c5b1770c9161f4eb9ccaddc73b18c6501243dd54697d757c1914934"
    }
  };
  const response = await Pact.fetch.send(cmdObj, API_HOST);
  
  const txResult = await Pact.fetch.listen({ listen: response.requestKeys[0] }, API_HOST);
  

}

async function getaccountbalance()
{
  // const pactCode = `(coin.get-balance ${JSON.stringify("k:fa48b2939c5b1770c9161f4eb9ccaddc73b18c6501243dd54697d757c1914934")})`
  const pactCode = `(coin.get-balance ${JSON.stringify("demobankacc6")})`
  // const pactCode = `(coin.get-balance ${JSON.stringify("k:260fe7bca08c45c03d4fc5f3d0a7fafaa8d28d4a3c3db0b2158dd18725ab0586")})`
    
    const cmdObj = {
        networkId: NETWORK_ID,
        keyPairs: KEY_PAIR,
        pactCode:pactCode,
        envData: { 
          },
       meta: {
        creationTime: creationTime(),
        ttl: 28000,
        gasLimit: 150000,
        chainId: CHAIN_ID,
        gasPrice: 0.0000001,
        sender: "k:"+ KEY_PAIR.publicKey
      }

    }
    const result = await Pact.fetch.local(cmdObj, API_HOST);
    
}

async function getpassbalance()
{
    const pactCode = `(free.passtest10.get-passbalance ${JSON.stringify("k:260fe7bca08c45c03d4fc5f3d0a7fafaa8d28d4a3c3db0b2158dd18725ab0586")})`

    const cmdObj = {
        networkId: NETWORK_ID,
        keyPairs: KEY_PAIR,
        pactCode:pactCode,
        envData: { 
          },
       meta: {
        creationTime: creationTime(),
        ttl: 28000,
        gasLimit: 150000,
        chainId: CHAIN_ID,
        gasPrice: 0.0000001,
        sender: "k:"+ KEY_PAIR.publicKey
      }

    }
    const result = await Pact.fetch.local(cmdObj, API_HOST);
    


}

  async function getTxStatus(requestKey) 
  {
    const txResult = await Pact.fetch.listen({ listen: requestKey }, API_HOST);
    
  }



// getpassbalance();
// getaccountbalance();
// buypass();
// getTxStatus("XNCJ-9S4_j4wJzOd1lNvcV31Qcvkh20QJMOhv5we00U");
//details();
// getcollection();
// createUri();
//createCollection();
// getTokenUri();
// mintPass();
// mintPasstwo(); 
// getprice();
// getOwner();
// getTokenOwner();
// getminted();

