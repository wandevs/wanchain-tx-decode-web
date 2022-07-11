const Output = ()=>{
    const { result } = this.props
    return (
        <textarea name="outputarea" id="outputarea" cols="100" rows="20">{result}
</textarea>
    )
}
export default Output;