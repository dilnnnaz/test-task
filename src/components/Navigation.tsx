import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/authSlice';

const Navigation = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    SWAPI Explorer
                </Link>
                {isAuthenticated && (
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/planets">
                                    Planets
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/characters">
                                    Characters
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/starships">
                                    Starships
                                </Link>
                            </li>
                        </ul>
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
