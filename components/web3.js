import provider from './provider';
import Web3 from 'web3';

//console.log(provider);
let web3;
web3 = new Web3(provider);
//console.log(web3);

export default web3;
