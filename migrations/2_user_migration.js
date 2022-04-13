var user = artifacts.require("./User.sol");

module.exports = function(deployer) {
  deployer.deploy(user);
};
