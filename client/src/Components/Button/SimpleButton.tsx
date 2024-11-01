import "./SimpleButton.css"

interface ButtonProps {
    text: string,
    onClick: (e : React.MouseEvent<HTMLButtonElement>) => void,
    className: string
};

function SimpleButton ( {text, onClick, className} : ButtonProps) {
    
    return (
        <button onClick={ (event) => onClick(event) } className={"simple-button " + className}>
            {text}
        </button>
    )
}

export default SimpleButton;