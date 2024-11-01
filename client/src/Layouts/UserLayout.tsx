import { Outlet } from 'react-router-dom';
import Menu from '../Components/Navigation/Menu';
import "./UserLayout.css"

function UserLayout() {

    return (
        <div className='base ' >
            <Menu />
            <div className='content user-content'>
                <Outlet />
            </div>
        </div>
    );
};

export default UserLayout;