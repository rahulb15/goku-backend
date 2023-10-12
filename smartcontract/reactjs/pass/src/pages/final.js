import Pact from 'pact-lang-api';
import React, { Component } from 'react';
const yourObject = require('./mynewfile4.json');
// var fs = require('fs');




// ██╗░░██╗  ░░░░░░  ░██╗░░░░░░░██╗░█████╗░██╗░░░░░██╗░░░░░███████╗████████╗
// ╚██╗██╔╝  ░░░░░░  ░██║░░██╗░░██║██╔══██╗██║░░░░░██║░░░░░██╔════╝╚══██╔══╝
// ░╚███╔╝░  █████╗  ░╚██╗████╗██╔╝███████║██║░░░░░██║░░░░░█████╗░░░░░██║░░░
// ░██╔██╗░  ╚════╝  ░░████╔═████║░██╔══██║██║░░░░░██║░░░░░██╔══╝░░░░░██║░░░
// ██╔╝╚██╗  ░░░░░░  ░░╚██╔╝░╚██╔╝░██║░░██║███████╗███████╗███████╗░░░██║░░░
// ╚═╝░░╚═╝  ░░░░░░  ░░░╚═╝░░░╚═╝░░╚═╝░░╚═╝╚══════╝╚══════╝╚══════╝░░░╚═╝░░░


const Index = () => {

  // const NETWORK_ID = "mainnet01";
  const NETWORK_ID = "testnet04";
  const GAS_PRICE = 0.0000001;
  const GAS_LIMIT = 150000;
  const TTL = 28000;
  const CHAIN_ID = "1";
  // const CHAIN_ID = "8";
  const creationTime = () => Math.round((new Date()).getTime() / 1000) - 15;
  // const API_HOST = `https://api.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
  const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
  const { kadena } = window;
  const GAS_STATION = 'election-gas-station';
  const tokenId = "collectionTwo:cGh8X7-CjXKxmQPOqSaVnNJ1tu94HzF6B_dfDsLUe7w";
  const tokenId2= "dbc1:cppmf1PfbMY62lJXF-McanHli_T8-WJMQSirNJllp5w";
  const tokenId3 = "pass:CIkngaTIu66eNfTupOj19-4IVkZ5EHWskK1754krsnA";
  const imageUrl = "https://gateway.pinata.cloud/ipfs/a5hfjr"

  /**
 *                                  PASS-FUNCTIONS
 */

  const mint_pass = async () => {
    const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
    const accountName1="k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf"

    const publicKey=accountName.slice(2, accountName.length);
    const publicKey1=accountName1.slice(2, accountName1.length);
    
    console.log("publicKeycw",publicKey)
    console.log("accountnamecw",accountName)
    const guard={ keys: [publicKey],pred: "keys-all",}
    const guard1={ keys: [publicKey1],pred: "keys-all",}


    const a = accountName1
    const b = "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"

    const pactCode=`(free.passfinal001.mint-pass ${JSON.stringify(a)} (read-keyset "guard") 1.0 "pass" 1)`
     const signCmd = {
      pactCode:pactCode,
     caps:[
         Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
         Pact.lang.mkCap("MERCH","Capability for owner", "free.passfinal001.PASS"),
         Pact.lang.mkCap("Transfer","Capability to allow coin transfer","coin.TRANSFER",
            [a, b, 2.0]
          ), 
        Pact.lang.mkCap("MINT-PASS","Capability for owner", "free.passfinal001.MINT-PASS",
             [a,1.0]),
        ]
         ,
     sender: a,
     gasLimit: 150000,
     chainId: CHAIN_ID,
     ttl: 28800,
     envData:
         {
          "guard":guard1 
         },
       }; //alert to sign tx
     
     const cmd = await Pact.wallet.sign(signCmd);
     
     
     const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
         "Content-Type": "application/json",
       },
       method: "POST",
       body: JSON.stringify(cmd),});
         
         const rawRes = await localRes;
         const resJSON = await rawRes.json();
         console.log("rawraw",resJSON)
         if(resJSON.result.status==="success"){
 
           const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
         
         
        const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
          console.log(signedtxx, "xxxxxxxxxxxxxx")
         }

  }
 
  const create_col_pass = async () => {
    const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
    const publicKey=accountName.slice(2, accountName.length);
    console.log("publicKeycw",publicKey)
    console.log("accountnamecw",accountName)
    const guard={ keys: [publicKey],pred: "keys-all",}

    const a = accountName
    const b = "passdemoacc15"
    const c = "pass"
    const d = "p1"


   
   const pactCode=`(free.passfinal001.create-collection  "pass" "p1" 25 free.passfinalpolicy001 (read-keyset "guard") ${JSON.stringify(a)}   
    [ 
    "8bcd304cbd756d4fb23b309a148e889912f639437f8720f34dafe0fc6709fe2b",
    "f0503df1efa32ed4492b860ce644cdcca97ace92f1ba4f8accc8edfb2284f77c",
    "2419988d9431ba5003a0c0277dc91998abb0e351a52f9f74f20ffac00fc1cdf3",
    "1ce8c22680dc0e1e9d9966537c448181c4bb3d6354d448f9e4a95959205805bc",
    "a11d9b094ce3e8c7415f414861ec7b83a9dcd5d9145d1a150d3f458ea0c9f403",
    "8e93c264baf8a799d83d5450cf058cc1a480735fd4d34926557c77d950cf824b",
    "1c8f42df218291e65dd3a0ad4371aeb10ea1863cb1c3cc4a831b228bb568e86f",
    "deb6f1a56f0c070e259ec8c8f17dcadbec2a7f7f38574140c82b430f4d9e870d",
    "318e7ce7cca7f32b34b41aad70f03e0180ba9050ec64a8fee5b68d002c2418a9",
    "188564c01e241fa2e3d985a2e0ecbb88b2082521f80a296fe654caa7fef61182",
    "ae61726eb824d8e78deca1853fd8b2f38ebf0cbe95abbd8c53244791e82d962b",
    "ab0ef2376156f109067f78d83158af0a752cb0f2111fcf0c26c5561050ad2e48",
    "6d1e47662651d2317a2f955344b1ef249fffce8a30690135237cddeaa35fead5",
    "672d9b6bd54f446d6128715b929833d0be9dc62bd6639b3455d0e09a2648aefe",
    "58a55390c8b781fe4c9fc8ac966f1aafc385bb5bd49a97db5221920cc9bf04ff",
    "b39038d4b894c764c68301cbf4a8ec0c9e1e576b760b104406452edfe0573ca0",
    "4417a360164bc9cfb32bef8521ebe210b593d035621ff0322dfedc4661a396b7",
    "ddf28b972a28a0d4ed9d6e1957d4a500d816d6fe274a8e86cd51b808952a7ebc",
    "0ab58866c202ebbb3f4ea7528d7883c0ba6d8f3e293fd06c7f284974112a87c6",
    "679c63b30dc299d5e3a58661953c377ad4cc23051140b513ed6366dabb10c749",
    "92f4a228fdf0f088b3cfeed448ea66e5de3eda1a849a4269bad03623d5edc63e",
    "20b55b1d18d66f1b04147f65a728213b630714eeb02f4911e8032c01dba6225c",
    "af87e042fb6b7a566aaf0816e711768073253d68e26792175c66d845dff6e443",
    "5166d6f28bd2670b4416ae465b091e304c231efe2f98cb5085b894182f16d912",
    "55de86df05261add7e432cfd9dd44267761d22de34804731d64fffd5c6452721"])`
    const signCmd = {
     pactCode:pactCode,
    caps:[
        Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
        Pact.lang.mkCap("COLLECTION-CREATED","Collection created","free.passfinal001.CREATE-COLLECTION",[c, d]),
        Pact.lang.mkCap("PASS","Capability for owner", "free.passfinal001.PASS")]
        // Pact.lang.mkCap("Transfer","Capability to allow coin transfer","coin.TRANSFER",[a, b, 5.0])
        ,
    sender: a,
    gasLimit: 150000,
    chainId: CHAIN_ID,
    ttl: 28800,
    envData:
        {
         "guard":guard 
        },
      }; //alert to sign tx
    
    const cmd = await Pact.wallet.sign(signCmd);
    
    
    const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(cmd),});
        
        const rawRes = await localRes;
        const resJSON = await rawRes.json();
        console.log("rawraw",resJSON)
        if(resJSON.result.status==="success"){

          const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
        
        
       const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
         console.log(signedtxx, "xxxxxxxxxxxxxx")
        }
  };

const getPassBalance = async () => {

    const accountName1="k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf"
    const publicKey1=accountName1.slice(2, accountName1.length);
    const guard1={ keys: [publicKey1],pred: "keys-all",}

    const a = accountName1

    const pactCode=`(free.passfinal001.get-passbalance ${JSON.stringify(a)})`
     const signCmd = {
      pactCode:pactCode,
     caps:[
         Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
        ]
         ,
     sender: a,
     gasLimit: 150000,
     chainId: CHAIN_ID,
     ttl: 28800,
     envData:
         {
          "guard":guard1 
         },
       }; //alert to sign tx
     
     const cmd = await Pact.wallet.sign(signCmd);
     
     
     const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
         "Content-Type": "application/json",
       },
       method: "POST",
       body: JSON.stringify(cmd),});
         
         const rawRes = await localRes;
         const resJSON = await rawRes.json();
         console.log("rawraw",resJSON)
         if(resJSON.result.status==="success"){
 
           const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
         
         
        const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
          console.log(signedtxx, "xxxxxxxxxxxxxx")
         }

}

