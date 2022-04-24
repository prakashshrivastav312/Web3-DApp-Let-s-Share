var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "festival fold crane also tomato curtain avocado strategy loan puppy dizzy nut";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    develop: {
      port: 8545
    },
    rinkeby: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/c9bd28e5df344d11a2a92febe4b1301e");
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
  }
  }
};
