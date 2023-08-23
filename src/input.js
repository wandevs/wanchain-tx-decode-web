import {Component} from 'react'

class Input extends Component {

    change = (strRaw) => {
        this.props.callback(strRaw);
    };

    render() {
        return (
            <textarea name="inputarea" id="inputarea" cols="100" rows="10" onChange={(e) => {
                console.log("text changed.");
                this.change(e.target.value)
            }
            }
            />
        )
    }
}

export default Input;