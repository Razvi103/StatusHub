import { AuthProvider } from "./Hooks/useAuth"
import MasterLayout from "./Layouts/MasterLayout"
import "./App.css"

function App() {
    return (
        <AuthProvider>
            <MasterLayout />
        </AuthProvider>
    )
}
export const BACK_URL = "http://127.0.0.1:5000"
export default App
