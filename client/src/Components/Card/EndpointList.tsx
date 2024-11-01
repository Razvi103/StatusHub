import "./EndpointList.css"

export interface Endpoint {
    id : number,
    url : string,
    method : string,
    status : string,
    num_bugs : number
}

interface EndpointListProps {
    endpoints: Endpoint[];
}

function EndpointList( { endpoints } : EndpointListProps) {

    return (
        <div className="endpoint-card">
            <h3 className='c-dark'>Endpoint list</h3>
            <div className="endpoint header c-light">
                <p className="item">Id</p>
                <p>URL</p>
                <p className="item">method</p>
                <p className="item">status</p>
                <p className="item">bugs</p>
            </div>
            <div className="list">
                {endpoints.map((endpoint,index) => (
                    <div className="endpoint" key={endpoint.id}>
                        <p className="item">{index + 1}</p>
                        <p>{endpoint.url}</p>
                        <p className="item">{endpoint.method}</p>
                        <p className="item">{endpoint.status}</p>
                        <p className="item">{endpoint.num_bugs}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EndpointList;