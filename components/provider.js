import Web3 from 'web3';

let provider;

//provider = global.web3;
if (typeof global.ethereum !== 'undefined') {
  if (global.ethereum.constructor.name == "ReadOnlyProvider"){
    console.log("Autenticando...");
    global.ethereum.enable().then(console.log("ok"));
  }

  provider = global.ethereum;
  console.log(global.ethereum);

} else if (typeof global.web3 !== 'undefined') {
  console.log("global.web3");
  provider = global.web3.currentProvider;
  console.log(global.web3.currentProvider);
} else {
  console.log("infura");
  provider = new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/9e142d0a3b344fb48933c1d118a4f2e0'
  );
}
//console.log(provider);

export default provider;
