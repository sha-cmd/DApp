# DApp

Une application pour utiliser MetaMask et les Smart Contracts.

Pour créer une application qui interagit avec la blockchain.

Utiliser WSL sur windows, ou directement un OS Linux.

installer les dépendances.

* nodejs
* npm
* [ganache](https://archive.trufflesuite.com/ganache/)
* libfuse2 (pour lancer l'appImage de ganache)

* Dans le navigateur installer le plugin pour utiliser ganache (blockchain de test locale) et son portefeuille ETH.

* Metamask

Paramétrer un custom network avec

* NETWORK ID ou ID CHAIN : 1337
* RPC SERVER HTTP://127.0.0.1:7545

Utiliser l'addresse de test depuis ganache dans metamask en copier la clé secrète dans import an account in metamask.

Vérifier que ganache est bien en marche durant votre développement.

Installer truffle globalement sur WSL
```
npm install -g truffle@latest
```

git clone https://github.com/sha-cmd/DApp

Ouvrir dans WebStorm ou VSCode

Installer le plugin Solidity

Écrire le code des contrats dans les fichiers .sol

Pour compiler truffle
```
# truffle init # Pour tout effacer (RAZ)
truffle compile
truffle migrate --reset --compile-all
```

## Pour lancer l'application :

* Lancer la blockchain ganache (Quickstart)

Exécuter la commande 

```
truffle compile
truffle migrate --reset --compile-all
```

* Copier la clé privé d'un compte virtuel de ganache.

* Importer la clé privé dans MetaMask

* Lancer le serveur avec la commande

```
npm run dev
```

* Le site est accessible sur localhost:5173