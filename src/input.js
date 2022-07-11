function Iutput(props){
    const { inputChange } = props
    return (
        <textarea name="inputarea" id="inputarea" cols="100" rows="10"  onChange={(e) => {
            console.log("text changed.");
            inputChange(e)}
        } >

</textarea>
    )
}

export default Iutput;