const InitialContract = artifacts.require("InitialContract");

module.exports = function (deployer) {
  deployer.deploy(InitialContract);
};
