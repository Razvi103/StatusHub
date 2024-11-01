import "./AddAppSection.css"

export interface AddAppSectionInterface {
    title : string,
    label : string,
    className : string,
    children : React.ReactNode
};

function AddAppSection( {title, label, children, className} : AddAppSectionInterface) {

    return (
        <section className={"add-app-section bg-surface sh-light " + className}>
            <h2 className="c-dark">{title}</h2>
            <p className="label">{label}</p>
            <div className="children">
                {children}
            </div>
        </section>
    )

}

export default AddAppSection;