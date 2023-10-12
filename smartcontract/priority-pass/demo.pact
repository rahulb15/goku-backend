(namespace "free")
(define-keyset "free.r" (read-keyset "r"))
(module random DEMO
  (defcap DEMO ()
    (enforce-guard (keyset-ref-guard "free.r")))

    (defschema token-schema
      id:string
      precision:integer
      supply:decimal
      tokens-list:[string]
   )

   (deftable t_t:{token-schema})

   (defun inserting
     (
       id:string
       precision:integer
       supply:decimal
       tokens-list:[string]
       )

      (insert t_t id
        {
          "id":id,
          "precision":precision,
          "supply":supply,
          "tokens-list":tokens-list
          })
    )
    (defun return
      (id:string)
        (read t_t id)
        )
    (defun upt (id:string supply:decimal new_tokens-list:[string])
    (with-read t_t id {
          "tokens-list":=tokens-list
          }
      (update t_t id
        {
          "supply":supply,
          "tokens-list":new_tokens-list
          })

    ))

  )
  (create-table t_t)
  (free.random.inserting
    "abc"
    1
    1.0
    ["a","b","c"]
    )