const getPassOwner = async () => {

  const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const publicKey1=accountName1.slice(2, accountName1.length);
  const guard1={ keys: [publicKey1],pred: "keys-all",}

  const a = accountName1
  const b = "pass:uwYMMSAJ4zPLkfYLr1YHM7uMpUDsl54CD5BQ4UOJuCI"

  const pactCode=`(free.passfinalpolicy001.get-owner ${JSON.stringify(b)})`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard1 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const getPassOwned = async () => {

  const accountName1="k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf"
  const publicKey1=accountName1.slice(2, accountName1.length);
  const guard1={ keys: [publicKey1],pred: "keys-all",}

  const a = accountName1
  // const b = ""

  const pactCode=`(free.passfinalpolicy001.get-tokens-owned ${JSON.stringify(a)})`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard1 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const getPassPrice = async () => {

  const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const publicKey1=accountName1.slice(2, accountName1.length);
  const guard1={ keys: [publicKey1],pred: "keys-all",}

  const a = accountName1
  // const b = ""

  const pactCode=`(free.passfinalpolicy001.get-price)`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard1 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const getPassMinted= async () => {

  const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const publicKey1=accountName1.slice(2, accountName1.length);
  const guard1={ keys: [publicKey1],pred: "keys-all",}

  const a = accountName1
  // const b = ""

  const pactCode=`(free.passfinalpolicy001.get-minted)`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard1 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const getAccountMinted= async () => {

  const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const publicKey1=accountName1.slice(2, accountName1.length);
  const guard1={ keys: [publicKey1],pred: "keys-all",}

  const a = accountName1
  // const b = ""

  const pactCode=`(free.passfinalpolicy001.get-account-minted ${JSON.stringify(a)} )`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard1 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const getPassTokensRemaining= async () => {

  const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const publicKey1=accountName1.slice(2, accountName1.length);
  const guard1={ keys: [publicKey1],pred: "keys-all",}

  const a = accountName1
  // const b = ""

  const pactCode=`(free.passfinalpolicy001.get-current-length )`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard1 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const getPassOnwers= async () => {

  const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const publicKey1=accountName1.slice(2, accountName1.length);
  const guard1={ keys: [publicKey1],pred: "keys-all",}

  const a = accountName1
  // const b = ""

  const pactCode=`(free.passfinal001.get-priority-users)`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard1 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

/*
 *                                  DBC-FUNCTIONS
 */

const mint_cooper = async () => {
  const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
  const accountName1="k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf"

  const publicKey=accountName.slice(2, accountName.length);
  const publicKey1=accountName1.slice(2, accountName1.length);

  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}
  const guard1={ keys: [publicKey1],pred: "keys-all",}


  const a = accountName1
  const b = "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"

  const pactCode=`(free.dbcfinal001.mint-cooper ${JSON.stringify(a)} (read-keyset "guard") 1.0 "dbc1" 1)`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("MERCH","Capability for owner", "free.dbcfinal001.COOPER"),
       Pact.lang.mkCap("Transfer","Capability to allow coin transfer","coin.TRANSFER",
          [a, b, 1.0]
        ), 
      Pact.lang.mkCap("MINT-COOPER","Capability for owner", "free.dbcfinal001.MINT-COOPER",
           [a,1.0]),
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard1 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const mint_cooper_wl = async () => {
  const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
  const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"

  const publicKey=accountName.slice(2, accountName.length);
  const publicKey1=accountName1.slice(2, accountName1.length);

  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}
  const guard1={ keys: [publicKey1],pred: "keys-all",}


  const a = accountName1
  const b = "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"

  const pactCode=`(free.dbcfinal001.mint-cooper ${JSON.stringify(a)} (read-keyset "guard") 1.0 "dbc1" 1)`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("MERCH","Capability for owner", "free.dbcfinal001.COOPER"),
       Pact.lang.mkCap("Transfer","Capability to allow coin transfer","coin.TRANSFER",
          [a, b, 1.0]
        ), 
      Pact.lang.mkCap("MINT-COOPER","Capability for owner", "free.dbcfinal001.MINT-COOPER",
           [a,1.0]),
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard1 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const mint_cooper_public = async () => {
  const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
  const accountName1="k:c1d0eb761e0faf97d1d1082cd7a3b319b93ef2d2aac7952a24cccbafbdf0779d"

  const publicKey=accountName.slice(2, accountName.length);
  const publicKey1=accountName1.slice(2, accountName1.length);

  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}
  const guard1={ keys: [publicKey1],pred: "keys-all",}


  const a = accountName1
  const b = "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"

  const pactCode=`(free.dbcfinal001.mint-cooper ${JSON.stringify(a)} (read-keyset "guard") 1.0 "dbc1" 1)`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("MERCH","Capability for owner", "free.dbcfinal001.COOPER"),
       Pact.lang.mkCap("Transfer","Capability to allow coin transfer","coin.TRANSFER",
          [a, b, 2.0]
        ), 
      Pact.lang.mkCap("MINT-COOPER","Capability for owner", "free.dbcfinal001.MINT-COOPER",
           [a,1.0]),
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard1 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const mint_cooper_admin = async () => {
  const accountName="k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"
  // const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"

  const publicKey=accountName.slice(2, accountName.length);
  // const publicKey1=accountName1.slice(2, accountName1.length);

  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}
  // const guard1={ keys: [publicKey1],pred: "keys-all",}


  const a = accountName
  // const b = "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"

  const pactCode=`(free.dbcfinal001.mint-cooper ${JSON.stringify(a)} (read-keyset "guard") 1.0 "dbc1" 1)`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("MERCH","Capability for owner", "free.dbcfinal001.COOPER"),

      Pact.lang.mkCap("MINT-COOPER","Capability for owner", "free.dbcfinal001.MINT-COOPER",
           [a,1.0]),
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const create_col_dbc = async () => {
  const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName


 
 const pactCode=`(free.dbcfinal001.create-collection  "dbc1" "dbc1" 25 free.dbcfinalpolicy001 (read-keyset "guard") ${JSON.stringify(a)}   
  [ 
  "8bcd304cbd756d4fb23b309a148e889912f639437f8720f34dafe0fc6709fe2b",
  "f0503df1efa32ed4492b860ce644cdcca97ace92f1ba4f8accc8edfb2284f77c",
  "2419988d9431ba5003a0c0277dc91998abb0e351a52f9f74f20ffac00fc1cdf3",
  "1ce8c22680dc0e1e9d9966537c448181c4bb3d6354d448f9e4a95959205805bc",
  "a11d9b094ce3e8c7415f414861ec7b83a9dcd5d9145d1a150d3f458ea0c9f403",
  "8e93c264baf8a799d83d5450cf058cc1a480735fd4d34926557c77d950cf824b",
  "1c8f42df218291e65dd3a0ad4371aeb10ea1863cb1c3cc4a831b228bb568e86f",
  "deb6f1a56f0c070e259ec8c8f17dcadbec2a7f7f38574140c82b430f4d9e870d",
  "318e7ce7cca7f32b34b41aad70f03e0180ba9050ec64a8fee5b68d002c2418a9",
  "188564c01e241fa2e3d985a2e0ecbb88b2082521f80a296fe654caa7fef61182",
  "ae61726eb824d8e78deca1853fd8b2f38ebf0cbe95abbd8c53244791e82d962b",
  "ab0ef2376156f109067f78d83158af0a752cb0f2111fcf0c26c5561050ad2e48",
  "6d1e47662651d2317a2f955344b1ef249fffce8a30690135237cddeaa35fead5",
  "672d9b6bd54f446d6128715b929833d0be9dc62bd6639b3455d0e09a2648aefe",
  "58a55390c8b781fe4c9fc8ac966f1aafc385bb5bd49a97db5221920cc9bf04ff",
  "b39038d4b894c764c68301cbf4a8ec0c9e1e576b760b104406452edfe0573ca0",
  "4417a360164bc9cfb32bef8521ebe210b593d035621ff0322dfedc4661a396b7",
  "ddf28b972a28a0d4ed9d6e1957d4a500d816d6fe274a8e86cd51b808952a7ebc",
  "0ab58866c202ebbb3f4ea7528d7883c0ba6d8f3e293fd06c7f284974112a87c6",
  "679c63b30dc299d5e3a58661953c377ad4cc23051140b513ed6366dabb10c749",
  "92f4a228fdf0f088b3cfeed448ea66e5de3eda1a849a4269bad03623d5edc63e",
  "20b55b1d18d66f1b04147f65a728213b630714eeb02f4911e8032c01dba6225c",
  "af87e042fb6b7a566aaf0816e711768073253d68e26792175c66d845dff6e443",
  "5166d6f28bd2670b4416ae465b091e304c231efe2f98cb5085b894182f16d912",
  "55de86df05261add7e432cfd9dd44267761d22de34804731d64fffd5c6452721"])`
  const signCmd = {
   pactCode:pactCode,
  caps:[
      Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
      Pact.lang.mkCap("PASS","Capability for owner", "free.dbcfinal001.IS_ADMIN")]
      ,
  sender: a,
  gasLimit: 150000,
  chainId: CHAIN_ID,
  ttl: 28800,
  envData:
      {
       "guard":guard 
      },
    }; //alert to sign tx
  
  const cmd = await Pact.wallet.sign(signCmd);
  
  
  const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(cmd),});
      
      const rawRes = await localRes;
      const resJSON = await rawRes.json();
      console.log("rawraw",resJSON)
      if(resJSON.result.status==="success"){

        const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
      
      
     const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
       console.log(signedtxx, "xxxxxxxxxxxxxx")
      }
};


const getDBCOwner = async () => {

const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
const publicKey1=accountName1.slice(2, accountName1.length);
const guard1={ keys: [publicKey1],pred: "keys-all",}

const a = accountName1
const b = "dbc1:uwYMMSAJ4zPLkfYLr1YHM7uMpUDsl54CD5BQ4UOJuCI"

const pactCode=`(free.dbcfinalpolicy001.get-owner ${JSON.stringify(b)})`
 const signCmd = {
  pactCode:pactCode,
 caps:[
     Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
    ]
     ,
 sender: a,
 gasLimit: 150000,
 chainId: CHAIN_ID,
 ttl: 28800,
 envData:
     {
      "guard":guard1 
     },
   }; //alert to sign tx
 
 const cmd = await Pact.wallet.sign(signCmd);
 
 
 const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
     "Content-Type": "application/json",
   },
   method: "POST",
   body: JSON.stringify(cmd),});
     
     const rawRes = await localRes;
     const resJSON = await rawRes.json();
     console.log("rawraw",resJSON)
     if(resJSON.result.status==="success"){

       const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
     
     
    const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
      console.log(signedtxx, "xxxxxxxxxxxxxx")
     }

}

const getDBCOwned = async () => {

//   const accountName1="k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"
const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
//   const accountName1="k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf"

const publicKey1=accountName1.slice(2, accountName1.length);
const guard1={ keys: [publicKey1],pred: "keys-all",}

const a = accountName1
// const b = ""

const pactCode=`(free.dbcfinalpolicy001.get-tokens-owned ${JSON.stringify(a)})`
 const signCmd = {
  pactCode:pactCode,
 caps:[
     Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
    ]
     ,
 sender: a,
 gasLimit: 150000,
 chainId: CHAIN_ID,
 ttl: 28800,
 envData:
     {
      "guard":guard1 
     },
   }; //alert to sign tx
 
 const cmd = await Pact.wallet.sign(signCmd);
 
 
 const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
     "Content-Type": "application/json",
   },
   method: "POST",
   body: JSON.stringify(cmd),});
     
     const rawRes = await localRes;
     const resJSON = await rawRes.json();
     console.log("rawraw",resJSON)
     if(resJSON.result.status==="success"){

       const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
     
     
    const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
      console.log(signedtxx, "xxxxxxxxxxxxxx")
     }

}

