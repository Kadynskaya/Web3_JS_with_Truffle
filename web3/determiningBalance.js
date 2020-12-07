const Web3 = require('web3');
const fs = require('fs');

const url = 'https://ropsten.infura.io/v3/90e93a35b33a45ed917e8681aee1f738';
const web3 = new Web3(new Web3.providers.HttpProvider(url));

const contractAddress = '0xaafE6ad677cDc6eB7DF7375DFcAc2a0d95806eE6';
const contractData = JSON.parse(
    fs.readFileSync('../build/contracts/MyToken.json')
);
const contractAbi = contractData.abi;

const contract = new web3.eth.Contract(contractAbi, contractAddress);

const determiningBalance = async (addresses) => {
    try {
        if(typeof addresses === "string") {
            let balance = await contract.methods.balanceOf(addresses).call();
            console.log(`Balance of tokens in ${addresses} address is ${balance}`);
        } else {
            for (let i = 0; i < addresses.length; i++) {
                let balance = await contract.methods.balanceOf(addresses[i]).call();
                console.log(`Balance of tokens in ${addresses[i]} address is ${balance}`);
            }
        }
    } catch(err) {
        console.log(`catch Error: ${err}`);
    }
};
