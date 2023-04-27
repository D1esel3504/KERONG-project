import React, { FC } from 'react';
import logo from '../../image/logo.jpg';
import './Header.scss';

const Header: FC = () => {
    return (
        <div className="header">
            <img className="header__logo" alt="logo" src={logo} />
        </div>
    );
};

export default Header;
