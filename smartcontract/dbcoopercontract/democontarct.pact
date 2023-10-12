(namespace "free")
(define-keyset "free.aryacontract-ks" (read-keyset "aryacontract-ks"))
(module printchaindata DATA

    (defcap DATA ()
      (enforce-guard (keyset-ref-guard "free.aryacontract-ks")))

    (defun printchaindata()
      (chain-data)
      )
  )
