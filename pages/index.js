import React, { Component } from 'react';
import web3 from '../components/web3';
import provider from '../components/provider';

import {
  Grid,
  Container,
  Header,
  Icon,
  Table,
  Message
} from 'semantic-ui-react';
//import 'semantic-ui-css/semantic.min.css';

class Home extends Component {
  state = {network: '', client: '', carteira: '',nome:'Fulano de Tal'};

  getNetwork(provider) {
    if (provider !== null)
    {
      switch(provider.networkVersion) {
        case "1":
          return "mainnet";
        break;
        case "3":
          return "ropsten";
        break;
        case "4":
          return "rinkeby";
        break;
        case "5777":
          return "ganache (local)";
        break;
        default:
          return provider.networkVersion;
      }
    }
    else {
      return "ropsten";
    }
  }

  getClient(provider){
    if (provider !== null)
    {
      if (provider.isToshi) {
        return "Coinbase Wallet";
      } else if (provider.isMetaMask) {
        return "MetaMask";
      } else if (provider.isAlphaWallet) {
        return "alphaWallet";
      } else if (provider.isStatus) {
        return "Status";
      } else if (provider.isTrust) {
        return "Trust";
      } else if (provider.isGoWallet) {
        return "GoWallet";
      }
    } else {
        return "Infura";
    }
  }

  async componentDidMount() {

    console.log(provider);
    let _client = this.getClient(provider);
    let _network = this.getNetwork(provider);
    this.setState({client: _client, network: _network});

    /*
    var _coinbase = web3.eth.coinbase;
    var _balance = web3.eth.getBalance(coinbase);
    this.setState({coinbase: _coinbase, balance: _balance})
    */
    web3.eth.getAccounts().then((accounts) => {
      web3.eth.defaultAccount = accounts[0];
      this.setState({carteira: accounts[0]});

      web3.eth.getBalance(web3.eth.defaultAccount).then((_saldo) => {
        this.setState({saldo: _saldo});
      });
    });


    //console.log(web3);
  }

  render() {
    return (<div className="App">
      <Grid columns='equal'>
        <Grid.Row>
          <Grid.Column>
            <Container><Header as='h3' block><Icon name='file alternate' />
              <Header.Content>Informações</Header.Content>
            </Header>
            {this.state.nome !== '' ?
            (<span><h4 className="ui horizontal divider header">
              <i className="user icon"></i>
              Participante
            </h4><div> Nome: {this.state.nome}</div>
            <div> Saldo: {this.state.saldo} FIAP</div></span>):(<div></div>)}
            <h4 className="ui horizontal divider header">
              <i className="money icon"></i>
              Carteira
            </h4>
            <div size='small'>{this.state.carteira}</div>
            <h4 className="ui horizontal divider header">
              <i className="money icon"></i>
              Número do Contrato
            </h4>
            <div size='small'></div>
            <br />
            {this.state.network !== null ? (
            <div><h4 className="ui horizontal divider header">
              <i className="world icon"></i>
              Rede
            </h4>
            <div>{this.state.network}</div></div>) : (<div></div>)}
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>);
  }
}
export default Home;
