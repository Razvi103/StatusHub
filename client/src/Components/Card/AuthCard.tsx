import "./AuthCard.css"

interface AuthCardProps {
    title : string,
    children : React.ReactNode,
}

function AuthCard ( { title, children } : AuthCardProps) {
    
    return (
        <div className="auth-card">
            <h2 className="title">{title}</h2>
            {children}
        </div>
    )
}

export default AuthCard;