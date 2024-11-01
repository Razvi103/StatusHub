import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import UserLayout from './UserLayout'
import SimpleLayout from './SimpleLayout'
import { useAuth } from '../Hooks/useAuth'
import Home from '../Pages/Home'
import LoginPage from '../Pages/Login'
import SignUpPage from '../Pages/SignUp'
import AppList from '../Pages/User/AppList'
import AppDashboard from '../Pages/User/AppDashboard'
import AddApp from '../Pages/User/AddApp'
import ReportBug from '../Pages/User/ReportBug'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<SimpleLayout/>} >
            <Route index element={<Home />} />
            <Route path='signup' element={<SignUpPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path="list" element={"App list"} />
            <Route path="app/:id" element={"App :id"} />
            <Route path="report-bug" element={"Report bug"} />
        </Route>
    )
)

const userRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<UserLayout/>} >
            <Route index element={<AppList />} />
            <Route path="app/:appId" element={<AppDashboard />} />
            <Route path="add-app" element={<AddApp />} />
            <Route path="add-endpoint" element={"Add endpoint"} />
            <Route path="report-bug" element={<ReportBug />} />
            <Route path="signup" element={<Navigate to={"/"} />} />
        </Route>
    )
)

function MasterLayout () {
    const { userLoggedIn } = useAuth()

    return (
        <RouterProvider router={userLoggedIn? userRouter : router}></RouterProvider>
    )
}

export default MasterLayout;
