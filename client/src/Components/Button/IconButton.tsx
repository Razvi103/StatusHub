import "./IconButton.css"

interface IconButtonProps {
    text: string,
    onClick: () => void,
    className: string,
    icon : string
};

function IconButton ( {text, onClick, className, icon} : IconButtonProps) {
    
    return (
        <div className={"icon-button " + className} onClick={ () => onClick() }>
            <i className={"fi fi-rr-" + icon}></i>
            <p className="button-text">{text}</p>
        </div>
    )
}

export default IconButton;