const getPublicMintPrice = async () => {

const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
const publicKey1=accountName1.slice(2, accountName1.length);
const guard1={ keys: [publicKey1],pred: "keys-all",}

const a = accountName1
// const b = ""

const pactCode=`(free.dbcfinalpolicy001.get-nft-price)`
 const signCmd = {
  pactCode:pactCode,
 caps:[
     Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
    ]
     ,
 sender: a,
 gasLimit: 150000,
 chainId: CHAIN_ID,
 ttl: 28800,
 envData:
     {
      "guard":guard1 
     },
   }; //alert to sign tx
 
 const cmd = await Pact.wallet.sign(signCmd);
 
 
 const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
     "Content-Type": "application/json",
   },
   method: "POST",
   body: JSON.stringify(cmd),});
     
     const rawRes = await localRes;
     const resJSON = await rawRes.json();
     console.log("rawraw",resJSON)
     if(resJSON.result.status==="success"){

       const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
     
     
    const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
      console.log(signedtxx, "xxxxxxxxxxxxxx")
     }

}

const getWlMintPrice = async () => {

  const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const publicKey1=accountName1.slice(2, accountName1.length);
  const guard1={ keys: [publicKey1],pred: "keys-all",}
  
  const a = accountName1
  // const b = ""
  
  const pactCode=`(free.dbcfinalpolicy001.get-wl-price)`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard1 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){
  
         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }
  
  }

const getDBCMinted= async () => {

const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
const publicKey1=accountName1.slice(2, accountName1.length);
const guard1={ keys: [publicKey1],pred: "keys-all",}

const a = accountName1
// const b = ""

const pactCode=`(free.dbcfinalpolicy001.get-minted)`
 const signCmd = {
  pactCode:pactCode,
 caps:[
     Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
    ]
     ,
 sender: a,
 gasLimit: 150000,
 chainId: CHAIN_ID,
 ttl: 28800,
 envData:
     {
      "guard":guard1 
     },
   }; //alert to sign tx
 
 const cmd = await Pact.wallet.sign(signCmd);
 
 
 const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
     "Content-Type": "application/json",
   },
   method: "POST",
   body: JSON.stringify(cmd),});
     
     const rawRes = await localRes;
     const resJSON = await rawRes.json();
     console.log("rawraw",resJSON)
     if(resJSON.result.status==="success"){

       const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
     
     
    const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
      console.log(signedtxx, "xxxxxxxxxxxxxx")
     }

}

const getDBCAccountMinted= async () => {

const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
const publicKey1=accountName1.slice(2, accountName1.length);
const guard1={ keys: [publicKey1],pred: "keys-all",}

const a = accountName1
// const b = ""

const pactCode=`(free.dbcfinalpolicy001.get-account-minted ${JSON.stringify(a)} )`
 const signCmd = {
  pactCode:pactCode,
 caps:[
     Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
    ]
     ,
 sender: a,
 gasLimit: 150000,
 chainId: CHAIN_ID,
 ttl: 28800,
 envData:
     {
      "guard":guard1 
     },
   }; //alert to sign tx
 
 const cmd = await Pact.wallet.sign(signCmd);
 
 
 const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
     "Content-Type": "application/json",
   },
   method: "POST",
   body: JSON.stringify(cmd),});
     
     const rawRes = await localRes;
     const resJSON = await rawRes.json();
     console.log("rawraw",resJSON)
     if(resJSON.result.status==="success"){

       const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
     
     
    const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
      console.log(signedtxx, "xxxxxxxxxxxxxx")
     }

}

const getDBCTokensRemaining= async () => {

const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
const publicKey1=accountName1.slice(2, accountName1.length);
const guard1={ keys: [publicKey1],pred: "keys-all",}

const a = accountName1
// const b = ""

const pactCode=`(free.dbcfinalpolicy001.get-current-length )`
 const signCmd = {
  pactCode:pactCode,
 caps:[
     Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
    ]
     ,
 sender: a,
 gasLimit: 150000,
 chainId: CHAIN_ID,
 ttl: 28800,
 envData:
     {
      "guard":guard1 
     },
   }; //alert to sign tx
 
 const cmd = await Pact.wallet.sign(signCmd);
 
 
 const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
     "Content-Type": "application/json",
   },
   method: "POST",
   body: JSON.stringify(cmd),});
     
     const rawRes = await localRes;
     const resJSON = await rawRes.json();
     console.log("rawraw",resJSON)
     if(resJSON.result.status==="success"){

       const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
     
     
    const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
      console.log(signedtxx, "xxxxxxxxxxxxxx")
     }

}

