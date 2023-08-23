import './App.css';
import Output from './output';
import Input from './input';
import {Component} from 'react'
import {decodeWanRawTran} from 'wanchain-tx-decode'
//import {decodeAbi} from 'abi-decoder'
const decodeAbi=require('abi-decoder')
const testABI=[{"inputs":[{"internalType":"address","name":"_foundation","type":"address"},{"internalType":"address","name":"_signatureVerifier","type":"address"},{"internalType":"address","name":"_oracle","type":"address"},{"internalType":"address","name":"_cross","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"bytes32","name":"smgID","type":"bytes32"},{"internalType":"bytes32","name":"sigHash","type":"bytes32"},{"internalType":"bytes","name":"r","type":"bytes"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"SignatureVerifyFailed","type":"error"},{"inputs":[{"internalType":"bytes32","name":"smgID","type":"bytes32"},{"internalType":"uint256","name":"status","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"}],"name":"StoremanGroupNotReady","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"proposalId","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"},{"indexed":false,"internalType":"bytes32","name":"smgID","type":"bytes32"}],"name":"ApprovedAndExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"proposalId","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"Proposal","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldFoundation","type":"address"},{"indexed":true,"internalType":"address","name":"newFoundation","type":"address"}],"name":"TransferFoundation","type":"event"},{"inputs":[{"internalType":"uint256","name":"proposalId","type":"uint256"},{"internalType":"bytes32","name":"smgID","type":"bytes32"},{"internalType":"bytes","name":"r","type":"bytes"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"approveAndExecute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"chainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"foundation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"bool","name":"_halt","type":"bool"}],"name":"halt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"oracle","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_chainId","type":"uint256"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"proposal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"signatureVerifier","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"taskCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tasks","outputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"bool","name":"executed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newFoundation","type":"address"}],"name":"transferFoundation","outputs":[],"stateMutability":"nonpayable","type":"function"}];
decodeAbi.addABI(testABI);

class App extends Component {


    state = {rawData: "", decodedData: "",abi:"",decodedAbi:""};
    updateInput = (strRaw) => {
        //console.log("entering updateInput function......:%s", JSON.stringify(strRaw));
        this.setState({rawData: strRaw.trim()})
    }

    decodeMyTx = () => {
        let myresult = "";
        try {
            // console.log("entering decodeMyTx.....%s:", this.state.rawData);
            // console.log("before decode", this.state.rawData);
            // console.log(decodeWanRawTran(this.state.rawData));
            myresult = JSON.stringify(decodeWanRawTran(this.state.rawData.trim()), null, 2).trim();
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
            myresult = JSON.stringify(decodeAbi.decodeMethod(this.state.abi.trim()), null, 2).trim();
        } catch (e) {
            myresult = e.toString()
        }
        this.setState({abi: this.state.abi, decodedAbi: myresult});
    }

    render() {
        return (
            <div className="App" align="center">
                <h1>wanchain-tx-decode</h1>
                <Input callback={this.updateInput}/>
                <br/>
                <br/>
                <input type="submit" value="Decode" onClick={this.decodeMyTx}/>
                <br/>
                <br/>
                <Output result={this.state.decodedData}/>
                <br/>

                <h1>wanchain-groupApprove-decode</h1>
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
