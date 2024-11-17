const Migrations = artifacts.require('Migrations');
//import Migrations from 'Migrations";
module.exports = function (deployer) {
    deployer.deploy(Migrations);
};