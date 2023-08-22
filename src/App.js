import './App.css';
import Output from './output';
import Input from './input';
import {Component} from 'react'
import {decodeWanRawTran} from 'wanchain-tx-decode'
//import {decodeAbi} from 'abi-decoder'
const decodeAbi=require('abi-decoder')
const testABI=[{"inputs": [{"type": "address", "name": ""}], "constant": true, "name": "isInstantiation", "payable": false, "outputs": [{"type": "bool", "name": ""}], "type": "function"}, {"inputs": [{"type": "address[]", "name": "_owners"}, {"type": "uint256", "name": "_required"}, {"type": "uint256", "name": "_dailyLimit"}], "constant": false, "name": "create", "payable": false, "outputs": [{"type": "address", "name": "wallet"}], "type": "function"}, {"inputs": [{"type": "address", "name": ""}, {"type": "uint256", "name": ""}], "constant": true, "name": "instantiations", "payable": false, "outputs": [{"type": "address", "name": ""}], "type": "function"}, {"inputs": [{"type": "address", "name": "creator"}], "constant": true, "name": "getInstantiationCount", "payable": false, "outputs": [{"type": "uint256", "name": ""}], "type": "function"}, {"inputs": [{"indexed": false, "type": "address", "name": "sender"}, {"indexed": false, "type": "address", "name": "instantiation"}], "type": "event", "name": "ContractInstantiation", "anonymous": false}];
decodeAbi.addABI(testABI);

class App extends Component {


    state = {rawData: "", decodedData: "",abi:"",decodedAbi:""};
    updateInput = (strRaw) => {
        //console.log("entering updateInput function......:%s", JSON.stringify(strRaw));
        this.setState({rawData: strRaw})
    }

    decodeMyTx = () => {
        let myresult = "";
        try {
            // console.log("entering decodeMyTx.....%s:", this.state.rawData);
            // console.log("before decode", this.state.rawData);
            // console.log(decodeWanRawTran(this.state.rawData));
            myresult = JSON.stringify(decodeWanRawTran(this.state.rawData), null, 2).trim();
        } catch (e) {
            myresult = e.toString()
        }
        this.setState({rawData: this.state.rawData, decodedData: myresult});
    }

    updateInputAbi = (strRaw) => {
        //console.log("entering updateInput function......:%s", JSON.stringify(strRaw));
        this.setState({abi: strRaw})
    }

    decodeMyABI = () => {
        let myresult = "";
        try {
            // abiDecoder.decodeMethod(testData)
            myresult = JSON.stringify(decodeAbi.decodeMethod(this.state.abi), null, 2).trim();
        } catch (e) {
            myresult = e.toString()
        }
        this.setState({abi: this.state.abi, decodedAbi: myresult});
    }

    render() {
        return (
            <div className="App">
                <h1>wanchain-tx-decode</h1>
                <Input callback={this.updateInput}/>
                <br/>
                <br/>
                <input type="submit" value="Decode" onClick={this.decodeMyTx}/>
                <br/>
                <br/>
                <Output result={this.state.decodedData}/>
                <br/>

                <h1>wanchain-abi-decode</h1>
                <Input callback={this.updateInputAbi}/>
                <br/>
                <br/>
                <input type="submit" value="DecodeAbi" onClick={this.decodeMyABI}/>
                <br/>
                <br/>
                <Output result={this.state.decodedAbi}/>
                <br/>

            </div>
        );
    }
}

export default App;
