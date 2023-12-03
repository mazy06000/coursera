const Button = ({ buttonText, reqType, setReqType }) => {
    return (
        <button
        className={reqType === buttonText ? "selected" : ""}
        type="button"
        onClick={() => setReqType(buttonText)}
        >
        {buttonText}
        </button>
    );
};

export default Button;