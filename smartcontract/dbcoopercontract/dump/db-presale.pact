(namespace "free")
(define-keyset "free.db-sale-ks" (read-keyset "db-sale-ks"))

(module dbc-pre-sale COPPER

  (use util.guards)


  (defschema whitelist-schema
    accounts:[string]
  )

  (defschema sale
    status:string
    price:decimal)

  (deftable whitelists:{whitelist-schema})
  (deftable sale-status:{sale})

  (defcap COPPER ()
    (enforce-guard
      (keyset-ref-guard "free.db-sale-ks")))






  (defconst COPPER_BANK:string "babena-bank")
  (defconst SALE_START_TIME:time (time "2022-05-16T00:00:00Z"))
  (defconst WHITELIST_TIME:time (time "2022-05-14T00:00:00Z"))
  (defconst END_TIME:time (time "2022-06-02T16:30:00Z"))
  (defconst COPPER_SALE_SUPPLY:decimal 1000.0)

  (defconst SALE_STATUS "sale-status")
  (defconst SALE_PAUSED "sale-paused")
  (defconst SALE_STARTED "sale-started")

  (defun init (accounts:[string])
    (with-capability (COPPER)
      (coin.create-account "babena-bank" (create-module-guard "babena-bank"))
      (insert whitelists "" {
        'accounts: accounts
        })
      (insert sale-status SALE_STATUS {
        'status: SALE_STARTED,
        'price: 0.0
      })
    )
  )

  (defun enforce-whitelist (account)
    (let ( (accounts:[string] (at 'accounts (read whitelists ""))))
      (enforce (contains account accounts) "You are not whitelisted")
      (enforce-guard (at-after-date WHITELIST_TIME))
      (enforce-guard (at-before-date SALE_START_TIME))
    )
  )


  (defun update-sale-price:string (price:decimal)
    @doc   "Update sale price "
    (enforce (< 0.0 price) "price is not a positive number")
      (with-capability (COPPER)
        (with-read sale-status SALE_STATUS {
          "price":=oldPrice}
            (update sale-status SALE_STATUS {"price":price})
              (format "Kda/Usd sale price updated: old price {} | new price {}" [oldPrice, price])
        )
      )
  )

  (defun get-sale-price:decimal ()
    (at 'price (read sale-status SALE_STATUS))
  )
  (defun get-sale-supply:decimal ()
     BABENA_SALE_SUPPLY
   )
)

     (create-table whitelists)
     (create-table sale-status)
     (init [])
