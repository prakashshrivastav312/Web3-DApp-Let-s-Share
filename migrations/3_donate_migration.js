var donate = artifacts.require("./Donate.sol");
var pst = artifacts.require("./PST.sol");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(pst, 5000,{from:accounts[0]});
  const token=await pst.deployed();
  await deployer.deploy(donate, token.address,{from:accounts[0]});
};