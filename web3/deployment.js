const fs = require('fs');
const contractData = JSON.parse(
    fs.readFileSync('../build/contracts/InitialContract.json')
);

const Web3 = require('web3');
const url = 'https://ropsten.infura.io/v3/90e93a35b33a45ed917e8681aee1f738';
const web3 = new Web3(new Web3.providers.HttpProvider(url));

const account = '0x000086998B2Ae5a51862fA496fe07FD525812357';
require('dotenv').config({ path: '../.env' });
const privateKey = Buffer.from(process.env.PRIVATE_KEY);

web3.eth.accounts.wallet.add("0x" + privateKey);

const contract = new web3.eth.Contract(contractData.abi);

contract.deploy({
    data: contractData.bytecode,
    arguments: [123]
})
.send({
    from: account,
    gas: 1500000,
    gasPrice: '80000000'
}, function (error, transactionHash) {

}).on('error', function (error) {
    console.log('error', error);
}).on('transactionHash', function (transactionHash) {
    console.log('transactionHash', transactionHash);
}).on('receipt', function (receipt) {
    console.log('receipt', receipt.contractAddress);
}).on('confirmation', function (confirmationNumber, receipt) {
    console.log('confirmation', confirmationNumber);
});