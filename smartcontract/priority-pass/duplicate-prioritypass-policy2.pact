(namespace "free")
(define-keyset "free.ppten-ks" (read-keyset "ppten-ks"))
(module policytest10 DUMMPPOLICY

    @doc "Policy for fixed issuance with royalty and quoted sale in specified fungible."

    (defcap DUMMPPOLICY ()
      (enforce-guard (keyset-ref-guard "ppten-ks" )))

    (implements free.dump-v1)

    (use free.dump-v1 [token-info])
    (use util.guards)

    (defcap MINT (account:string)
       (compose-capability (PRIVATE))
     )

     (defcap PRIVATE ()
       true
     )

    (defschema collection-schema

      total-supply:integer ;total supply of tokens that will ever exist
      provenance-hash:string ;sha256 of combined string
      tokens-list:[string] ;list of sha256 of the images that will ever exist
      creator:string
      max-per-txn:integer
      price-per-nft:decimal
      creator-guard:guard
      name:string
     fungible:module{fungible-v2}
    )

     (defschema mint-schema
       tokens-list:[integer]
       current-length:integer
       public-minted:decimal
     )


    (defschema policy-schema
      id:string
     fungible:module{fungible-v2}
      creator:string
      creator-guard:guard
      owner:string
    )

    (defschema account-schema
      account:string
      minted:integer
    )

    (defschema traits-schema
      trait-type:string
      value:string
    )

    (defschema token-metadata
      name:string
      description:string
      image:string
      image-hash:string
      attributes:[object{traits-schema}]
    )

    (deftable policies-table:{policy-schema})
    (deftable collection-info:{collection-schema})
    (deftable mint-status:{mint-schema})
    (deftable account-details:{account-schema})

    (defconst TOKEN_SPEC "token_spec"
      @doc "Payload field for token spec")

    (defconst MINT_STATUS "mint-status")

    (defconst QUOTE-MSG-KEY "quote"
      @doc "Payload field for quote spec")

    (defschema quote-spec
      @doc "Quote data to include in payload"
      price:decimal
      recipient:string
      recipient-guard:guard
      )

    (defconst COLLECTION_INFO "collection-info")


    (defschema quote-schema
      id:string
      spec:object{quote-spec})

    (deftable quotes-table:{quote-schema})

    (defcap QUOTE:bool
      ( sale-id:string
        token-id:string
        amount:decimal
        price:decimal
        sale-price:decimal
        royalty-payout:decimal
        creator:string
        spec:object{quote-spec}
      )
      @doc "For event emission purposes"
      @event
      true
    )

    (defun enforce-ledger:bool ()
      (enforce-guard (passtest10.ledger-guard))
    )


    (defun enforce-bulk-mint:bool (account:string count:integer)
      (enforce-ledger)
      (let* ( (minted:integer (get-account-minted account))
              (collection-info:object{collection-schema} (get-details))
              (max-per-txn:integer (at 'max-per-txn collection-info))
              (total-minted:integer (get-minted))
              (total-supply:integer (get-total-supply))
              (public-minted:decimal (at 'public-minted (get-mint-status)))

            )

           (enforce (<= count max-per-txn)
              (format "You can mint only {} per transaction" [max-per-txn]))
      )
    )





    (defun get-mint-status ()
      (read mint-status MINT_STATUS)
    )

    (defun enforce-mint:string
      ( token:object{token-info}
        account:string
        guard:guard
        amount:decimal
      )
       (enforce-ledger)

       (with-capability (MINT account)
         (let* (
                 (random:integer (get-random account))
                 (current-length:integer (get-current-length))
                 (index:integer (mod random current-length))
                 (available-tokens:[integer] (at 'tokens-list (read mint-status MINT_STATUS)))
                 (sha256:string (int-to-str 64 (at index available-tokens)))
                 (token-id:string (hash sha256))
                 (minted:integer (get-account-minted account))
                 (collection-info:object{collection-schema} (get-details))
                 (creator:string (at 'creator collection-info))
              )

              (coin.transfer account creator (at 'price-per-nft collection-info))

           (update-status
            token-id
            account
            available-tokens
            current-length
            minted
            (str-to-int 64 sha256))

          )
        )
      )


    (defun get-random:integer (account:string)
      (require-capability (PRIVATE))
        (let* ( (prev-block-hash (at "prev-block-hash" (chain-data)))
                (random (str-to-int 64 (hash (+ prev-block-hash (take 20 account)))))
              )
           random
        )
    )

    (defun update-status
      ( token-id:string
        account:string
        available-tokens:[integer]
        current-length:integer
        minted:integer
        minted-token:integer
      )
      (require-capability (PRIVATE))
      (update mint-status MINT_STATUS {
        'tokens-list: (filter (!= minted-token) available-tokens),
        'current-length: (- current-length 1)
        })
      (bind (get-details) {
        'name:= name,
        'creator:= creator,
        'creator-guard:= creator-guard,
        'fungible:= fungible
        }
        (let ((id:string (format "{}:{}" [name token-id])))
          (insert policies-table id {
            "id": id,
            "owner": account,
            "creator-guard": creator-guard,
            "creator": creator,
            "fungible": fungible
          })
        (write account-details account {
          'account: account,
          'minted: (+ minted 1)
          })
        id
      ))
    )

    (defun update-pass-price:string (price:decimal)
      @doc   "Update mint price"
      (enforce (< 0.0 price) "price is not a positive number")
        (with-capability (DUMMPPOLICY)
          (with-read collection-info COLLECTION_INFO {
            "price-per-nft":=old-nft-price
          }
          (update collection-info COLLECTION_INFO {"price-per-nft":price})

          )
        )
    )

    (defun enforce-burn:bool
      ( token:object{token-info}
        account:string
        amount:decimal
      )
      (enforce-ledger)
      ;(enforce false "Burn prohibited")
    )

    (defun enforce-init:bool
      ( token:object{token-info} )
      (enforce-ledger)
      true
    )

    (defun enforce-sale-pact:bool (sale:string)
      "Enforces that SALE is id for currently executing pact"
      (enforce (= sale (pact-id)) "Invalid pact/sale id")
    )

    (defun enforce-transfer:bool
      ( token:object{token-info}
        sender:string
        guard:guard
        receiver:string
        amount:decimal )
      (enforce-ledger)
      (enforce false "Transfer prohibited")
    )

    (defun enforce-crosschain:bool
      ( token:object{token-info}
        sender:string
        guard:guard
        receiver:string
        target-chain:string
        amount:decimal )
      (enforce-ledger)
      (enforce false "Transfer prohibited")
    )


    ;;
    ;; helpers
    ;;



    (defun get-current-length:integer ()
      (with-read mint-status MINT_STATUS {
        'current-length:= current-length
      }
      current-length
      )
    )

    (defun get-policy:object{policy-schema} (token:object{token-info})
      (read policies-table (at 'id token))
    )

    (defun get-account-minted:integer (account:string)
      (with-default-read account-details account
        {"minted": 0}
        {"minted":= minted}
      minted
      )
    )


    (defun get-minted:integer ()
      (with-read mint-status MINT_STATUS {
        'current-length:= current-length
        }
        (- (at 'total-supply (get-details)) current-length)
      )
    )

    (defun get-price:decimal()
     (at 'price-per-nft (get-details))
    )



    (defun get-account-info:object{account-schema} (account:string)
      (read account-details account)
    )

    (defun get-details:object{collection-schema} ()
     (read collection-info COLLECTION_INFO)
    )

    (defun get-total-supply:string ()
     (at 'total-supply (get-details))
    )

    (defun get-owner:string (token-id)
      (at 'owner (read policies-table token-id))
    )

    (defun get-tokens-owned:[string] (account:string)
      (select policies-table ['id] (where "owner" (= account)))
    )

    ;;
    ;; Mint state
    ;;


(defun printtokenlist:integer()
(with-read mint-status MINT_STATUS
  {
    "current-length":=current-length

    }
    current-length
    )
)
    (defun update-tokens-list ()
        ;;will be removed after mint
      (with-capability (DUMMPPOLICY)
        (update mint-status MINT_STATUS {
          'tokens-list: (map (str-to-int 64) (at 'tokens-list (get-mint-status)))
        })
      )
    )

    (defun initialize (
      provenance:string
      tokens-list:[string]
      creator:string
      creator-guard:guard
      total-supply:integer
      max-per-txn:integer
      price-per-nft:decimal
      name:string
      fungible:module{fungible-v2}
    )
       (coin.create-account "passdemoacc10" (read-keyset "ppten-ks") )
      (enforce (= (length tokens-list) total-supply) "Total-supply and tokens-list length does not match")
      (let ( (creator-details:object (fungible::details creator ))
              )
        (enforce (=
          (at 'guard creator-details) creator-guard)
          "Creator guard does not match")

      )

      (insert collection-info COLLECTION_INFO {
        "provenance-hash": provenance,
        "max-per-txn": max-per-txn,
        "total-supply": total-supply,
        "tokens-list": tokens-list,
        "creator": creator,
        "creator-guard": creator-guard,
        "price-per-nft": price-per-nft,
        "name": name,
        "fungible": fungible
      })
      (write mint-status MINT_STATUS {
        "current-length": (length tokens-list),
        "tokens-list": (map (str-to-int 64) tokens-list),
        "public-minted": 0.0
      })
    )


  )


  (create-table quotes-table)
  (create-table policies-table)
  (create-table collection-info)
  (create-table mint-status)
  (create-table account-details)
  (free.policytest10.initialize "dkasnckea"
  ["OnaCvrAsM53g1QOVaAFkw6DcGpQ6vWYn6tBL8stUFSA",
   "ypHr-r69c8ux1DcBn5RZiuX5oWYELwidXDnxNL9VT5I",
   "OnaCvrcGpQ6vWYn6tBL8stUFSA",
    "S4SMB4o64QzXe5rD3tbYtGCVoVbfn5a0OWUZD5JrQP4",
    "gD4YpDuxaTpA83_7Rdp1xXzdiYqmgjAv4No3VwxQs8M",
     "AILSceqfauxaTpA83_7Rdp1xXzdiYqmgjAv4No3Vwaffaa",
     "e6f49aa215eb04be4e69fea7c60e740e03c7aed62c323ac8131f6b2bc3cc18b5",
    "e740e03c7aed62c323ac8131f6b2bc3cc18",
    "WXWtMhRIAiyZU7zuIdbAneIbvmy-eUoCq2CM1_kB4N0",
    "e9wy4eebancw4foil4n4aio",
   "0w94h38whfniezzehnflez",
   "w4h8a0s49haioflzcempoes",
   "e098gfhsajeinpsmmzc-es",
   "odpf90y83g4bwemdsc908gyvu-bw",
   "sp049y8efgibcndp90wus8yhd9oi",
   "speodihfgvhc948ry97eghvdkc",
   "spd0f9v34weuy8sdvjnclm",
   "s0er87gvdznckxmp4gwhuesjcmkd",
  "eifh43849hnfbiau3h92qh3bijknacoi3q",
  "saihefn034h498g9bfjkaenf9hb3jkqdqs",
  "49w8hibdnc93g48ybfc34c",
  "fi34974yfghbincklea9394iuhfnw-ai",
  "iehf93408h9funac9843794hneoldck",
  "94308egbnlkadjhc9b8iw4ekhhfc9b3yuw0ejksdhb8y3u0-wed"
  ,"iowh4obfklw0-349t8349hnfec",
  "ipw4hrfg0349780wefhindcm",
  "reksngl4em-09r38ywgiefbdsnkzlcohuib",
  "40930y89wgfevbcdknlm9yg3uvegrhw-jsd",
   "0498ywef9chjdionlz88u98",
   "e09f83gvwhsdcjizlknxvwservjzidm",
    "WXWtMhRIAiyZU7zuIdbAneIbvmy-eUoCq2CM1_kB4N0",
    "speohfio408w0hojafpl34pkea",
   "409hw0foncli0spjemf-ejsife",
   "e09fhwolnsemdciohsln4ef",
   "vu-0nojsafm-3wqfehioane",
   "oeanipf339qw38gfoacn",
   "aop8efg9oancmpahi3b",
   "p8efgkqamewfkdq3aokmlkwm9oancmpahi3b",
   "diaemon3fq3owjanlfmdlke4eowjofpe",
   "aienfdoqip3jpamklmwdcaio3pjrm-qd3aew-dq3",
   "danifelkmaofgmo4pwmaeklmeoma-fkaef",
   "wiejpifaji3hihq3oanbulnesihaeiniflmeal",
   "edklanlfienafmwmakdm3klmwer3oinalif93hbeldscmk",
   "woj4epnlamf0987ytghjkiu76trfvbnm876rthjn",
   "8765redcvbniuygfvbnmmklo876trdfcvbnmkloi8uytrfcvbn",
   "0o987yyjhjn8njnjnhbnbvfrdtghjnmkjhgfdesdfghjkuytrdsvbnm",
   "9e8hncjandcouehn-sudbajncaijenfkxmmiaeubjc",
   "0-0janiocnSI8dbaubkdjs0qe39fhnojsc-awdq9wedbkajs",
   "oeajhofina30r9hbandkjlskcm",
   "ae-0cjanecouebf",
"f4d2fb2ee53147c23906caf531941137ce81444fa5c5e7121a9f9b53e2ec5deb",
"ebd40f21989c34b72a97abeb338d1504ea9bad9fe060918b22115163440613b0",
"25079c427735cc080b24d8fc274b12c2cfb0a81d092278c62c10fc70aeedcca8",
"ebc066c93e5f1122e1f86df578e06f2d214d1ae715ec984d6c382f98aef83e63",
"569288f7086e479e725d5abf0f67b23dcef96ab10e2a77135e18ceca419d9b68",
"ea776de44b04ac755f7f6e0da4af5153e9a28604aff0dd4272f87d06fb42257a",
"b146f2224cbea6600f61c6fd3649cf29456a90fe993eca1158075b230497a73d",
"712fda683ba319212e5b18c5dae9e2228b287477bdfe0d0b17e310543ae06cf5",
"e52e7164ce1615213d896997dac02223b0f4f09b37c996ce25dddf4bbff6c6d8",
"5554ad5c05718dec1a4926b3efad00af4afd52eb25002df3bb98ec9ee6db9063",
"6319a3e54a3e7b91a111a8d3bc6493c0b8037d05caa5e160596ddd19370b3662",
"19c3f7d4a5f582dd41783ef34bf09bda3d409dbde35efee6c1a33b1e63150ffe",
"e87d020f0708ebac183f47bccce263b1822543c4ffb9cd0a497fef4e86fdac0d",
"fbc5b3725f6a363ed656de95a42f3cbf076cfd224e00b75e9130dca37c9ef054",
"fde0300c47316979e812914d7ea4c1434c21939e765be96f93195d337b4df83d",
"c234d05d2e5f0e811e54a9b12d62ab03c6c41fce5dd3e33848d0eac1efb7b504",
"fe7f872badc34cf87aced39a9516fa2e6578e8d4b225ee77cc3e54d35d83b787",
"3ad410e802e6af119f99fd216e6aa529bd2dde5f5998e7447d1d8dd509c60d2c",
"c22f8d5f3d23708d745932ff5e4633a3580a2bf2806b94ab7c1305b4ccbe5411",
"d65f1e5ae9f090743ecb1fd12688ac88597b2b722781d154820b286ad099929a",
"2ae36dd8fc4ff616637da74c01c90a58a5daba57bff0c5200019736630990b9c",
"4122620561ccf6c3a929632288bba1c44b10f263f06f5564b5b454b4bf87423b",
"c94997305b8f5b6f566b4872c5a66af88b8e3caccff42e65340cc1fa6538db82",
"74a396279bad6328774eb8a5288c4b05d056e2baa83a9197e9b92710c5b66c28",
"370dd1cee10116bf87df532cb3ce6a08a7e14c35b6a8b3a8b6fb4c38a4cb04cc",
"dceb04e3c4ee8c80e9f95e5a1ac6ab1b8ee00765ac28f7d7c560a7707153427c",
"fe7d4d896c2307c420df70f37be311c8fb7e9ba899588ff039ae779da0b0557c",
"e76ed4488334a5b3f178c12dfe237be3b266d8280945fadadab438939ddbcead",
"f6d1f0f003526e7e44e9a4f159664c149345ff955443579b6f1ced44746520df",
"585da259f14e4cefd92ef326c7063f1d237853ddf3929b08ad48f43a9d7e04a0",
"80199800a686aa7a3437455e13bf988cfda53aabe7531e4845ea24a9e7d92c62",
"239356e386655b439bcbfff4a6aee5b7d05ea200f04cd5aadc613305600edd55",
"1fff9469e08f2815d1c22e060168902e33814725f9cd1d28e87263532b44bd6b",
"ab12338e504edefefa62b36067076dcf2d74e9f220f0c272ea56d88479ea3f80",
"62a747d8c8f88bb36325ece8201cb5b1a5c91ff602224f6b65175d01ee6a3ad4",
"2eebc5e8cdc2f1afb2f733b41d70092d171c1d0030ab3d250666f971bbb09cbe",
"7fe3465e834251232523b1be845b8cedd2837cd720886e2300564c66b8744ff9",
"69d94d3ee9b23e302ef357859274f27ce8b2bbe6777f17c08edf1e1cf4389705",
"d70d6dc428f48b04cf7ec797eb5f3abe1badd6c71b9878cc49126526922a096a",
"cc581e173b5c5e69974a758a3d3b2c861b6c881a4347c883d403054be213306f",
"095fbfaecc90df88fc4f1ce3c5505f841b429c547af4330d951a98519e6e7489",
"c7a81cb011fc21821d4b9cbf851003f835f4536867f8c67754cc39c52e301e82",
"79df17b1775cc69c728bbca822886b3d2869588c8470f1179fe89f8d62e35c09",
"e4d047014e4635876410bc6be0f0d5eb9d105de37bdd0b3ae8c022190d1c481a",
"08de285b0c9b71b62224c1108079f2ac450537b070573c655b77fc18ab6b7075",
"bb770776df8632161f05011190d2d96301cd2616315b02acb3a8bd524517361d",
"ad09c8677602da63ff67a3e4c1b86a45778303ffb3ef36fa268865af1e7d1d64",
"7a219da911624c74d2d1055e8b4f64c390c9446fd85749b8a775f19fbaba2ea0",
"f0198201f9bda80fe56745c5d07104044d3d7338dcff8b2ff1221d3253746a1b",
"5635b36726ec7bf857a541d18fc606c0f6ebbc7f0cb2798ced46177516bd6994",
"3cfc3b765b67af2d298fa5b85bdc37e93fe58f5aa909932e134c1dcdb20f1bd5",
"79914f7d24bf6ee80fc529973246fdcc1a6b5795e1e83330d14c4e8002822b2",
"a437dbaa5dd6f7fb00b1a5727626ab6544da5d9653d9b48626379e3a52803f2c",
"d3e269a2fa8063cd44ef57b74009f3d11b4558507ab4b8f4f15628274e221c96",
"7e30b73eb20330b3a29b04e22b314b8a09687cf9434483fe77cd4b0a36f59c6e",
"1c9e7c793323b885b147daf465cb2822cd1a879687e049e9e4e39280d34fc728",
"7492bddfa75cf568c8c3f6682cbdd378746c7496c0fff6d6cee84e18a19294ea",
"adfb09a85cffc7f4f24d3accec864585911b2f061cfe03feab33b3696015d0e2",
"1e213df24d11a9e274e24d6fa21d807b2dd4e256d64128878a3226d84317e890",
"27dea4598f047f54c94726f944725a166cbfcb2b9ab214502d879ad06348297f",
"e4aef72763aa587da1c18c9eb865493865283a5086ea514c9fd441ed0dba50d9",
"bd2ea0c725d7d28bdaa396bb1dc8ebed91e90e41142adac2f8ea38719ee773bd",
"c13c6bf4163188d54aff45a2d486fc5764543df3b16576f5d05c9832e44bccb1",
"1de658f2b8c3a48db5980bdf79f6cbe35e0a8adf947bf4ec98bee6d852debaeb",
"c96faf32b52e715bf0e8453c77c94fe626182d1a11fb0d0031d4cc34967ec55d",
"a9287e872fb4915477c982a2927dbf28a797a9d9c04e551f6dd51b8e577d4834",
"7491cad3e7896c4b80956ab2cea0fed2fb86b68444b33a7b115f836f6fe43489",
"6ccac988fb74268971f6dc19287072eca50a85b20bf645b62b1bb8fabadfa6c7",
"11fd4d63e4dd90a3f5547a87c6e95e3cd8d39c0d1ab9d16674e4c16a3cbd8c50",
"61764d50a31add621a4d3fa85395b967f5e269e8344b1914da0ef677af1f145b",
"0daadbdb697beeff1465cb27762c799d992af5c83979542f97280696c97d6188",
"ecac36c56951d4333942b4cc179073115b71e5623a7254ff5b00e40e51d44bf",
"1db3dc9510107fe4764a137ce772afa3bafbba567a2ae71564cf3779b6629d90",
"d2a4045979dce6b6bf61759552778be70371c871e06cfb4eecfad9ef29ed1a4d",
"e0039f9bde7ad0aad7aca85abe1b30a98ad80802a575a5ea9415f3c2e254e439",
"d43a3f51ee0b7d231c2da279c8a686561f1ce6145304326a8e7054eb041653f5",
"12a5f18adaa4573f1f2ee32456fb88612ee4cc1ddb88746f5383576ed222cb9",
"de1309ad26a7a85616edc5a201a41a9e15a1510627709c78cdd74b3b7eb66b30",
"b5c5267672848bb2ab3e15eec4351e4d8357577c7bb02dd8960aff9a09bb3bc1",
"4495762f49aada1589310c37658c26cf76ed8bfc4cfedd3805ed4d57ddd3585d",
"542a23d4def1c63ba91447d706eb04705233269e0f7c4371cb0708b0e621fb3d",
"14cb20d6fd8056232bf3fb8af8f31a060b388f7e4774e8b4aee72cdc13bd9069",
"d9c1210d15f0f4842f26e6ba200f0a5cbcbb9d8efdca8bd312e72515bf862805",
"1d9490db6744870e2d8595347a2e96498a0ddfaa149636aba6a00974e82cb124",
"6c0df60681b2bfb52c8cf8d3c0b7aa1b4c3f33474ac57d5071d24d3cc5bd36bd",
"4beb505724d8f87003140910ba31a1dccfafd0b2c589bc8c5ad478c9b8c444f0",
"d1ae50cf42b325ec32cf833cef0c0ccd115c467f1b02e2df2de8ea254240d4f9",
"4552e44e60b71fdaed4e7d7bbb0f0bf85bbe88b91d07a1015f1356c3b83bd9b7",
"3c39767b31e2d96daa6c7897fab4d6a2c7a36790edf7d3617a5dfd0839291495",
"ba617d9f2943b44e2fa8d3342bb091987dec0f8ecc48f97cbd51774340faadc0",
"a00b6489d32b72cd515f23d9912fc1cd453d82211d9e6e2930dc015c0e62d381",
"4436a357a0abfbb812bb2070c4a2e31fca180ee61443100edb4bce7ced8e4c16",
"f03dbab63c7d1a05685481c0e4c3985e007bcafd015871f72c120aebd9e2a7db",
"d243605abafdf3963de29eedec1d99ba7da00d39d21f53e12706c7ac2cff1ec9",
"c08d199295112fa04392ac96686f3b5b8d45ad9575246ab113f83337767ee96a",
"cb928b972546ac1d5ec8190b03a117378349d298988b50830c86d0740a5afd21",
"a9bc26116f3b98df6f96a7d6323378139e5030ca8c6f024c18bfc29af79a87ae",
"29bfef056c731b5798efceb03fb069f07b7ef3475a0f172dad032342a23ee3e5",
"d10a9a0e916106a349475b0d6045d180d13f2d5efcf3ed6127273020ff7b0b6f",
"osijhnbdfov9h38976yvbnjkmi98u7y6tfrcvgbhjnkm"
   ]
  "passdemoacc10"
  (read-keyset "ppten-ks")
  150
  1
  2.0
  "PASS"
  coin
  )
