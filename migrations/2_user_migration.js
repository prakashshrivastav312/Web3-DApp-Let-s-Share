var user = artifacts.require("./User.sol");

module.exports = function(deployer,network, accounts) {
  deployer.deploy(user,{from:accounts[0]});
};
