import React from 'react';
import './Nav.scss';
import { Link } from 'react-router-dom';

interface NavProps {

}

const Nav = (props: NavProps) => (
    <nav id='nav'>
        <ul className='menu menu--1'>
            <li className='menu-item'>
                <Link to='/'>Home</Link>
            </li>
            <li className='menu-item'>
                <Link to='/login/'>Login</Link>
            </li>
        </ul>
    </nav>
);

export default Nav;