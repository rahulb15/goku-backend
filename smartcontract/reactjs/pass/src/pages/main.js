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
  const tokenId = "dbc1:3mQf783ldY3ICad4sWOHIxTmNzIJXuiMwmYddiw-gxE";
  const tokenId2= "dbc1:cppmf1PfbMY62lJXF-McanHli_T8-WJMQSirNJllp5w";
  const tokenId3 = "pass:CIkngaTIu66eNfTupOj19-4IVkZ5EHWskK1754krsnA";

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

    const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
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

const getMinted= async () => {

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

const getTokensRemaining= async () => {

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

/**
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


const getAllCollection = async () => {

  const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const publicKey1=accountName1.slice(2, accountName1.length);
  const guard1={ keys: [publicKey1],pred: "keys-all",}

  const a = accountName1

  const pactCode=`(free.dbcfinal001.get-all-collection)`
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

const getMintPrice = async () => {

const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
const publicKey1=accountName1.slice(2, accountName1.length);
const guard1={ keys: [publicKey1],pred: "keys-all",}

const a = accountName1
// const b = ""

const pactCode=`(free.dbcfinalpolicy001.get-price)`
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
  const b = "marketplaceacc001"

  const pactCode=`(free.marketplacefinal001.open-sale "pass" ${JSON.stringify(tokenId)}  ${JSON.stringify(a)} 2.0 0 3 false)`
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
  const accountName="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"

  const publicKey=accountName.slice(2, accountName.length);

  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName
  const b = "marketplaceacc001"

  const pactCode=`(free.marketplacefinal001.open-sale "pass" ${JSON.stringify(tokenId2)}  ${JSON.stringify(a)} 2.0 0 3 true)`
   const signCmd = {
    pactCode:pactCode,
   caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("Transfer","Capability to allow  transfer","marmalade.ledger.TRANSFER",
          [tokenId2,a,b,1.0]
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
  const c = "marketplaceacc001"
  const pactCode=`(free.marketplacefinal001.buy ${JSON.stringify(tokenId)} ${JSON.stringify(a)})`
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

  const pactCode = `(free.marketplacefinal001.get-royalty ${JSON.stringify(tokenId)})` 
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

  const pactCode = `(free.marketplacefinal001.get-all-id-on-sale)` 
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

  const pactCode = `(free.marketplacefinal001.get-sale ${JSON.stringify(tokenId2)})` 
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

  const accountName = "k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf"
  const receiver="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName
  const b = receiver

  const pactCode = `(free.marketplacefinal001.gift-nft ${JSON.stringify(tokenId3)} ${JSON.stringify(a)} ${JSON.stringify(b)})` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("TRANSFER","Capability to allow buying gas","free.marketplacefinal001.TRANSFER",[]),
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
  const b = "marketplaceacc001"

  // id:string buyer:string amount:decimal bid_days:integer
  const pactCode = `(free.marketplacefinal001.bid ${JSON.stringify(tokenId2)} ${JSON.stringify(a)}
                                                     2.1
                                                     2)`


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
  const accountName="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode = `(free.marketplacefinal001.accept-last-bid ${JSON.stringify(tokenId2)}
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
  const pactCode = `(free.marketplacefinal001.cancel-bid ${JSON.stringify(tokenId2)})`
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
  const pactCode = `(free.marketplacefinal001.decline-bid ${JSON.stringify(tokenId2)})`
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

  const pactCode = `(free.marketplacefinal001.get-fee "marketplace")` 
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

const closeSale = async () => {

  const accountName="k:e186e5126adef089d8288142cfdd4234672fb2205337dd8039ae32cd66f97f3f"
  const publicKey=accountName.slice(2, accountName.length);
  console.log("publicKeycw",publicKey)
  console.log("accountnamecw",accountName)
  const guard={ keys: [publicKey],pred: "keys-all",}

  const a = accountName

  const pactCode = `(free.marketplacefinal001.close-sale ${JSON.stringify(tokenId2)})` 
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

  const pactCode = `(free.marketplacefinal001.get-verified ${JSON.stringify(a)})` 
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

  const pactCode = `(free.marketplacefinal001.return-all-verified-account)` 
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

  const pactCode = `(free.marketplacefinal001.check-verification-of-account ${JSON.stringify(a)} )` 
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



 //--------------------------------------------------------------------------------------------------//
/**
 *                                  PASS-ADMIN-FUNCTIONS
 */

const updatePassTokenList = async () => {

    const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
    const publicKey=accountName.slice(2, accountName.length);
    const guard={ keys: [publicKey],pred: "keys-all",}

    const a = accountName

    const pactCode=`(free.passfinal001.updatetokenlist ["08e465b9e7569f7a22ca88e0412460c8626d1d4a5be5ac5af8971d8f904e145e",
                                                             "1f2d81d280a80c03a55d5cd05f3ae44338f86012b72ee9a2e1656e6db62dab1d"] "pass")`
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

    const pactCode=`(free.passfinalpolicy001.update-tokens-list ["08e465b9e7569f7a22ca88e0412460c8626d1d4a5be5ac5af8971d8f904e145e",
                                                      "1f2d81d280a80c03a55d5cd05f3ae44338f86012b72ee9a2e1656e6db62dab1d"])`
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

  const pactCode = `(free.marketplacefinal001.set-royalty ${JSON.stringify(tokenId)} 
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

  const pactCode = `(free.marketplacefinal001.update-fee 0.02 "marketplace")` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("ADMIN","Capability for owner", "free.marketplacefinal001.IS_ADMIN"),
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
  const pactCode = `(free.marketplacefinal001.verification ${JSON.stringify(b)})` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("ADMIN","Capability for owner", "free.marketplacefinal001.IS_ADMIN")
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

  const pactCode = `(free.marketplacefinal001.get-account-requested-for-verification)` 
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
  const pactCode = `(free.marketplacefinal001.deny-verification ${JSON.stringify(b)})` 
     const signCmd = {
      pactCode:pactCode,
     caps:[
       Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
       Pact.lang.mkCap("ADMIN","Capability for owner", "free.marketplacefinal001.IS_ADMIN")
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
      <button onClick={getMinted}>GET-MINTED</button>
      <button onClick={getAccountMinted}>GET-ACCOUNT-MINTED</button>
      <button onClick={getTokensRemaining}>GET-TOKENS-REMAINING</button>
      <button onClick={getTokensRemaining}>GET-TOKENS-REMAINING</button>
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
      <button onClick={getAllCollection}>GET-COLLECTION</button><br></br>
      <button onClick={updateDBCTokenList}>UPDATE-DBC-TOKEN-LIST</button>
      <button onClick={updateDBCTokenListInPolicy}>UPDATE-DBC-TOKEN-LIST-IN-POLICY</button><br></br>
      <button onClick={getDBCTokensRemaining}>GET-DBC-TOKENS-REMAINING</button> <br></br>
      <button onClick={getDBCMinted}>GET-DBC-MINTED</button><br></br>
      <button onClick={checkPublic}>CHECK-PUBLIC</button><br></br>
      <button onClick={checkWhitelist}>CHECK-WHITELIST</button><br></br>
      <button onClick={updateDBCNftPriceForWhitelist}>UPDATE-DBC-NFT-PRICE-WL</button>
      <button onClick={updateDBCNftPriceForPublic}>UPDATE-DBC-NFT-PRICE-PUBLIC</button><br></br>
      <button onClick={updateMintTime}>UPDATE-MINT-TIME</button>
      <button onClick={getMintPrice}>GET-MINT-PRICE</button><br></br>
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
      <button onClick={getSaleInfoById}>GET-SALE-INFO-BY-ID</button><br></br>

      <button onClick={giftNft}>GIFT-NFT</button><br></br>

      <button onClick={acceptLastBid}>ACCEPT-LAST-BID</button><br></br>

      <button onClick={closeSale}>CLOSE-SALE</button><br></br>

      <button onClick={getVerified}>GET-VERIFIED</button>
      <button onClick={return_all_verified_account}>GET-ALL-VERIFIED-ACCOUNTS</button>
      <button onClick={check_verification_of_account}>CHECK-VERFICATION-STATUS</button><br></br>

      <button onClick={getFee}>GET-FEE</button>
      <button onClick={update_fee}>UPDATE-FEE</button><br></br>

      <button onClick={verification}>VERIFY</button>
      <button onClick={get_account_requested_for_verification}>GET-REQUESTS-VERIFY</button>
      <button onClick={denyVerification}>DENY-VERIFICATION</button>

 

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


