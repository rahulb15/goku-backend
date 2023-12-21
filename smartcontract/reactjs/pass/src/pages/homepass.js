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

  const NETWORK_ID = "mainnet01";
  const GAS_PRICE = 0.0000001;
  const GAS_LIMIT = 150000;
  const TTL = 28000;
  const CHAIN_ID = "8";
  const creationTime = () => Math.round((new Date()).getTime() / 1000) - 15;
  const API_HOST = `https://api.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
  const { kadena } = window;
  const GAS_STATION = 'election-gas-station';
 
  const mint_pass = async () => {
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

    const pactCode=`(free.testpasscontract4.mint-pass ${JSON.stringify(a)} (read-keyset "guard") 1.0 "pass1" 1)`
     const signCmd = {
      pactCode:pactCode,
     caps:[
         Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
         Pact.lang.mkCap("MERCH","Capability for owner", "free.testpasscontract4.PASS"),
         Pact.lang.mkCap("Transfer","Capability to allow coin transfer","coin.TRANSFER",
            [a, b, 1.0]
          ), 
        Pact.lang.mkCap("MINT-PASS","Capability for owner", "free.testpasscontract4.MINT-PASS",
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
 
  const create_col = async () => {
    const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
    const publicKey=accountName.slice(2, accountName.length);
    console.log("publicKeycw",publicKey)
    console.log("accountnamecw",accountName)
    const guard={ keys: [publicKey],pred: "keys-all",}

    const a = accountName
    const b = "passdemoacc15"
    const c = "pass1"
    const d = "p1"


   
   const pactCode=`(free.testpasscontract4.create-collection  "pass1" "p1" 25 free.testpasspolicy2 (read-keyset "guard") ${JSON.stringify(a)}   
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
        Pact.lang.mkCap("COLLECTION-CREATED","Collection created","free.testpasscontract4.CREATE-COLLECTION",[c, d]),
        Pact.lang.mkCap("PASS","Capability for owner", "free.testpasscontract4.PASS")]
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


const getAllCollection = async () => {

    const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
    const publicKey1=accountName1.slice(2, accountName1.length);
    const guard1={ keys: [publicKey1],pred: "keys-all",}

    const a = accountName1

    const pactCode=`(free.testpasscontract4.get-all-collection)`
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

const getPassBalance = async () => {

    const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
    const publicKey1=accountName1.slice(2, accountName1.length);
    const guard1={ keys: [publicKey1],pred: "keys-all",}

    const a = accountName1

    const pactCode=`(free.testpasscontract4.get-passbalance ${JSON.stringify(a)})`
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

const getOwner = async () => {

  const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const publicKey1=accountName1.slice(2, accountName1.length);
  const guard1={ keys: [publicKey1],pred: "keys-all",}

  const a = accountName1
  const b = "pass1:uwYMMSAJ4zPLkfYLr1YHM7uMpUDsl54CD5BQ4UOJuCI"

  const pactCode=`(free.testpasspolicy2.get-owner ${JSON.stringify(b)})`
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

const getTokensOwned = async () => {

  const accountName1="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
  const publicKey1=accountName1.slice(2, accountName1.length);
  const guard1={ keys: [publicKey1],pred: "keys-all",}

  const a = accountName1
  // const b = ""

  const pactCode=`(free.testpasspolicy2.get-tokens-owned ${JSON.stringify(a)})`
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

  const pactCode=`(free.testpasspolicy2.get-price)`
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

  const pactCode=`(free.testpasspolicy2.get-minted)`
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

  const pactCode=`(free.testpasspolicy2.get-account-minted ${JSON.stringify(a)} )`
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

  const pactCode=`(free.testpasspolicy2.get-current-length )`
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
 *                                  ADMIN-FUNCTIONS
 * 
 * 
 */
const updateTokenList = async () => {

    const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
    const publicKey=accountName.slice(2, accountName.length);
    const guard={ keys: [publicKey],pred: "keys-all",}

    const a = accountName

    const pactCode=`(free.testpasscontract4.updatetokenlist ["08e465b9e7569f7a22ca88e0412460c8626d1d4a5be5ac5af8971d8f904e145e",
                                                             "1f2d81d280a80c03a55d5cd05f3ae44338f86012b72ee9a2e1656e6db62dab1d"] "pass1")`
     const signCmd = {
      pactCode:pactCode,
     caps:[
         Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
         Pact.lang.mkCap("PASS","Capability for owner", "free.testpasscontract4.PASS")
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

const updateTokenListInPolicy = async () => {

    const accountName="k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf"
    const publicKey=accountName.slice(2, accountName.length);
    const guard={ keys: [publicKey],pred: "keys-all",}

    const a = accountName

    const pactCode=`(free.testpasspolicy2.insert-new-tokens-list ["08e465b9e7569f7a22ca88e0412460c8626d1d4a5be5ac5af8971d8f904e145e",
                                                      "1f2d81d280a80c03a55d5cd05f3ae44338f86012b72ee9a2e1656e6db62dab1d"])`
     const signCmd = {
      pactCode:pactCode,
     caps:[
         Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
         Pact.lang.mkCap("PASS","Capability for owner", "free.testpasspolicy2.PASSPOLICY")
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

    const pactCode=`(free.testpasspolicy2.update-pass-price 2.0)`
     const signCmd = {
      pactCode:pactCode,
     caps:[
         Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
         Pact.lang.mkCap("PASS","Capability for owner", "free.testpasspolicy2.IS_ADMIN")
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

  return (
    <div>
      
      <button onClick={mint_pass}>MINT-PASS</button>
      <button onClick={create_col}>CREATE-COL</button>
      <button onClick={getPassBalance}>GET-PASS-BALANCE</button>
      <button onClick={updateTokenList}>UPDATE-TOKEN-LIST</button>
      <button onClick={updatePassPrice}>UPDATE-PASS-PRICE</button>
      <button onClick={updateTokenListInPolicy}>UPDATE-TOKEN-LIST-IN-POLICY</button>
      <button onClick={getOwner}>GET-OWNER</button>
      <button onClick={getTokensOwned}>GET-TOKENS-OWNED</button>
      <button onClick={getPassPrice}>GET-PASS-PRICE</button>
      <button onClick={getMinted}>GET-MINTED</button>
      <button onClick={getAccountMinted}>GET-ACCOUNT-MINTED</button>
      <button onClick={getTokensRemaining}>GET-TOKENS-REMAINING</button>


      {/* 
      <button onClick={mint_cooper}>BUY-DBCOOPER</button>
      <button onClick={create_tkn}>CREATE_TKN</button>
      <button onClick={get_balance}>BALANCE</button>
      <button onClick={addwl}>ADDWL</button>
      <button onClick={getAllCollection}>GET-COLLECTION</button>
      <button onClick={sale_dbc}>SALE</button> */}

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


