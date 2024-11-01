interface ButtonProps {
    value : string,
    setValue : (newValue : string) => void,
    placeholder : string,
    className : string,
    type : string,
    label : string,
    icon : string,
    required : boolean
};

function SearchBar ( {value, setValue, placeholder, label, type, required, className} : ButtonProps) {
    
    return (
        <input required={required} type={type} name={label} placeholder={placeholder} className={"search-bar "+className} value={value} onChange={ (e) => setValue(e.target.value) } />
    )
}

export default SearchBar;