const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx').Transaction;
const fs = require('fs');
require('dotenv').config({ path: '../.env' });

const url = 'https://ropsten.infura.io/v3/90e93a35b33a45ed917e8681aee1f738';
const web3 = new Web3(new Web3.providers.HttpProvider(url));

const account = '0x000086998B2Ae5a51862fA496fe07FD525812357';
const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'hex');

const contractAddress = '0xaafE6ad677cDc6eB7DF7375DFcAc2a0d95806eE6';
const contractData = JSON.parse(
    fs.readFileSync('../build/contracts/MyToken.json')
);
const contractAbi = contractData.abi;

const contract = new web3.eth.Contract(contractAbi, contractAddress);

const tokensDistribution = async (addressesArray, tokensAmount) => {
    try {
        for(let i = 0; i < addressesArray.length; i++) {
            let txCount = await web3.eth.getTransactionCount(account);
            let gasPrice = 10;
            const txObject = {
                nonce:  web3.utils.toHex(txCount.toString()),
                gasLimit: web3.utils.toHex(800000),
                gasPrice: web3.utils.toHex(web3.utils.toWei((gasPrice *= 1.1).toString(), 'gwei')),
                to: contractAddress,
                data: contract.methods.mint(addressesArray[i], tokensAmount).encodeABI()
            }
    
            const tx = new EthereumTx(txObject, { chain: 'ropsten' });
            tx.sign(privateKey);
    
            const serializedTransaction = tx.serialize();
            const raw = '0x' + serializedTransaction.toString('hex');
    
            await web3.eth.sendSignedTransaction(raw, (err, txHash) => {
                txHash ? console.log(`txHash: ${txHash}`) : console.log(`sendSignedTransaction Error: ${err}`);
            });
        } 
    } catch(err) {
        console.log(`catch Error: ${err}`);
    }
};
