import "./InputField.css"

interface InputFieldProps {
    label : string,
    value : any,
    setValue : (newValue : any) => void,
    type : string,
    placeholder : string,
    className : string
};

function InputField ( {value, setValue, placeholder, label, type, className} : InputFieldProps) {
    
    const changeValue = (e : any) => {
        let newValue = e.target.value
        if (type == 'number') {
            if (newValue < 0)
                newValue = 0
        }
        setValue(newValue)
    }

    return (
        <div className={"input-field " + className}>
            <p className="input-label">{label}</p>
            <input type={type} placeholder={placeholder} className="input" value={value} onChange={ (e) => changeValue(e) } />
        </div>
    )
}

export default InputField;