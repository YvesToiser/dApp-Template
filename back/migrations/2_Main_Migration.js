const Main = artifacts.require('Main');

module.exports = function(deployer, network, accounts) {
    deployer.deploy(Main).then(function(instance){
        console.log ('Main contract has been deployed successfully');
    }).catch(function(err){
        console.log('Main contract deployment failed : ' + err);
    });
};