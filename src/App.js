import './App.css';
import Output from './output';
import Input from './input';
import {Component} from 'react'
import {decodeWanRawTran} from 'wanchain-tx-decode'


class App extends Component {
    state = {rawData: "", decodedData: ""};
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
            </div>
        );
    }
}

export default App;
