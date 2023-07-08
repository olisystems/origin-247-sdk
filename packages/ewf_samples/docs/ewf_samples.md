## Prerequisites
Before running the script, ensure that you have the following prerequisites:

- The modules in EWF-24/7 SDK has been already built

- TypeScript: Install TypeScript globally on your system.

- ts-node: Install ts-node globally on your system. It allows executing TypeScript files directly without the need for compilation.

- Python: Install Python globally on your system

####To run this script type 
```python
python run_computation.py
```


## Product Overview
- Energy Data Management: The SDK provides tools for securely storing, retrieving, and managing energy-related data, such as energy consumption, production, and certification information.

- Decentralized Energy Marketplaces: Developers can utilize the SDK to create decentralized energy marketplaces where energy producers and consumers can trade energy directly, bypassing intermediaries and enabling peer-to-peer energy transactions.

- Energy Certificate Tracking: The SDK facilitates the tracking and verification of energy certificates, ensuring the transparency and integrity of renewable energy claims and transactions.

- Smart Contract Interactions: Developers can interact with smart contracts deployed on the EWF platform using the SDK's APIs, making it easier to execute transactions, read data, and trigger contract events.

### Origin 24/7 SDK Claim Package
- Origin 24/7 SDK that provides functionality for matching energy generation with consumption and claiming certificates on the blockchain. It also includes features for storing matching results.

- The package offers a ClaimFacade that can be injected into your service to perform matching and retrieve matching results. You can customize the claiming process by providing a matching algorithm and a customization function.

- To use this package, you need a Nest.js application and a configured TypeORM setup. After installing the package, you import the ClaimModule into your application and add the module's entities to the TypeORM configuration.

```mermaid
flowchart TD;

subgraph Certificate Operations
    A[Job(BlockchainAction)] -->|data.type| B{Action Type}
    B -->|Issuance| C[issue(data.payload)]
    B -->|Transfer| D[transfer(data.payload)]
    B -->|Claim| E[claim(data.payload)]
    B -->|BatchIssuance| F[batchIssue(data.payload)]
    B -->|BatchTransfer| G[batchTransfer(data.payload)]
    B -->|BatchClaim| H[batchClaim(data.payload)]
end

subgraph Action Results
    C -->|issuanceTx| I{waitForNewCertificates}
    I -->|certificateId| J(Return IssuanceActionResult)
    D -->|transferTx| K{waitForTransaction}
    K -->|transactionHash| L(Return TransferActionResult)
    E -->|claimTx| M{waitForTransaction}
    M -->|transactionHash| N(Return ClaimActionResult)
    F -->|batchIssuanceTx| O{waitForNewCertificates}
    O -->|certificateIds| P(Return BatchIssuanceActionResult)
    G -->|batchTransferTx| Q{waitForTransaction}
    Q -->|transactionHash| R(Return BatchTransferActionResult)
    H -->|batchClaimTx| S{waitForTransaction}
    S -->|transactionHash| T(Return BatchClaimActionResult)
end
```



### Origin 24/7 SDK Certificate Package
- The Origin 24/7 SDK's Certificate module allows for the deployment of contracts, issuance, transfer, and claiming of certificates. It handles transaction batching and enqueuing for optimal blockchain performance.

- The module provides an off-chain implementation that stores data in a local database and synchronizes it with the blockchain upon request. This allows for immediate changes and flexibility in synchronization.

- The Origin 24/7 SDK's Certificate module provides functionality for on-chain operations such as deploying contracts, issuing, transferring, and claiming certificates on the blockchain.

### Origin 24/7 SDK Transfer Package
- The Origin 24/7 SDK Transfer module enables the issuance and transfer of energy certificates on the blockchain.

- The Transfer module integrates with Nest.js applications and requires TypeORM configuration.

- Users can send generation events to the CQRS event bus, implement transfer site queries, and add validators for transfer validation.

### Origin 24/7 SDK Energy Packege
- The Energy API module is responsible for managing meter readings and creating precise proofs for the readings.

- It is designed to be used with 24/7 applications that utilize the Origin SDK and other 24/7 packages.

- The module stores the readings in InfluxDB and provides features such as batching readings for proof creation, queuing proof issuance to avoid conflicts, and handling errors during proof creation.


## Claim Diagram
The Claim Diagram illustrates the flow of computations and matching in a claim processing system. It consists of three main components: Computations, SpreadMatcher, and Main.

### SpreadMatcher
The SpreadMatcher component is responsible for matching entity groups based on their priorities. It receives input from the EntityGroups and GroupPriority entities and generates a Result based on the matches found.

### Computations
The Computations component performs various computations using the BigNumber library. It takes two input numbers, Number1 and Number2, and performs addition (Sum) and multiplication (Product) operations using the BigNumber library. The results are then converted to strings using the toString function.

