const Output = (props) => {
    return (
        <textarea name="outputarea" id="outputarea" cols="100" rows="20" readOnly value={props.result}></textarea>
    )
}
export default Output;