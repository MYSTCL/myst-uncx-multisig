# MYST-UNCX-MULTISIG
### Multisig contract for managing the MYST/WETH LP securely, transparently, and in a decentralized fashion.

This repo contains the smart contracts used by MYSTCL to secure the LP of the main MYST/WETH pool on Uniswap. 

Features:

- Multisigging for key functions to allow for transparent and decentralized management.
- Funds transfer, LP movement, fee withdrawal, and ownership changes all multisigged.
- List of signing admin and owner addresses public.
- Event emissions on all key operations.
- Ability to seamlessly expand to include DAO management in future.
- Additional security added with a compulsory time delay of 14 days on any call to move the LP from the UNCX locking contract.

All rights waived - CC0 applies.