### Main
The Main component orchestrates the overall claim processing flow. It calls the Computations component, passes the results to the SpreadMatcher component, and receives the matching Result. The Result is then processed in the ClaimCommands entity, where each match is mapped to a Claim Command. Finally, the generated Claim Commands are logged in the console.


```mermaid
graph TD;

subgraph Computations
    A(Number1) -->|BigNumber| C(Sum)
    B(Number2) -->|BigNumber| C
    C -->|toString| D
    A -->|BigNumber| E(Product)
    B -->|BigNumber| E
    E -->|toString| F(Product: 50)
end

subgraph SpreadMatcher
    G(EntityGroups)
    H(GroupPriority)
    G -->|EntityGroups| J
    H -->|GroupPriority| J
end

subgraph Main
    I(performComputations) -->|Call function| Computations
    J -->|SpreadMatcher| K(Result)
    K -->|matches| L
    L --> M(ClaimCommands)
    M -->|map| N
    N -->|Claim Commands| O
    O --> P(Claim Commands)
end

Computations --> Q(Sum: 15, Product: 50)
K --> R(Result)
R -->|matches| S(Result: Matches)
N -->|for each match| T
T --> U(Claim Command)
U
```

The diagram depicts the flow of data and control between these components, indicating the direction of the flow and the operations performed at each step.



## Transfer Diagram
The following diagram illustrates the flow of code execution and interactions between different components in the provided code snippet.

```mermaid
graph TD;

subgraph EnergyTransferRequest
    A(createEtr) -->|attrs| B(EnergyTransferRequest.fromAttrs)
    B --> C(etr)
    C -->|toAttrs| D(etr.toAttrs)
    D -->|state| E(Console.log)
    E --> F(etr.issuanceStarted)
    F -->|state| G(Console.log)
    G --> H(etr.issuanceFinished)
    H -->|state| I(Console.log)
    I --> J(etr.certificateId)
    J --> K(etr.persisted)
    K -->|state| L(Console.log)
    L --> M(etr.startValidation)
    M -->|state| N(Console.log)
    N --> O(etr.updateValidationStatus)
    O -->|state| P(Console.log)
    P --> Q(etr.transferStarted)
    Q -->|state| R(Console.log)
    R --> S(etr.transferFinished)
    S -->|state| T(Console.log)
end

subgraph BigNumber
    U(Number1) -->|BigNumber| V(BigNumber.from)
    V --> W(number1)
    W -->|add| X(sum)
    W -->|mul| Y(product)
    X --> Z(Console.log)
    Y --> AA(Console.log)
end

subgraph ClaimCommands
    AB(claimCommands) --> AC(Console.log)
    AC --> AD(Console.log)
end

subgraph ExecutionController
    AE(performEnergyTransferComputations) --> EnergyTransferRequest
    AE --> AF(performBigNumberComputations)
    AE --> AG(claimCommands)
    AF --> BigNumber
    AG -->ClaimCommands
    AG --> AH(Console.log)
end

AE --> AI(construct TestClass)
AI --> AJ(run)
```

This diagram showcases the sequence of operations and interactions among different components in the code. The key components are:

- EnergyTransferRequest: Represents the energy transfer request entity and its state transitions. It includes functions for starting and finishing the issuance, updating validation status, and starting and finishing the transfer.

- BigNumber: Handles computations involving large numbers. It performs addition and multiplication operations.

- ClaimCommands: Constructs claim command objects with specific data values.

- ExecutionController: Serves as the main class that orchestrates the execution flow. It calls functions to perform energy transfer computations, big number computations, and generate claim commands. The results are logged using console.log().

Please note that this diagram provides a high-level overview of the code flow, focusing on the major interactions. It may not capture all the internal details or implementation specifics.


## Technologies in Energy Web 24/7 SDK

### TYPEORM
- TypeORM is an Object-Relational Mapping (ORM) library for TypeScript and JavaScript.

- It allows you to work with databases using object-oriented programming principles, where database tables are represented as classes and database records are represented as objects.

- TypeORM supports various database systems such as MySQL, PostgreSQL, SQLite, and more.

- It provides a powerful set of features including entity modeling, querying, data manipulation, and database migrations.

### NestJS
- Nest.js is a progressive Node.js framework for building scalable and efficient server-side applications.

- It follows the modular architecture pattern and is built with TypeScript.
Nest.js combines elements of Object-Oriented Programming (OOP), Functional Programming (FP), and Reactive Programming.
 
- It provides a set of abstractions and modules for building robust and maintainable applications.

- Nest.js supports various features such as dependency injection, middleware, routing, authentication, and more.