const checkWhitelist= async () => {

  const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const publicKey1=accountName1.slice(2, accountName1.length);
  const guard1={ keys: [publicKey1],pred: "keys-all",}

  const a = accountName1
  // const b = ""

  const pactCode=`(free.dbcfinalpolicy001.check-whitelist)`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard1 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const checkPublic= async () => {

  const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const publicKey1=accountName1.slice(2, accountName1.length);
  const guard1={ keys: [publicKey1],pred: "keys-all",}

  const a = accountName1
  // const b = ""

  const pactCode=`(free.dbcfinalpolicy001.check-public)`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard1 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

/**
 *                                  MARKETPLACE-FUNCTIONS
 */

const openDirectSale = async () => {
  const accountName="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"

  const publicKey=accountName.slice(2, accountName.length);

  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName
  const b = "marketplacefinalacc002"

  const pactCode=`(free.marketplacefinal002.open-sale "pass" ${JSON.stringify(tokenId)}  ${JSON.stringify(a)} 2.0 0 3 false)`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("Transfer","Capability to allow  transfer","marmalade.ledger.TRANSFER",
          [tokenId,a,b,1.0]
        )
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}
const openForBidSale = async () => {
  const accountName="k:c1d0eb761e0faf97d1d1082cd7a3b319b93ef2d2aac7952a24cccbafbdf0779d"

  const publicKey=accountName.slice(2, accountName.length);

  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName
  const b = "marketplacefinalacc002"

  const pactCode=`(free.marketplacefinal002.open-sale "colone" ${JSON.stringify(tokenId)}  ${JSON.stringify(a)} 2.0 0 3 true)`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("Transfer","Capability to allow  transfer","marmalade.ledger.TRANSFER",
          [tokenId,a,b,1.0]
        )
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const buyIdOnSale = async () => {
  const accountName="k:c1d0eb761e0faf97d1d1082cd7a3b319b93ef2d2aac7952a24cccbafbdf0779d"
  const publicKey=accountName.slice(2, accountName.length);

  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  // (test-capability (pass.coin.TRANSFER "user2" "arya" 0.08))
  // (test-capability (pass.coin.TRANSFER "user2" "user" 1.96))

  const a = accountName
  const b = "k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const c = "marketplacefinalacc002"
  const pactCode=`(free.marketplacefinal002.buy ${JSON.stringify(tokenId)} ${JSON.stringify(a)})`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("Transfer","Capability to allow coin transfer","coin.TRANSFER",
          [a, c, 0.08]
        ), 
        Pact.lang.mkCap("Transfer","Capability to allow coin transfer","coin.TRANSFER",
        [a, b, 1.96]
      )
      ]
      //0.08 market place fee 
      //
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

 const get_royalty = async () => {

  const accountName="k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode = `(free.marketplacefinal002.get-royalty ${JSON.stringify(tokenId)})` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
        ]
        ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData: {
     "demothreeaccount-keyset":guard ,
   },
 };
 
 const cmd = await Pact.wallet.sign(signCmd);
 console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
 "Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});
 
 const rawRes = await localRes;
 const resJSON = await rawRes.json();
 console.log("rawraw",resJSON)
 if(resJSON.result.status==="success"){

   const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
 
 
const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
  console.log(signedtxx, "xxxxxxxxxxxxxx")
 }
 }

 const getAllIdOnSale = async () => {

  const accountName="k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode = `(free.marketplacefinal002.get-all-id-on-sale)` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
        ]
        ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData: {
     "demothreeaccount-keyset":guard ,
   },
 };
 
 const cmd = await Pact.wallet.sign(signCmd);
 console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
 "Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});
 
 const rawRes = await localRes;
 const resJSON = await rawRes.json();
 console.log("rawraw",resJSON)
 if(resJSON.result.status==="success"){

   const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
 
 
const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
  console.log(signedtxx, "xxxxxxxxxxxxxx")
 }
 }

 const getAllIdOnDirectSale = async () => {

  const accountName="k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode = `(free.marketplacefinal002.get-id-on-direct-sale)` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
        ]
        ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData: {
     "demothreeaccount-keyset":guard ,
   },
 };
 
 const cmd = await Pact.wallet.sign(signCmd);
 console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
 "Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});
 
 const rawRes = await localRes;
 const resJSON = await rawRes.json();
 console.log("rawraw",resJSON)
 if(resJSON.result.status==="success"){

   const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
 
 
const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
  console.log(signedtxx, "xxxxxxxxxxxxxx")
 }
 }
 const getAllIdOnAuction = async () => {

  const accountName="k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode = `(free.marketplacefinal002.get-id-on-auction)` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
        ]
        ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData: {
     "demothreeaccount-keyset":guard ,
   },
 };
 
 const cmd = await Pact.wallet.sign(signCmd);
 console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
 "Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});
 
 const rawRes = await localRes;
 const resJSON = await rawRes.json();
 console.log("rawraw",resJSON)
 if(resJSON.result.status==="success"){

   const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
 
 
const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
  console.log(signedtxx, "xxxxxxxxxxxxxx")
 }
 }

 const getSaleInfoById = async () => {

  const accountName="k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode = `(free.marketplacefinal002.get-sale ${JSON.stringify(tokenId2)})` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
        ]
        ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData: {
     "demothreeaccount-keyset":guard ,
   },
 };
 
 const cmd = await Pact.wallet.sign(signCmd);
 console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
 "Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});
 
 const rawRes = await localRes;
 const resJSON = await rawRes.json();
 console.log("rawraw",resJSON)
 if(resJSON.result.status==="success"){

   const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
 
 
const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
  console.log(signedtxx, "xxxxxxxxxxxxxx")
 }
 }

 const giftNft = async () => {

  const accountName = "k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf"//owner
  const receiver="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName
  const b = receiver

  const pactCode = `(free.marketplacefinal002.gift-nft ${JSON.stringify(tokenId3)} ${JSON.stringify(a)} ${JSON.stringify(b)})` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("TRANSFER","Capability to allow buying gas","free.marketplacefinal002.TRANSFER",[]),
        ]
        ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData: {
     "demothreeaccount-keyset":guard ,
   },
 };
 
 const cmd = await Pact.wallet.sign(signCmd);
 console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
 "Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});
 
 const rawRes = await localRes;
 const resJSON = await rawRes.json();
 console.log("rawraw",resJSON)
 if(resJSON.result.status==="success"){

   const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
 
 
const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
  console.log(signedtxx, "xxxxxxxxxxxxxx")
 }
 }

 const bid = async () => {
  const accountName="k:248f8b010a77f08a4c4bd216bc1f2d64348aa2618f620527873622a8feb21acf"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName
  const b = "marketplacefinalacc002"

  // id:string buyer:string amount:decimal bid_days:integer
  const pactCode = `(free.marketplacefinal002.bid ${JSON.stringify(tokenId)} ${JSON.stringify(a)}
                                                     2.1
                                                     2)`
                                                     //service fee > 2% = 0.02 
                                                     //amount > 2.1 kda + (0.02)


    const signCmd = {
     pactCode:pactCode,
    caps:[
      Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
      Pact.lang.mkCap("Transfer","Capability to allow coin transfer","coin.TRANSFER",[a, b, 2.142]),
       ]
       ,
  sender: a,
  gasLimit: 150000,
  chainId: CHAIN_ID,
  ttl: 28800,
  envData: {
    "demothreeaccount-keyset":guard ,
  },
};

const cmd = await Pact.wallet.sign(signCmd);
console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
"Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});

const rawRes = await localRes;
const resJSON = await rawRes.json();
console.log("rawraw",resJSON)
if(resJSON.result.status==="success"){

  const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)


const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
 console.log(signedtxx, "xxxxxxxxxxxxxx")
}


}

