const web3 = new Web3(Web3.givenProvider);
let mainContractInstance;
let migrationContract = {};
$.getJSON('../contracts/Migrations.json', function(data) {
    migrationContract = data;
});
let mainContract = {};
$.getJSON('../contracts/Main.json', function(data) {
    mainContract = data;
});


$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){   // Will popup box to access metamask to user
        mainContractInstance = new web3.eth.Contract(
            mainContract.abi,
            mainContract.networks[5777].address,
            {from: accounts[0]}
            );
        console.log(mainContractInstance);
    });

    $("#get_data_button").click(fetchAndDisplay);
    $("#add_data_button").click(inputData);

    // console.log(JSON.stringify(migrationContract.abi));
    // console.log(JSON.stringify(mainContract.abi));
    // console.log(JSON.stringify(mainContract.networks[5777].address));
});

function inputData(){
    console.log("Function input data");
    const name = $("#name_input").val();
    const price = web3.utils.toWei("0.001", "ether")
    mainContractInstance.methods.setMessage(name).send({value: price})
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
    mainContractInstance.methods.getMessage().call().then(function(res){
        $("#name_output").text(res);
    });
}











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