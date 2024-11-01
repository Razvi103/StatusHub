import "./InfoCard.css"

export interface InfoCardInterface {
    title : string,
    text : string,
    icon : string,
    className : string
};

function InfoCard( {title, text, icon, className } : InfoCardInterface) {

    return (
        <div className={"info-card " + className}>
            <div className="icon bg-surface">
                <i className={"fi fi-rr-" + icon + " c-".concat(className.split("-")[1])}></i>
            </div>
            <div className="column">
                <h4 className="title">{title}</h4>
                <h3 className="text">{text}</h3>
            </div>
        </div>
    )

}

export default InfoCard;