const acceptLastBid = async () => {
  const accountName="k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode = `(free.marketplacefinal002.accept-last-bid ${JSON.stringify(tokenId)}
                                                     )`
    const signCmd = {
     pactCode:pactCode,
    caps:[
      Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       ]
       ,
  sender: a,
  gasLimit: 150000,
  chainId: CHAIN_ID,
  ttl: 28800,
  envData: {
    "demothreeaccount-keyset":guard ,
  },
};

const cmd = await Pact.wallet.sign(signCmd);
console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
"Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});

const rawRes = await localRes;
const resJSON = await rawRes.json();
console.log("rawraw",resJSON)
if(resJSON.result.status==="success"){

  const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)


const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
 console.log(signedtxx, "xxxxxxxxxxxxxx")
}


}

const cancelBid = async () => {
  const accountName="k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  // id:string buyer:string amount:decimal bid_days:integer
  const pactCode = `(free.marketplacefinal002.cancel-bid ${JSON.stringify(tokenId2)})`
    const signCmd = {
     pactCode:pactCode,
    caps:[
       ]
       ,
  sender: a,
  gasLimit: 150000,
  chainId: CHAIN_ID,
  ttl: 28800,
  envData: {
    "demothreeaccount-keyset":guard ,
  },
};

const cmd = await Pact.wallet.sign(signCmd);
console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
"Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});

const rawRes = await localRes;
const resJSON = await rawRes.json();
console.log("rawraw",resJSON)
if(resJSON.result.status==="success"){

  const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)


const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
 console.log(signedtxx, "xxxxxxxxxxxxxx")
}


}

const declineBid = async () => {
  const accountName="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  // id:string buyer:string amount:decimal bid_days:integer
  const pactCode = `(free.marketplacefinal002.decline-bid ${JSON.stringify(tokenId2)})`
    const signCmd = {
     pactCode:pactCode,
    caps:[
       ]
       ,
  sender: a,
  gasLimit: 150000,
  chainId: CHAIN_ID,
  ttl: 28800,
  envData: {
    "demothreeaccount-keyset":guard ,
  },
};

const cmd = await Pact.wallet.sign(signCmd);
console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
"Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});

const rawRes = await localRes;
const resJSON = await rawRes.json();
console.log("rawraw",resJSON)
if(resJSON.result.status==="success"){

  const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)


const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
 console.log(signedtxx, "xxxxxxxxxxxxxx")
}


}

const getFee = async () => {

  const accountName="k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode = `(free.marketplacefinal002.get-fee "marketplace")` //collection-creation
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
        ]
        ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData: {
     "demothreeaccount-keyset":guard ,
   },
 };
 
 const cmd = await Pact.wallet.sign(signCmd);
 console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
 "Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});
 
 const rawRes = await localRes;
 const resJSON = await rawRes.json();
 console.log("rawraw",resJSON)
 if(resJSON.result.status==="success"){

   const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
 
 
const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
  console.log(signedtxx, "xxxxxxxxxxxxxx")
 }
}


const getLastBid = async () => {

  const accountName="k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode = `(free.marketplacefinal002.get-last-bid ${JSON.stringify(tokenId)})` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
        ]
        ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData: {
    //  "demothreeaccount-keyset":guard ,
   },
 };
 
 const cmd = await Pact.wallet.sign(signCmd);
 console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
 "Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});
 
 const rawRes = await localRes;
 const resJSON = await rawRes.json();
 console.log("rawraw",resJSON)
 if(resJSON.result.status==="success"){

   const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
 
 
const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
  console.log(signedtxx, "xxxxxxxxxxxxxx")
 }
}

const closeSale = async () => {

  const accountName="k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode = `(free.marketplacefinal002.close-sale ${JSON.stringify(tokenId2)})` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
        ]
        ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData: {
     "demothreeaccount-keyset":guard ,
   },
 };
 
 const cmd = await Pact.wallet.sign(signCmd);
 console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
 "Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});
 
 const rawRes = await localRes;
 const resJSON = await rawRes.json();
 console.log("rawraw",resJSON)
 if(resJSON.result.status==="success"){

   const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
 
 
const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
  console.log(signedtxx, "xxxxxxxxxxxxxx")
 }
}

const create_col_one = async () => {
  const accountName="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName
  const b = "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"

 
 const pactCode=`(free.marketplacefinal002.create-nft-collection  "collectionOne" "One" 20  (read-keyset "guard") ${JSON.stringify(a)}   
 ["02df7abad6d640a7a23cfd1693c99787f37594aea4d809d76a2a8df1f292d6f7", "a715ecd0f2cfac28f907efb2e661424a890a9a2ffe861546dfc72992b4d04806", "9c63750242ff649af5ef832698099f4205caa74949fd3759abda19dfc77fe968",
  "e57eedb66419ddbaec60539ce31e6ecefe8428f9a656c1aeddd9887a53025f3e", "88393529fdaf301c9207ab6fc5f66930320e9c4f6eeca885b04664c2a3438e97", "9b9ad6fa9cc3693f6d361370c2274783767f849c99289f260a4e1d95f0ab8fc3",
  "e938318c6adb48954789b5724cb66240d0301b0e1ccede60f2e6b741eabf1202", "40b217e2638759c4c4066159219c05a8829c061100a9fefebac3f6b0529469a3", "3772a39c96578f47793b59b728c0b3711c796439e008945d2b73e9b96810809a",
   "6868dbf0dba09b502c92c8e5bf60bfb7638fcdf37b9e95bf80daed4270161c9c", "4e5ff781d706257e07e842517aaae146467e96782fa8a0ccba9f643df3172921", "45bc5a95e03b2ab0b4e53ee612df944a05dbe7424b2c797991b4bae7f7697db2", "8c525fdb747c818544335cf533df9faca1197b1d0ead564ad45d32411c17b96b", "fb35467609d878fabbd02dd17d4dd30b48eb20ed30bc7b57b6f57ff3ab86dcfc", "d12cb638177c4c0d03f523849553eb857aa6688cd8a5163b76540110fa7e9744", "660fc652e6ccdb5dda6ee3dd1fc57cef8d167ef92936cef4d555a1530db83059", "c2dca100ffa08efdf98c625ccf6f406060b4040241aa13c2f121d05339151fb7", "4f47b9d97553b84b59468e640cbb47a245ae24e4dc2bd7baae68aae8ef93df9f", "f97982c1396ff0921b6912863437b11251a0923359578c902268ed8b56e18b3a", "5451adc421325d2c89834102c12caa9df9a50c0699b3e979fc9b9fa847159f61"]
 1.0
 free.merchfinalpolicy001
 ${JSON.stringify(imageUrl)}
 )`
  const signCmd = {
   pactCode:pactCode,
  caps:[
      Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
      Pact.lang.mkCap("Transfer","Capability to allow coin transfer","coin.TRANSFER",
                          [a, b, 1.0])  ],
  sender: a,
  gasLimit: 150000,
  chainId: CHAIN_ID,
  ttl: 28800,
  envData:
      {
       "guard":guard 
      },
    }; //alert to sign tx
  
  const cmd = await Pact.wallet.sign(signCmd);
  
  
  const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(cmd),});
      
      const rawRes = await localRes;
      const resJSON = await rawRes.json();
      console.log("rawraw",resJSON)
      if(resJSON.result.status==="success"){

        const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
      
      
     const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
       console.log(signedtxx, "xxxxxxxxxxxxxx")
      }
};
//royalty
const create_col_two = async () => {
  const accountName="k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName
  const b = "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"

 
 const pactCode=`(free.marketplacefinal002.create-nft-collection  "collectionTwo" "Two" 20  (read-keyset "guard") ${JSON.stringify(a)}   
 ["0a4abb763986aa289a91ae658eba3c6a074d20febcdf6c71f0749e91d5d1a5e5",  "29a3f5d1f65fdd5d29714167a720778b19a0f5bffe97d0a13c69b4e9b4ab7a43", "57bcd3db9aa7f14d43bd724c4414aa557fe6d5652cbe3b34f0d13f69f4d811e8", "93b02e187bcab046dd6fa55be40f8adf39fc636ba23754d0a5fe167440357fc2", "4860e538c83e15319c8bc0d42952148bc00adeafcb60a22ebe90f3f43a826944",
  "238304ed3eed30b3df9195932136fec84d642197715175aa5744743955269f19", "e103101b17b051d593e99b900080e0785c16b856d85821a8152627ce6cfa9c7a", "9604f1f8cd86915db87b9fe83ef56de575dcd9ee40432e8e3c9fe3a58cdcf305", 
 "0c1efcc1a8f2c9115b51f8410df7906107d71177fc9824d5610709b6a6873d21", "149cbda40ccbdb2d32767818cf3ea2cb6692942e1bcd0348c004d3ab3077f220", "d89d97a4e46197fded826126cc95336c171e5900fa265f7e1d779755e651dc74", "317635f144035b830a3f1e7f89edac7aa5a796776677b30954b0670b878db2b8", "1096e7cac0b2afe74cc5807352c9bf7cfdb5f0f6eb35479287a2994fbdfb211d", 
 "ee96fee65329b0c22e69e0f6aa1c127aef3c42c7f534ecf9fa0c51c8c99abee5", "0938c98595f1759fa03e6a6f8c03cc479110498555a81484684a488b3b64244e", "ffb58740eb2c5802d9f6b7a83285ad4ccd16062b345aea0acba7af2eae68a887", "814add263b8a65918741953725d44f8d7956a5db7463f994c112be5aeaabbc55", "7e898b0cfdd545f412301b177726bed30572b4f8f705c9dcb2a28bd464568fbd", "fb7c0d8d8ce03ebbb287ad002cc9e04278bf26e9f7f7640da485e2bbe79aa438", 
 "cfe0b555564a5dec4bc1894796b520adb0240b417a902870ac859724c34c66d4"]
  2.0
 free.merchfinalpolicy001
 ${JSON.stringify(imageUrl)}
 0.02
 "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
 )`
  const signCmd = {
   pactCode:pactCode,
  caps:[
      Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
      Pact.lang.mkCap("Transfer","Capability to allow coin transfer","coin.TRANSFER",
                          [a, b, 2.0]),//fee
                          Pact.lang.mkCap("Transfer","Capability to allow coin transfer","free.marketplacefinal002.REQUEST-COLLECTION ",["colRoyalty"] ) ]
                          ,
  sender: a,
  gasLimit: 150000,
  chainId: CHAIN_ID,
  ttl: 28800,
  envData:
      {
       "guard":guard 
      },
    }; //alert to sign tx
  
  const cmd = await Pact.wallet.sign(signCmd);
  
  
  const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(cmd),});
      
      const rawRes = await localRes;
      const resJSON = await rawRes.json();
      console.log("rawraw",resJSON)
      if(resJSON.result.status==="success"){

        const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
      
      
     const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
       console.log(signedtxx, "xxxxxxxxxxxxxx")
      }
};

/**
 *                                  MERCH-CONTRACT-FUNCTIONS
 */

const getAllCollection = async () => {

  const accountName1="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
  const publicKey1=accountName1.slice(2, accountName1.length);
  const guard1={ keys: [publicKey1],pred: "keys-all",}

  const a = accountName1

  const pactCode=`(free.merchfinal001.get-all-collection)`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard1 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const mintCollectionOne = async () => {
  const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"//creater wallet address
  const accountName="k:c1d0eb761e0faf97d1d1082cd7a3b319b93ef2d2aac7952a24cccbafbdf0779d"

  const publicKey=accountName.slice(2, accountName.length);

  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}


  const a = accountName
  const b = accountName1

  const pactCode=`(free.merchfinal001.mint ${JSON.stringify(a)} (read-keyset "guard") 1.0 "collectionOne" 1)`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
      //  Pact.lang.mkCap("MERCH","Capability for owner", "free.dbcfinal001.COOPER"),
       Pact.lang.mkCap("Transfer","Capability to allow coin transfer","coin.TRANSFER",
          [a, b, 1.0]
        ), 
      Pact.lang.mkCap("MINT","Capability for owner", "free.merchfinal001.MINT",
           [a,1.0]),
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const mintCollectionTwo = async () => {
  const accountName1="k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf" //creator 
  const accountName="k:c1d0eb761e0faf97d1d1082cd7a3b319b93ef2d2aac7952a24cccbafbdf0779d" //user

  const publicKey=accountName.slice(2, accountName.length);

  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}


  const a = accountName
  const b = accountName1 //comment

  const pactCode=`(free.merchfinal001.mint ${JSON.stringify(a)} (read-keyset "guard") 1.0 "collectionTwo" 1)`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
      //  Pact.lang.mkCap("MERCH","Capability for owner", "free.dbcfinal001.COOPER"),
       Pact.lang.mkCap("Transfer","Capability to allow coin transfer","coin.TRANSFER",
          [a, b, 2.0]
        ), //if creaotr == mint user  comment this 2419 to 2421 
      Pact.lang.mkCap("MINT-COOPER","Capability for owner", "free.merchfinal001.MINT",
           [a,1.0]),
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const creatorMintCollectionOne = async () => {
  const accountName="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"

  const publicKey=accountName.slice(2, accountName.length);

  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}


  const a = accountName
  const pactCode=`(free.merchfinal001.mint ${JSON.stringify(a)} (read-keyset "guard") 1.0 "collectionOne" 1)`

   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
      Pact.lang.mkCap("MINT","Capability for owner", "free.merchfinal001.MINT",
           [a,1.0]),
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}


const getTokensOwned = async () => {
  
  // const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const accountName1="k:248f8b010a77f08a4c4bd216bc1f2d64348aa2618f620527873622a8feb21acf"
//   const accountName1="k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf"
  
  const publicKey1=accountName1.slice(2, accountName1.length);
  const guard1={ keys: [publicKey1],pred: "keys-all",}

  const a = accountName1
  // const b = ""

  const pactCode=`(free.merchfinalpolicy001.get-tokens-owned ${JSON.stringify(a)})`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard1 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}


const getMintPrice = async () => {

const accountName="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
const publicKey=accountName.slice(2, accountName.length);
const guard={ keys: [publicKey],pred: "keys-all",}

const a = accountName

const pactCode=`(free.merchfinalpolicy001.get-nft-price "collectionOne")`
//   const pactCode=`(free.merchfinalpolicy001.get-nft-price "collectionTwo")`
 const signCmd = {
  pactCode:pactCode,
 caps:[
     Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
    ]
     ,
 sender: a,
 gasLimit: 150000,
 chainId: CHAIN_ID,
 ttl: 28800,
 envData:
     {
      "guard":guard
     },
   }; //alert to sign tx
 
 const cmd = await Pact.wallet.sign(signCmd);
 
 
 const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
     "Content-Type": "application/json",
   },
   method: "POST",
   body: JSON.stringify(cmd),});
     
     const rawRes = await localRes;
     const resJSON = await rawRes.json();
     console.log("rawraw",resJSON)
     if(resJSON.result.status==="success"){

       const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
     
     
    const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
      console.log(signedtxx, "xxxxxxxxxxxxxx")
     }

}

const getMinted= async () => {

const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
const publicKey1=accountName1.slice(2, accountName1.length);
const guard1={ keys: [publicKey1],pred: "keys-all",}

const a = accountName1

const pactCode=`(free.merchfinal001.get-minted "collectionOne")`
 const signCmd = {
  pactCode:pactCode,
 caps:[
     Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
    ]
     ,
 sender: a,
 gasLimit: 150000,
 chainId: CHAIN_ID,
 ttl: 28800,
 envData:
     {
      "guard":guard1 
     },
   }; //alert to sign tx
 
 const cmd = await Pact.wallet.sign(signCmd);
 
 
 const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
     "Content-Type": "application/json",
   },
   method: "POST",
   body: JSON.stringify(cmd),});
     
     const rawRes = await localRes;
     const resJSON = await rawRes.json();
     console.log("rawraw",resJSON)
     if(resJSON.result.status==="success"){

       const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
     
     
    const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
      console.log(signedtxx, "xxxxxxxxxxxxxx")
     }

}

const getTokensRemaining= async () => {

const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
const publicKey1=accountName1.slice(2, accountName1.length);
const guard1={ keys: [publicKey1],pred: "keys-all",}

const a = accountName1
// const b = ""

const pactCode=`(free.merchfinal001.get-current-length "collectionOne")`
 const signCmd = {
  pactCode:pactCode,
 caps:[
     Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
    ]
     ,
 sender: a,
 gasLimit: 150000,
 chainId: CHAIN_ID,
 ttl: 28800,
 envData:
     {
      "guard":guard1 
     },
   }; //alert to sign tx
 
 const cmd = await Pact.wallet.sign(signCmd);
 
 
 const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
     "Content-Type": "application/json",
   },
   method: "POST",
   body: JSON.stringify(cmd),});
     
     const rawRes = await localRes;
     const resJSON = await rawRes.json();
     console.log("rawraw",resJSON)
     if(resJSON.result.status==="success"){

       const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
     
     
    const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
      console.log(signedtxx, "xxxxxxxxxxxxxx")
     }

}


/**
* 
* 
*                                  VERIFICATION-FUNCTIONS
* 
* 
*/
const getVerified = async () => {

  const accountName="k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName
  const b = "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"

  const pactCode = `(free.marketplacefinal002.get-verified ${JSON.stringify(a)})` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("Transfer","Capability to allow coin transfer", "coin.TRANSFER",[a, b, 2.0]),
        ]
        ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData: {
     "demothreeaccount-keyset":guard ,
   },
 };
 
 const cmd = await Pact.wallet.sign(signCmd);
 console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
 "Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});
 
 const rawRes = await localRes;
 const resJSON = await rawRes.json();
 console.log("rawraw",resJSON)
 if(resJSON.result.status==="success"){

   const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
 
 
const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
  console.log(signedtxx, "xxxxxxxxxxxxxx")
 }
 }

 const return_all_verified_account = async () => {

  const accountName="k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode = `(free.marketplacefinal002.return-all-verified-account)` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
           ]
        ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData: {
     "demothreeaccount-keyset":guard ,
   },
 };
 
 const cmd = await Pact.wallet.sign(signCmd);
 console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
 "Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});
 
 const rawRes = await localRes;
 const resJSON = await rawRes.json();
 console.log("rawraw",resJSON)
 if(resJSON.result.status==="success"){

   const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
 
 
const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
  console.log(signedtxx, "xxxxxxxxxxxxxx")
 }
 }
 
 const check_verification_of_account = async () => {

  const accountName="k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode = `(free.marketplacefinal002.check-verification-of-account ${JSON.stringify(a)} )` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
          ]
        ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData: {
     "demothreeaccount-keyset":guard ,
   },
 };
 
 const cmd = await Pact.wallet.sign(signCmd);
 console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
 "Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});
 
 const rawRes = await localRes;
 const resJSON = await rawRes.json();
 console.log("rawraw",resJSON)
 if(resJSON.result.status==="success"){

   const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
 
 
const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
  console.log(signedtxx, "xxxxxxxxxxxxxx")
 }
 }


 /**
 * 
 * 
 *                                MERCH-CONTRACT-ADMIN-FUNCTIONS
 * 
 * 
 */

const getCollectionInfo = async () => {

  const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
  const publicKey=accountName.slice(2, accountName.length);
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode=`(free.merchfinal001.get-collection "collectionOne")`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const getAllCollectionRequest = async () => {

  const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
  const publicKey=accountName.slice(2, accountName.length);
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode=`(free.merchfinal001.get-all-collections-request)`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[])
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}


const launchCollection = async () => {

  const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
  const publicKey=accountName.slice(2, accountName.length);
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  // const pactCode=`(free.merchfinal001.launch-nft-collection "collectionOne")`
  const pactCode=`(free.merchfinal001.launch-nft-collection "collectionTwo")`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("PASS","Capability for owner", "free.merchfinal001.IS_ADMIN")
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const updateTokenList = async () => {

  const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
  const publicKey=accountName.slice(2, accountName.length);
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode=`(free.merch001.updatetokenlist ["08e465b9e7569f7a22ca88e0412460c8626d1d4a5be5ac5af8971d8f904e145e",
                                                           "1f2d81d280a80c03a55d5cd05f3ae44338f86012b72ee9a2e1656e6db62dab1d"] "dbc1")`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}


const updateNftPrice = async () => {

  const accountName="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const publicKey=accountName.slice(2, accountName.length);
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode=`(free.merchfinal001.update-price 2.0 "collectionOne")`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}



 //--------------------------------------------------------------------------------------------------//
/**
 *                                  PASS-ADMIN-FUNCTIONS
 */

const updatePassTokenList = async () => {

    const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
    const publicKey=accountName.slice(2, accountName.length);
    const guard={ keys: [publicKey],pred: "keys-all",}

    const a = accountName

    const pactCode=`(free.passfinal001.updatetokenlist ["36e7cc6e945bf3287cbf195e298f522584a219fc46e9ef1aa23c23f9e710b1bf",
    "39f62ca16b85e2672edbb1f23a636f81d6e81592d73bc80a2bed930f1f061388"] "pass")`
     const signCmd = {
      pactCode:pactCode,
     caps:[
         Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
         Pact.lang.mkCap("PASS","Capability for owner", "free.passfinal001.PASS")
        ]
         ,
     sender: a,
     gasLimit: 150000,
     chainId: CHAIN_ID,
     ttl: 28800,
     envData:
         {
          "guard":guard 
         },
       }; //alert to sign tx
     
     const cmd = await Pact.wallet.sign(signCmd);
     
     
     const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
         "Content-Type": "application/json",
       },
       method: "POST",
       body: JSON.stringify(cmd),});
         
         const rawRes = await localRes;
         const resJSON = await rawRes.json();
         console.log("rawraw",resJSON)
         if(resJSON.result.status==="success"){
 
           const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
         
         
        const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
          console.log(signedtxx, "xxxxxxxxxxxxxx")
         }

}

const updatePassTokenListInPolicy = async () => {

    const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
    const publicKey=accountName.slice(2, accountName.length);
    const guard={ keys: [publicKey],pred: "keys-all",}

    const a = accountName

    const pactCode=`(free.passfinalpolicy001.update-tokens-list ["36e7cc6e945bf3287cbf195e298f522584a219fc46e9ef1aa23c23f9e710b1bf",
    "39f62ca16b85e2672edbb1f23a636f81d6e81592d73bc80a2bed930f1f061388"])`
     const signCmd = {
      pactCode:pactCode,
     caps:[
         Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
         Pact.lang.mkCap("PASS","Capability for owner", "free.passfinalpolicy001.IS_ADMIN")
        ]
         ,
     sender: a,
     gasLimit: 150000,
     chainId: CHAIN_ID,
     ttl: 28800,
     envData:
         {
          "guard":guard 
         },
       }; //alert to sign tx
     
     const cmd = await Pact.wallet.sign(signCmd);
     
     
     const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
         "Content-Type": "application/json",
       },
       method: "POST",
       body: JSON.stringify(cmd),});
         
         const rawRes = await localRes;
         const resJSON = await rawRes.json();
         console.log("rawraw",resJSON)
         if(resJSON.result.status==="success"){
 
           const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
         
         
        const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
          console.log(signedtxx, "xxxxxxxxxxxxxx")
         }

}
 
const updatePassPrice = async () => {

    const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
    const publicKey=accountName.slice(2, accountName.length);
    const guard={ keys: [publicKey],pred: "keys-all",}

    const a = accountName

    const pactCode=`(free.passfinalpolicy001.update-pass-price 2.0)`
     const signCmd = {
      pactCode:pactCode,
     caps:[
         Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
         Pact.lang.mkCap("PASS","Capability for owner", "free.passfinalpolicy001.IS_ADMIN")
        ]
         ,
     sender: a,
     gasLimit: 150000,
     chainId: CHAIN_ID,
     ttl: 28800,
     envData:
         {
          "guard":guard 
         },
       }; //alert to sign tx
     
     const cmd = await Pact.wallet.sign(signCmd);
     
     
     const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
         "Content-Type": "application/json",
       },
       method: "POST",
       body: JSON.stringify(cmd),});
         
         const rawRes = await localRes;
         const resJSON = await rawRes.json();
         console.log("rawraw",resJSON)
         if(resJSON.result.status==="success"){
 
           const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
         
         
        const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
          console.log(signedtxx, "xxxxxxxxxxxxxx")
         }

}

/**
 *                                  DBC-ADMIN-FUNCTIONS
 */

const updateDBCTokenList = async () => {

  const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
  const publicKey=accountName.slice(2, accountName.length);
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode=`(free.dbcfinal001.updatetokenlist ["08e465b9e7569f7a22ca88e0412460c8626d1d4a5be5ac5af8971d8f904e145e",
                                                           "1f2d81d280a80c03a55d5cd05f3ae44338f86012b72ee9a2e1656e6db62dab1d"] "dbc1")`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("PASS","Capability for owner", "free.dbcfinal001.IS_ADMIN")
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const updateDBCTokenListInPolicy = async () => {

  const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
  const publicKey=accountName.slice(2, accountName.length);
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode=`(free.dbcfinalpolicy001.update-tokens-list
      ["08e465b9e7569f7a22ca88e0412460c8626d1d4a5be5ac5af8971d8f904e145e",
                                                    "1f2d81d280a80c03a55d5cd05f3ae44338f86012b72ee9a2e1656e6db62dab1d"])`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("PASS","Capability for owner", "free.dbcfinalpolicy001.IS_ADMIN")
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const updateDBCNftPriceForWhitelist = async () => {

  const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
  const publicKey=accountName.slice(2, accountName.length);
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode=`(free.dbcfinalpolicy001.update-mint-price 2.0 "whitelist")`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("PASS","Capability for owner", "free.dbcfinalpolicy001.IS_ADMIN")
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const updateDBCNftPriceForPublic = async () => {

  const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
  const publicKey=accountName.slice(2, accountName.length);
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode=`(free.dbcfinalpolicy001.update-mint-price 3.0 "public")`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("PASS","Capability for owner", "free.dbcfinalpolicy001.IS_ADMIN")
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const addWlUser = async () => {

  const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
  const publicKey=accountName.slice(2, accountName.length);
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName
  
  // const pactCode=`(free.dbcfinalpolicy001.add-whitelists ["k:c1d0eb761e0faf97d1d1082cd7a3b319b93ef2d2aac7952a24cccbafbdf0779d"])`
  const pactCode=`(free.dbcfinalpolicy001.add-whitelists ["k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"])`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("PASS","Capability for owner", "free.dbcfinalpolicy001.WHITELIST")
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const addPassUser = async () => {

  const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
  const publicKey=accountName.slice(2, accountName.length);
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName
  
  // const pactCode=`(free.dbcfinalpolicy001.add-priority-users ["k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"])`
  const pactCode=`(free.dbcfinalpolicy001.add-priority-users ["k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf",
  "k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"])`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("PASS","Capability for owner", "free.dbcfinalpolicy001.PRIORITY")
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

const updateMintTime = async () => {

  const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
  const publicKey=accountName.slice(2, accountName.length);
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode=`(free.dbcfinalpolicy001.update-mint-time (time "2023-03-30T14:00:00Z") (time "2023-01-19T14:00:00Z") (time "2023-05-20T14:00:00Z") )`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("PASS","Capability for owner", "free.dbcfinalpolicy001.IS_ADMIN")
      ]
       ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData:
       {
        "guard":guard 
       },
     }; //alert to sign tx
   
   const cmd = await Pact.wallet.sign(signCmd);
   
   
   const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
       "Content-Type": "application/json",
     },
     method: "POST",
     body: JSON.stringify(cmd),});
       
       const rawRes = await localRes;
       const resJSON = await rawRes.json();
       console.log("rawraw",resJSON)
       if(resJSON.result.status==="success"){

         const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
       
       
      const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
        console.log(signedtxx, "xxxxxxxxxxxxxx")
       }

}

/**
 *                                  MARKETPLACE-ADMIN-FUNCTIONS
 */

const set_royalty = async () => {

  const accountName="k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode = `(free.marketplacefinal002.set-royalty ${JSON.stringify(tokenId)} 
                                                            0.01 
                                                            ${JSON.stringify(a)})` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("MERCH","Capability for owner", "free.demoplace-contract7.MERCH"),
        ]
        ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData: {
  
   },
 };
 
 const cmd = await Pact.wallet.sign(signCmd);
 console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
 "Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});
 
 const rawRes = await localRes;
 const resJSON = await rawRes.json();
 console.log("rawraw",resJSON)
 if(resJSON.result.status==="success"){

   const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
 
 
const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
  console.log(signedtxx, "xxxxxxxxxxxxxx")
 }
 }

 const update_fee = async () => {

  const accountName="k:c1d0eb761e0faf97d1d1082cd7a3b319b93ef2d2aac7952a24cccbafbdf0779d"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode = `(free.marketplacefinal002.update-fee 0.02 "marketplace")` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("ADMIN","Capability for owner", "free.marketplacefinal002.IS_ADMIN"),
        ]
        ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData: {
   },
 };
 
 const cmd = await Pact.wallet.sign(signCmd);
 console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
 "Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});
 
 const rawRes = await localRes;
 const resJSON = await rawRes.json();
 console.log("rawraw",resJSON)
 if(resJSON.result.status==="success"){

   const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
 
 
const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
  console.log(signedtxx, "xxxxxxxxxxxxxx")
 }
 }

 const verification = async () => {

  const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName
  const b = "k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"
  const pactCode = `(free.marketplacefinal002.verification ${JSON.stringify(b)})` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("ADMIN","Capability for owner", "free.marketplacefinal002.IS_ADMIN")
        ]
        ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData: {
     "demothreeaccount-keyset":guard ,
   },
 };
 
 const cmd = await Pact.wallet.sign(signCmd);
 console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
 "Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});
 
 const rawRes = await localRes;
 const resJSON = await rawRes.json();
 console.log("rawraw",resJSON)
 if(resJSON.result.status==="success"){

   const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
 
 
const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
  console.log(signedtxx, "xxxxxxxxxxxxxx")
 }
 }

 const get_account_requested_for_verification = async () => {

  const accountName="k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode = `(free.marketplacefinal002.get-account-requested-for-verification)` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
        ]
        ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData: {
     "demothreeaccount-keyset":guard ,
   },
 };
 
 const cmd = await Pact.wallet.sign(signCmd);
 console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
 "Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});
 
 const rawRes = await localRes;
 const resJSON = await rawRes.json();
 console.log("rawraw",resJSON)
 if(resJSON.result.status==="success"){

   const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
 
 
const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
  console.log(signedtxx, "xxxxxxxxxxxxxx")
 }
 }
 
 const denyVerification = async () => {

  const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName
  const b = "k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"
  const pactCode = `(free.marketplacefinal002.deny-verification ${JSON.stringify(b)})` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("ADMIN","Capability for owner", "free.marketplacefinal002.IS_ADMIN")
        ]
        ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData: {
     "demothreeaccount-keyset":guard ,
   },
 };
 
 const cmd = await Pact.wallet.sign(signCmd);
 console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
 "Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});
 
 const rawRes = await localRes;
 const resJSON = await rawRes.json();
 console.log("rawraw",resJSON)
 if(resJSON.result.status==="success"){

   const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
 
 
const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
  console.log(signedtxx, "xxxxxxxxxxxxxx")
 }
 }

 const revealNft = async () => {

  const accountName="k:c1d0eb761e0faf97d1d1082cd7a3b319b93ef2d2aac7952a24cccbafbdf0779d"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName
  
  const pactCode = `(marmalade.ledger.get-manifest  ${JSON.stringify(tokenId)})` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("ADMIN","Capability for owner", "free.marketplacefinal002.IS_ADMIN")
        ]
        ,
   sender: a,
   gasLimit: 150000,
   chainId: CHAIN_ID,
   ttl: 28800,
   envData: {
     "demothreeaccount-keyset":guard ,
   },
 };
 
 const cmd = await Pact.wallet.sign(signCmd);
 console.log("cmjj",cmd)

;
const localRes = await fetch(`${API_HOST}/api/v1/local`, {  headers: {
 "Content-Type": "application/json",
},
method: "POST",
body: JSON.stringify(cmd),});
 
 const rawRes = await localRes;
 const resJSON = await rawRes.json();
 console.log("rawraw",resJSON)
 if(resJSON.result.status==="success"){

   const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST)
 
 
const signedtxx = await Pact.fetch.listen( { listen: reqKey.requestKeys[0] } , API_HOST);
  console.log(signedtxx, "xxxxxxxxxxxxxx")
 }
 }

 //--------------------------------------------------------------------------------------------------//


  return (
    <div>
      <h3>PASS CONTRACT FUNCTIONS</h3>
      <button onClick={mint_pass}>MINT-PASS</button><br></br>
      <button onClick={create_col_pass}>CREATE-COL</button><br></br>
      <button onClick={getPassBalance}>GET-PASS-BALANCE</button><br></br>
      <button onClick={updatePassTokenList}>UPDATE-TOKEN-LIST</button>
      <button onClick={updatePassTokenListInPolicy}>UPDATE-TOKEN-LIST-IN-POLICY</button>
      <button onClick={updatePassPrice}>UPDATE-PASS-PRICE</button><br></br>
      <button onClick={getPassOwner}>GET-OWNER</button>
      <button onClick={getPassOwned}>GET-TOKENS-OWNED</button><br></br>
      <button onClick={getPassPrice}>GET-PASS-PRICE</button><br></br>
      <button onClick={getPassMinted}>GET-MINTED</button>
      <button onClick={getAccountMinted}>GET-ACCOUNT-MINTED</button>
      {/* <button onClick={getTokensRemaining}>GET-TOKENS-REMAINING</button> */}
      <button onClick={getPassTokensRemaining}>GET-TOKENS-REMAINING</button>
      <button onClick={getPassOnwers}>GET-PASS-OWNER</button>
      <br></br>
      <br></br>
      <h3>DBC CONTRACT FUNCTIONS</h3>
      <br></br>
      <button onClick={mint_cooper}>MINT-COOPER</button>
      <button onClick={mint_cooper_wl}>MINT-COOPER-WL</button>
      <button onClick={mint_cooper_public}>MINT-COOPER-PUBLIC</button>
      <button onClick={mint_cooper_admin}>MINT-COOPER-ADMIN</button><br></br>
      <button onClick={create_col_dbc}>CREATE-COL-DBC</button>
      <button onClick={updateDBCTokenList}>UPDATE-DBC-TOKEN-LIST</button>
      <button onClick={updateDBCTokenListInPolicy}>UPDATE-DBC-TOKEN-LIST-IN-POLICY</button><br></br>
      <button onClick={getDBCTokensRemaining}>GET-DBC-TOKENS-REMAINING</button> <br></br>
      <button onClick={getDBCMinted}>GET-DBC-MINTED</button><br></br>
      <button onClick={checkPublic}>CHECK-PUBLIC</button><br></br>
      <button onClick={checkWhitelist}>CHECK-WHITELIST</button><br></br>
      <button onClick={updateDBCNftPriceForWhitelist}>UPDATE-DBC-NFT-PRICE-WL</button>
      <button onClick={updateDBCNftPriceForPublic}>UPDATE-DBC-NFT-PRICE-PUBLIC</button><br></br>
      <button onClick={updateMintTime}>UPDATE-MINT-TIME</button>
      <button onClick={getPublicMintPrice}>GET-MINT-PRICE</button><br></br>
      <button onClick={getWlMintPrice}>GET-MINT-PRICE</button><br></br>
      <button onClick={getDBCOwner}>GET-DBC-OWNER</button>
      <button onClick={getDBCOwned}>GET-DBC-TOKENS-OWNED</button>
      <button onClick={getDBCAccountMinted}>GET-DBC-ACCOUNT-MINTED</button><br></br>
      <button onClick={addWlUser}>ADD-WL</button>
      <button onClick={addPassUser}>ADD-PASS-USER</button>
      <br></br>
      <br></br>
      <h3>MARKETPLACE CONTRACT FUNCTIONS</h3>
      <br></br>
      
      
      <button onClick={openDirectSale}>OPEN-DIRECT-SALE</button>
      <button onClick={openForBidSale}>OPEN-BID-SALE</button><br></br>

      <button onClick={buyIdOnSale}>BUY</button>
      <button onClick={bid}>BID</button><br></br>

      <button onClick={get_royalty}>GET-ROYALTY</button>
      <button onClick={set_royalty}>SET-ROYALTY</button><br></br>

      <button onClick={cancelBid}>CANCEL-BID</button>
      <button onClick={declineBid}>DECLINE-BID</button><br></br>

      <button onClick={getAllIdOnSale}>GET-ALL-ID-ON-SALE</button>
      <button onClick={getAllIdOnDirectSale}>GET-ALL-ID-DIRECT-SALE</button>
      <button onClick={getAllIdOnAuction}>GET-ALL-ID-ON-AUCTION</button>
      <button onClick={getSaleInfoById}>GET-SALE-INFO-BY-ID</button><br></br>

      <button onClick={giftNft}>GIFT-NFT</button><br></br>

      <button onClick={acceptLastBid}>ACCEPT-LAST-BID</button><br></br>

      <button onClick={closeSale}>CLOSE-SALE</button><br></br>

      <button onClick={getVerified}>GET-VERIFIED</button>
      <button onClick={return_all_verified_account}>GET-ALL-VERIFIED-ACCOUNTS</button>
      <button onClick={check_verification_of_account}>CHECK-VERFICATION-STATUS</button><br></br>

      <button onClick={getFee}>GET-FEE</button><br></br>
      <button onClick={getLastBid}>GET-LAST-BID</button>
      <button onClick={update_fee}>UPDATE-FEE</button><br></br>

      <button onClick={verification}>VERIFY</button>
      <button onClick={get_account_requested_for_verification}>GET-REQUESTS-VERIFY</button>
      <button onClick={denyVerification}>DENY-VERIFICATION</button>

      
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <button onClick={revealNft}>REVEAL</button>
      <h3>MERCH CONTRACT FUNCTIONS</h3>
      <button onClick={create_col_one}>CREATE-COL-ONE</button>
      <button onClick={create_col_two}>CREATE-COL-TWO</button><br></br><br></br>
      <button onClick={getAllCollectionRequest}>GET-ALL-COLLECTION-REQUEST</button><br></br><br></br>//admin approval first
      <button onClick={getAllCollection}>GET-ALL-COLLECTION</button>
      <button onClick={getCollectionInfo}>GET-COLLECTION-INFO</button>// admin approval second
      <br></br>
      <br></br>
      <button onClick={launchCollection}>LAUNCH-COLLECTION</button>//admin collection third

      <br></br>
      <br></br>

      <button onClick={mintCollectionOne}>MINT-COLL-1-TOKENS</button>
      <button onClick={mintCollectionTwo}>MINT-COLL-2-TOKENS</button><br></br>
      <br></br>

      <button onClick={creatorMintCollectionOne}>CREATOR-MINT-COL-1</button><br></br>
      <br></br>
      <button onClick={getTokensOwned}>GET-TOKENS-OWNED</button>
      <br></br>
      <br></br>
      <button onClick={getMintPrice}>GET-MINT-PRICE</button><br></br>
      <br></br>
      <br></br>
      <button onClick={updateNftPrice}>UPDATE-NFT-PRICE</button>
      <br></br>
      <br></br>
      <button onClick={getMinted}>GET-MINTED</button><br></br>
      <br></br>
      <br></br>
      <button onClick={getTokensRemaining}>GET-TOKENS-REMAINING</button> <br></br>
      <br></br>
      <br></br>
      <button onClick={updateTokenList}>UPDATE-TOKEN-LIST</button>




    </div>
  )
}
export default Index;


//func add-whitelist{dbcooper}
//table data of user wl/pass
//func add-pass-user

//lakshay {18.12.22}
//data of pass-user
//db-cooper {25.12.22}
//pass-user-table {db-cooper}


