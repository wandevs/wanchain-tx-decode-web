import './App.css';
import Output from './output';
import Input from './input';
import { Component } from 'react'
import { decode } from 'wanchain-tx-decode'



class App extends Component {
  updateInput = (strRaw)=>{
    console.log("entering updateInput function......");
        this.setState(strRaw)
    }

    decodeMyTx = ()=>{
      console.log("entering decodeMyTx.....");
      console.log("beofore decode",this.state.rawData);


    }
  state = {rawData:"0xf86d820144843b9aca0082520894b78777860637d56543da23312c7865024833f7d188016345785d8a0000802ba0e2539a5d9f056d7095bd19d6b77b850910eeafb71534ebd45159915fab202e91a007484420f3968697974413fc55d1142dc76285d30b1b9231ccb71ed1e720faae"}
  render() {
      const {strRaw} = this.state.rawData;
      return (
          <div className="App">
              <h1>wanchain-tx-decode</h1>
              <Input updateInput={ this.updateInput } />
              <br/>
              <input type="submit" value="Decode" onClick={this.decodeMyTx} />
              <br/>
              <Output result={ strRaw }/>
              <br/>
          </div>
      );
  }
}

export default App;
