import { Outlet } from 'react-router-dom';
import TopMenu from '../Components/Navigation/TopMenu';
import Footer from '../Components/Navigation/Footer';
import "./SimpleLayout.css";

function SimpleLayout() {
    return (
        <div className='base' >
            <div className='container non-user'>
                <TopMenu />

                <div className='content'>
                    <Outlet />
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default SimpleLayout;