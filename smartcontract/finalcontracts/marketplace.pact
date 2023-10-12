(namespace "free")
(define-keyset "free.marketplacefinalks002" (read-keyset "marketplacefinalks002"))
(module marketplacefinal002 GOVERNANCE

    (defcap GOVERNANCE ()
        (enforce-guard (keyset-ref-guard "free.marketplacefinalks002")))

        (defcap IS_ADMIN ()
             (compose-capability (GOVERNANCE))
        )

        (defcap REFUND () "Internal cap" true)
        (defcap TRANSFER () "Internal cap" true)
        (defcap INTERNAL_CLOSE_SALE () "Internal cap" true)

        (defcap OPEN_SALE (nft_id:string id:string type:string owner:string buy_now_price:decimal sale_start_days:integer sale_end_days:integer on_auction:bool) @event true)
        (defcap CLOSE_SALE (nft_id:string id:string seller:string) @event true)
        (defcap CANCEL_BID (nft_id:string id:string account:string seller:string amount:decimal) @event true)
        (defcap DECLINE_BID (nft_id:string id:string account:string seller:string) @event true)
        (defcap BID (nft_id:string id:string buyer:string seller:string amount:decimal bid_expiration:time)  @event true)
        (defcap OUTBID (nft_id:string id:string account:string last_account:string amount:decimal) @event true)
        (defcap BUY (nft_id:string id:string buyer:string seller:string amount:decimal) @event true)
        (defcap ACCEPT_BID (nft_id:string id:string buyer:string seller:string amount:decimal) @event true)
        (defcap SALE_EXTENDED (nft_id:string id:string buyer:string seller:string) @event true)

        (defconst ADMIN_ACC:string "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf")

        (defcap OWNER (account:string)
            (enforce-guard (at "guard" (coin.details account)))
        )

        (defconst NFT_BANK_ACCT:string "marketplacefinalacc002")

        (defun nft-bank-guard () (create-module-guard "bank"))

        (defconst SERVICE_FEE:decimal 0.02)

        (defschema royalty-schema
            id:string
            percentage:decimal
            account:string
        )

        (deftable royalty:{royalty-schema})

        (defschema sale-schema
            id:string
            type:string
            owner:string
            closed:bool
            can_buy_now:bool
            buy_now_price:decimal
            sale_start_date:time
            sale_end_date:time
            last_offer:decimal
            last_offer_account:string
            offer_end_date:time
            on_auction:bool ;;true->bid false->direct-sale
        )
        (deftable sale:{sale-schema})

        (defschema verification-schema
          account:string
          approved:bool
        )

        (deftable verification-ledger:{verification-schema})

        (defschema saleInfo
          id:string
          type:string
          )

        (deftable direct-sale-ledger:{saleInfo})
        (deftable auction-sale-ledger:{saleInfo})

        (defun now () (at "block-time" (chain-data)))

        (defun create-nft-collection
            ( name:string
              symbol:string
              total-supply:integer
              guard:guard
              creator:string
              tokens-list:[string]
              price:decimal
              policy:module{kip.token-policy-v1}
              imageUrl:string
            )
          (with-read fee-ledger FEE
              {
                "collection-creation":=collection-creation
              }
          (coin.transfer creator ADMIN_ACC collection-creation)
          (merchfinal001.nft-collection-request
            name
            symbol
            total-supply
            guard
            creator
            tokens-list
            price
            policy
            imageUrl
            )
          )

          (insert collection-info name
            {
              "creator":creator
              })

      )

        (defun get-royalty (id:string)
            (with-default-read royalty id {"id":id, "percentage":0.0, "account":""} {"id":=id, "percentage":=percentage, "account":=account}
                {
                    "id":id,
                    "percentage":percentage,
                    "account":account
                }
            )
        )

        (defun set-royalty (id:string percentage:decimal account:string)
            (with-capability (IS_ADMIN)
                (write royalty id {"id":id, "percentage":percentage, "account":account})
            )
        )

        (defun get-sale (id:string)
                (read sale id)
        )

        (defun get-all-id-on-sale ()
         (keys sale)
        )

        (defun get-last-bid (token-id:string)
          (with-read sale token-id
            {
              "last_offer_account":=last_offer_account,
              "last_offer":=last_offer
            }
          (format "User with {} has bid {} KDA" [last_offer_account last_offer])
          )
        )

        (defun get-id-on-direct-sale ()
         (keys direct-sale-ledger)
        )

        (defun get-id-on-auction ()
         (keys auction-sale-ledger)
        )

        (defun gift-nft (id:string owner:string receiver:string)
                (with-capability (TRANSFER)
                    (install-capability (marmalade.ledger.TRANSFER id owner receiver 1.0))
                    (marmalade.ledger.transfer-create id owner receiver (at "guard" (coin.details receiver)) 1.0)
                )
            )

        (defun open-sale (type:string id:string owner:string buy_now_price:decimal sale_start_days:integer sale_end_days:integer on_auction:bool)
            (with-default-read sale id {"closed": true} {"closed":= current_sale_closed}
                (enforce (= true current_sale_closed) "Previous sale not closed")
                (let* (
                                (owner_details (coin.details owner))
                                (token_details (marmalade.ledger.details id owner))
                                (can_buy_now (> buy_now_price 0.0))
                                (sale_id (hash [id, owner (now)]))
                            )
                            (enforce (> (at "balance" token_details) 0.0) "Token balance is 0")
                            (marmalade.ledger.transfer-create id owner NFT_BANK_ACCT (nft-bank-guard) 1.0)
                            (emit-event (OPEN_SALE id sale_id type owner buy_now_price sale_start_days sale_end_days on_auction))
                            (write sale id {
                                "closed": false,
                                "id": sale_id,
                                "type": type,
                                "can_buy_now": can_buy_now,
                                "owner": owner,
                                "buy_now_price": buy_now_price,
                                "last_offer":0.0,
                                "last_offer_account": "",
                                "sale_start_date":(add-time (now) (days sale_start_days)),
                                "sale_end_date":(add-time (now) (days sale_end_days)),
                                "offer_end_date":(now),
                                "on_auction":on_auction
                    })
                    (if (= false on_auction)
                      [(write direct-sale-ledger id
                        {
                          "id": id,
                          "type":type
                          })]

                        [(write auction-sale-ledger id
                            {
                              "id": id,
                              "type":type
                              })]
                    )
                )
            )
        )

        (defun refund-bid (account:string amount:decimal)
            (require-capability (REFUND))
            (install-capability (coin.TRANSFER NFT_BANK_ACCT account (+ amount (* amount SERVICE_FEE))))
            (if (> amount 0.0)
                    (coin.transfer NFT_BANK_ACCT account (+ amount (* amount SERVICE_FEE)))
                    "Nothing to refund "
            )
        )

        (defun close-sale (id:string)
            (with-read sale id {"id":=sale_id, "owner":=sale_owner, "closed":=sale_closed, "last_offer_account":=last_offer_account, "last_offer":=last_offer}
                (enforce (= false sale_closed) "Sale already closed")
                (enforce-guard (at "guard" (coin.details sale_owner)))
                (if (> last_offer 0.0)
                    (emit-event (DECLINE_BID id sale_id last_offer_account sale_owner))
                    "No bids"
                )
                (with-capability (REFUND)
                    (refund-bid last_offer_account last_offer)
                )
                (with-capability (INTERNAL_CLOSE_SALE)
                    (internal-close-sale sale_id id sale_owner)
                )

            )
        )

        (defun internal-close-sale-rotate (id:string sale_owner:string)
            (require-capability (INTERNAL_CLOSE_SALE))
            (install-capability (marmalade.ledger.ROTATE id sale_owner))
            (marmalade.ledger.rotate id sale_owner (at "guard" (coin.details sale_owner)))
        )

        (defun internal-close-sale-transfer (id:string sale_owner:string)
            (require-capability (INTERNAL_CLOSE_SALE))
            (install-capability (marmalade.ledger.TRANSFER id NFT_BANK_ACCT sale_owner 1.0))
            (if (= 1.0 (marmalade.ledger.get-balance id NFT_BANK_ACCT))
                (marmalade.ledger.transfer id NFT_BANK_ACCT sale_owner 1.0)
                ""
            )
        )

        (defun internal-close-sale (sale_id:string id:string sale_owner:string)
            (emit-event (CLOSE_SALE  id sale_id sale_owner))
            (require-capability (INTERNAL_CLOSE_SALE))
            (internal-close-sale-transfer id sale_owner)
            (update sale id {"closed": true, "last_offer": 0.0, "last_offer_account": ""})
        )

        (defun accept-last-bid (id:string)
            (with-read sale id {"id":=sale_id, "closed":=closed, "owner":=sale_owner, "last_offer":=last_offer, "last_offer_account":=last_offer_account}
                (enforce (= false closed) "Sale closed")
                ; (enforce-guard (at "guard" (coin.details sale_owner)))
                (let* (
                    (last_offer_whithout_service_fees (- last_offer (* last_offer SERVICE_FEE)))
                    (royalty (get-royalty id))
                    (royalty_payout (* last_offer_whithout_service_fees (at "percentage" royalty)))
                    (seller_payout (-  last_offer_whithout_service_fees royalty_payout))
                    (royalty_account (at "account" royalty))

                )


                    (if (= sale_owner royalty_account)
                        (install-capability (coin.TRANSFER NFT_BANK_ACCT (at "account" royalty) last_offer_whithout_service_fees))
                        (install-capability (coin.TRANSFER NFT_BANK_ACCT (at "account" royalty) royalty_payout))
                    )
                    (if (> royalty_payout 0.0) (coin.transfer NFT_BANK_ACCT (at "account" royalty) royalty_payout) "No royalty")


                    (install-capability (coin.TRANSFER NFT_BANK_ACCT sale_owner seller_payout))
                    (coin.transfer NFT_BANK_ACCT sale_owner seller_payout)

                    (install-capability (marmalade.ledger.TRANSFER id NFT_BANK_ACCT last_offer_account 1.0))
                    (marmalade.ledger.transfer-create id NFT_BANK_ACCT last_offer_account (at 'guard (coin.details last_offer_account)) 1.0)

                    (emit-event (ACCEPT_BID id sale_id last_offer_account sale_owner last_offer))

                    (with-capability (INTERNAL_CLOSE_SALE)
                        (internal-close-sale sale_id id sale_owner)
                    )

                )
            )
          )

        (defun buy (id:string buyer:string)
                (with-read sale id {"id":=sale_id, "closed":=closed, "can_buy_now":=can_buy_now, "buy_now_price":=buy_now_price, "owner":=owner, "last_offer":=last_offer, "last_offer_account":=last_offer_account,"on_auction":=on_auction}
                    (enforce (= false on_auction) "Nft on auction")
                    (enforce (= false closed) "Sale is closed")
                    (enforce (= true can_buy_now) "Token not for sale")
                    (enforce (!= owner buyer) "Can't buy your own token")
                    (enforce (!= buyer NFT_BANK_ACCT) "Users only")
                    (let* (

                        (service_fees (* buy_now_price SERVICE_FEE))
                        (buy_now_price_whithout_service_fees (- buy_now_price service_fees))
                        (royalty (get-royalty id))
                        (royalty_account (at "account" royalty))
                        (royalty_payout (* buy_now_price_whithout_service_fees (at "percentage" royalty)))
                        (seller_payout (-  buy_now_price_whithout_service_fees royalty_payout))
                        (seller_service_fee (* seller_payout SERVICE_FEE))
                    )
                        (coin.transfer buyer NFT_BANK_ACCT (* 2 (* buy_now_price SERVICE_FEE)))
                        (coin.transfer buyer owner seller_payout)

                        (if (and (> royalty_payout 0.0) (!= buyer royalty_account)) (coin.transfer buyer royalty_account royalty_payout) "")

                        (install-capability (marmalade.ledger.TRANSFER id NFT_BANK_ACCT buyer 1.0))
                        (marmalade.ledger.transfer-create id NFT_BANK_ACCT buyer (at 'guard (coin.details buyer)) 1.0)
                        (if (> last_offer 0.0)
                            (emit-event (OUTBID id sale_id buyer last_offer_account last_offer))
                            "No outbid"
                        )
                        (with-capability (REFUND)
                            (refund-bid last_offer_account last_offer)
                        )
                        (emit-event (BUY  id sale_id buyer owner buy_now_price))
                        (with-capability (INTERNAL_CLOSE_SALE)
                            (internal-close-sale sale_id id owner)
                        )
                    )
                )
        )

        (defun bid (id:string buyer:string amount:decimal bid_days:integer)
            (with-read sale id {"id":=sale_id,"on_auction":=on_auction, "closed":=closed, "last_offer":=last_offer, "type":=type, "last_offer_account":=last_offer_account, "sale_end_date":=sale_end_date, "owner":=sale_owner}
                (enforce (!= on_auction false) "Not open for auction/biding")
                (enforce (!= buyer sale_owner) "Can't buy your own token")
                (enforce (= false closed) "Sale is closed")
                (enforce (> amount last_offer) "Amount lower than last offer")
                (enforce (!= buyer NFT_BANK_ACCT) "Users only")

                (coin.transfer buyer NFT_BANK_ACCT (+ amount (* amount SERVICE_FEE)))
                (if (> last_offer 0.0)
                    (emit-event (OUTBID id sale_id buyer last_offer_account last_offer))
                    "No outbitd"
                )
                (with-capability (REFUND)
                    (refund-bid last_offer_account last_offer)
                )

                (let* (
                    (new_sale_end_date (if (= "time" type) (if ( > (add-time (now) (minutes 10)) (time sale_end_date))  (add-time (time sale_end_date) (minutes 10)) (time sale_end_date)) sale_end_date))
                    (offer_end_date (add-time (now) (days (if (< bid_days 3) 3 bid_days))))
                )
                    (emit-event (BID id sale_id buyer sale_owner amount offer_end_date))
                    (if (= sale_end_date new_sale_end_date)
                        "Sale not extended"
                        (emit-event (SALE_EXTENDED id sale_id buyer sale_owner))
                    )
                    (update sale id {"last_offer": amount, "last_offer_account": buyer, "sale_end_date": new_sale_end_date, "offer_end_date": offer_end_date})
                )
            )
        )

        (defun cancel-bid (id:string)
            (with-read sale id {"id":=sale_id, "closed":=closed, "owner":=sale_owner, "last_offer":=last_offer, "type":=type, "last_offer_account":=last_offer_account, "offer_end_date":=offer_end_date}
                (enforce-guard (at "guard" (coin.details last_offer_account)))
                (enforce (> last_offer 0.0) "Bid already canceled")
                (enforce (> (now) offer_end_date) "Can't cancel bid yet")
                (update sale id {"last_offer": 0.0, "last_offer_account": ""})
                (emit-event (CANCEL_BID id sale_id last_offer_account sale_owner last_offer))
                (with-capability (REFUND)
                    (refund-bid last_offer_account last_offer)
                )
            )
        )

        (defun decline-bid (id:string)
            (with-read sale id {"id":=sale_id, "closed":=closed, "last_offer":=last_offer, "type":=type, "last_offer_account":=last_offer_account, "offer_end_date":=offer_end_date, "owner":=sale_owner}
                (enforce-guard (at "guard" (coin.details sale_owner)))
                (enforce (> last_offer 0.0) "Bid already canceled")
                (update sale id {"last_offer": 0.0, "last_offer_account": ""})
                (emit-event (DECLINE_BID id sale_id last_offer_account sale_owner))
                (with-capability (REFUND)
                    (refund-bid last_offer_account last_offer)
                )
            )
        )


       ; ============================================
       ; ==           Verification Code          ==
       ; ============================================
       ;;owner
       ;;approved->false->true
       (defschema request-schema
         request:bool
         approved:bool
       )

       (defschema request
           account:string
           request:bool
           approved:bool
        )

       (deftable verification-request:{request-schema})
       (deftable verification-request-for-all:{request})

       (defconst REQUEST:string "request")

       (defun get-verified (account:string)
           (with-read fee-ledger FEE
             {
               "verification-fee":=verification-fee
             }
             (coin.transfer account ADMIN_ACC verification-fee)
           )
           (insert verification-request account
             {
               "request":true,
               "approved":false
             }
           )

           (write verification-request-for-all account
             {
               "account":account,
               "request":true,
               "approved":false
             }
           )
         )

         (defun verification (account:string)
          (with-capability (IS_ADMIN)
             (update verification-request account
               {
                 "approved":true
               }
             )
             (write verification-ledger account
               {
                 "account":account,
                 "approved":true
               }
             )
           )
           )

           (defun get-account-requested-for-verification()
            (keys verification-request-for-all )
           )

           (defun check-verification-of-account (account:string)
             (with-read  verification-request account
               {
                 "request":=request,
                 "approved":=approved
               }
               (if (= approved true) "Account is verified."
                 (if(= request true)
                   "Verification is pending"
                   "Apply for verification")
               )
             )
           )

           (defun return-all-verified-account ()
             (keys verification-ledger )
           )

           ;; fucntion set and get verification fee ->done
           ;; get-verified usr->owner kda
           ;; ek table req->true approved->false
           ;; owner dekh sake req kisnbe krni hai

           (defschema fee-schema
             marketplace-fee:decimal
             verification-fee:decimal
             collection-creation:decimal
           )

           (deftable fee-ledger:{fee-schema})

           (defun update-fee (fee:decimal type:string)
             @doc   "Update mint price"
             (enforce (< 0.0 fee) "fee is not a positive number")
             (with-capability (IS_ADMIN)
             (with-read fee-ledger FEE
               {
                 "marketplace-fee":=marketplace-fee,
                 "verification-fee":=verification-fee,
                 "collection-creation":=collection-creation
               }
               (cond
                 ((= type "marketplace")
                   [ (update fee-ledger FEE
                      {"marketplace-fee":fee}
                     )
                     (format "Updated Marketplace Serive Fee from {} to {}" [marketplace-fee fee])]
                 )
                 ((= type "verification")
                   [ (update fee-ledger FEE
                      {"verification-fee":fee})
                     (format "Updated Verification Fee from {} to {}" [verification-fee fee])]
                  )

                  ((= type "collection-creation")
                    [ (update fee-ledger FEE
                       {"collection-creation":fee})
                      (format "Updated collection-creation Fee from {} to {}" [collection-creation fee])]
                   )
                 ["Conditions not met"]
               )
             )
             )
           )

           (defun get-fee (type:string)
             (cond
               ((= type "marketplace")
                 [(with-read fee-ledger FEE
                   {
                     "marketplace-fee":=marketplace-fee
                   }
                   (format "The fees for marketplace is {} %" [marketplace-fee])
                 )]
               )
               ((= type "verification")
                 [
                 (with-read fee-ledger FEE
                   {
                     "verification-fee":=verification-fee
                   }
                   (format "The fees for verification is {} KDA" [verification-fee])
                 )]
               )

               ((= type "collection-creation")
                 [
                 (with-read fee-ledger FEE
                   {
                     "collection-creation":=collection-creation
                   }
                   (format "The fees for collection-creation is {} KDA" [collection-creation])
                 )]
               )
              ["Invalid type"]
             )
           )

           (defun deny-verification (account:string)
               (with-capability (IS_ADMIN)
               (with-read fee-ledger FEE
                 {
                   "verification-fee":=verification-fee
                 }
               (install-capability (coin.TRANSFER ADMIN_ACC account verification-fee))
               (coin.transfer ADMIN_ACC account verification-fee)
               )
           )
          )

          (defschema collectionInfo
            creator:string
          )

          (deftable collection-info:{collectionInfo})

          (defun deny-collection (name:string)
              (with-capability (IS_ADMIN)
              (with-read fee-ledger FEE
                {
                  "collection-creation":=collection-creation
                }
              (with-read collection-info name
                {
                  "creator":=creator
                }
              (install-capability (coin.TRANSFER ADMIN_ACC creator collection-creation))
              (coin.transfer ADMIN_ACC creator collection-creation)
              )
            )
          )
         )

           (defconst FEE:string "fee")




       ; ============================================


       (defun init
         (
           marketplace-fee:decimal
           verification-fee:decimal
           collection-creation:decimal
         )
         ; (coin.create-account ADMIN_ACC (nft-bank-guard))
        (coin.create-account NFT_BANK_ACCT (nft-bank-guard))
        "empty lock succeeded"
        (insert fee-ledger FEE
         {
           "marketplace-fee":marketplace-fee,
           "verification-fee":verification-fee,
           "collection-creation":collection-creation
         }
        )
       )



)

(create-table sale)
(create-table royalty)
(create-table verification-ledger)
(create-table fee-ledger)
(create-table verification-request-for-all)
(create-table verification-request)
(create-table auction-sale-ledger)
(create-table direct-sale-ledger)
(create-table collection-info)

(free.marketplacefinal002.init 0.01 2.0 1.0)
