const web3 = new Web3(Web3.givenProvider);
let contractInstance;
const contractAddress = '0x5DD60293B642B4D1cDd993059f44D5DF4228fB63'; // TODO Add contract address from migration
const abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "getMessage",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "newMessage",
                "type": "string"
            }
        ],
        "name": "setMessage",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }
];

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){   // Will popup box to access metamask to user
        contractInstance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
        console.log(contractInstance);
    });

    $("#get_data_button").click(fetchAndDisplay);
    $("#add_data_button").click(inputData);

});

function inputData(){
    console.log("Function input data");
    var name = $("#name_input").val();
    contractInstance.methods.setMessage(name).send({value: web3.utils.toWei("0.001", "ether")})
        .on('transactionHash', function(hash){
            console.log("tx hash");
        })
        .on('confirmation', function(confirmationNumber, receipt){
            console.log("conf");
        })
        .on('receipt', function(receipt){
            console.log(receipt);
        })
}


function fetchAndDisplay(){
    console.log("Function fetch and display");
    contractInstance.methods.getMessage().call().then(function(res){
        $("#name_output").text(res);
    });
}












// const Web3 = require("web3");
// const migrationContract = JSON.parse(fs.readFileSync(
//     '../build/contracts/Migrations.json', 'utf8'));
// console.log(JSON.stringify(migrationContract.abi))
// const mainContract = JSON.parse(fs.readFileSync(
//     '../build/contracts/Main.json', 'utf8'));
// console.log(JSON.stringify(mainContract.abi))

// const Web3 = require("web3");
// const App = {
//     web3Provider: null,
//     contracts: {},
//     names: [],
//     url: 'http://127.0.0.1:9545',
//     init: function () {
//         return App.initWeb3();
//     },
//
//     initWeb3 : function () {
//         if (typeof web3 !== 'undefined') {
//             App.web3Provider = web3.currentProvider;
//         } else {
//             App.web3Provider = new Web3.providers.HttpProvider(App.url);
//         }
//         let web3 = new Web3(App.web3Provider);
//
//         /** Initialize what is needed */
//         return App.initContract();
//     },
//
//     initContract : function () {
//
//     }
//
// }
// /** Launch App */
// $(function() {
//     $(window).load(function() {
//         App.init();
//         console.log('starting App');
//     });
// });