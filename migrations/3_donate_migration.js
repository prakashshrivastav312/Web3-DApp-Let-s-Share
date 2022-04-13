var donate = artifacts.require("./Donate.sol");

module.exports = function(deployer) {
  deployer.deploy(donate);
};