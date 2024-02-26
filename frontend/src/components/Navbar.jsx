import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                    AuthJWT
                </Link>
            </div>

            <div className="navbar-menu">
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <button className="button is-light" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
