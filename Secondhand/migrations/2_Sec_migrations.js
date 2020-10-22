var Second = artifacts.require('./Second')
//var Test = artifacts.require('.Test.sol')

module.exports = function (deployer) {
  //deployer.deploy(ConvertLib)
  //deployer.link(ConvertLib, MetaCoin)
  deployer.deploy(Second)
}