import "./BugList.css"

interface Bug {
    reported_date: string,
    description: string,
    endpoint_id: number,
    is_solved: boolean
}

interface BugListProps {
    bugs: Bug[]
}

function BugList({ bugs }: BugListProps) {

    return (
        <div className="bug-card">
            <h3 className='c-dark'>Bug list</h3>
            <div className="column">
            {bugs.map( (bug, index)  => (
                <div className="bug" key={index}>
                    <div className="row">
                        <div className="item"><span className="bug-label">No.</span>{index}</div>
                        <div className="item"><span className="bug-label">Endpoint no.</span>{bug.endpoint_id}</div>
                    </div>
                    <div className="item-vertical"><span className="bug-label">Reported date:</span>{bug.reported_date}</div>
                    <div className="item-vertical"><span className="bug-label">Description:</span>{bug.description}</div>
                </div>
            )) }
            </div>
        </div>
    );
};

export default BugList;