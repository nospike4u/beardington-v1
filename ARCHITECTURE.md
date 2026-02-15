flowchart LR
 subgraph Client["Browser (Vanilla JS)"]
        UI["Catalog / Product / Cart / Checkout UI"]
  end
 subgraph Server["Node.js HTTP Server"]
        API["REST API (Products, Cart, Orders), Authentication"]
        Zod["Zod Validation"]
  end
 subgraph Cache["Redis"]
        R["Cache: products, sessions, carts"]
  end
 subgraph DB["Database (SQLite/Postgres)"]
        P["Products"]
        O["Orders"]
        U["Users (later)"]
  end
    UI -- fetch --> API
    API --> Zod
    API -- read/write --> DB
    API -- cache --> R
    R -- cache hits --> API