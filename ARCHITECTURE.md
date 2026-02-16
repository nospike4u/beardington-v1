## Architecture Diagram
```mermaid
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

    <!-- https://mermaid.ai/app/projects/9122d413-6f3e-4faf-8fab-69a5a288ba88/diagrams/5ce01a3a-42bc-4cc2-b18b-a8f488f30a46/version/v0.1/edit -->
```