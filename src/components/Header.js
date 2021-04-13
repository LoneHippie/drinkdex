import React, { useState } from 'react';

import AuthenticateForm from './AuthenticateForm';
import UserMenu from './UserMenu';
import BlankState from './BlankState';

import './../styles/header.scss';

const Header = (props) => {

    const { user, loggedStatus, backHome, drinks } = props;

    const [ menuOpen, setMenuOpen ] = useState(false)

    const profileBtn = () => {

        const menuButton = () => {
            if (menuOpen) {
                return (
                    <div className="header__profile">
                        <img 
                            className="header__profile--close"
                            id="nav-close"
                            onClick={() => closeMenu()}
                            src="https://drinkdex.herokuapp.com/images/icons/cancel.svg"
                            alt="close profile options"
                        >
                        </img>
                        <label className="header__profile--label" htmlFor="nav-close" >Close</label>
                    </div>
                )
            } else {
                return (
                    <div className="header__profile">
                        <img
                            className="header__profile--btn"
                            id="nav-login"
                            onClick={() => openMenu()}
                            src="https://drinkdex.herokuapp.com/images/icons/user.svg"
                            alt="user profile options"
                        >
                        </img>
                        <label className="header__profile--label" htmlFor="nav-login">My Profile</label>
                    </div>
                )
            }
        }

        if (!loggedStatus) {
            return (
                <div className="header__profile">
                    <img 
                        className="header__profile--guest" 
                        id="nav-login"
                        onClick={() => openAuthenticate()}
                        src="https://drinkdex.herokuapp.com/images/icons/question.svg"
                        alt="guest profile icon"
                    >
                    </img>
                    <label className="header__profile--label" htmlFor="nav-login">Login</label>
                </div>
            );
        } else {
            return menuButton();
        };
    };

    function openAuthenticate() {
        document.getElementById('authenticate-form').style.display = "block";
        document.getElementById('authenticate-form-blur').style.display = "block";
        document.getElementById('nav').style.display = "none";
    }

    function closeAuthenticate() {
        document.getElementById('authenticate-form').style.display = "none";
        document.getElementById('authenticate-form-blur').style.display = "none";
        document.getElementById('nav').style.display = "flex";
    }

    function openMenu() {
        setMenuOpen(true);
        document.getElementById('header').classList.add('menu-active');
        setTimeout(() => {
            document.getElementById('menu').style.display = "block";
        }, 300);
    }

    function closeMenu() {
        setMenuOpen(false);
        document.getElementById('header').classList.remove('menu-active');
        document.getElementById('menu').style.display = "none";
    }

    return (
        <header className="header" id="header">
            <div className="header__title-container">
                <h1 className="header__title-container--title" onClick={() => backHome()}>Drinkdex</h1>
            </div>

            {profileBtn()}

            <AuthenticateForm
                closeAuthenticate = {closeAuthenticate}
            />

            { loggedStatus ? (
                <UserMenu
                    user = {user}
                    drinks = {drinks}
                />
            ) : (
                <BlankState /> 
            )}

            <div 
                className="authenticate-form-blur"
                id="authenticate-form-blur"
                onClick={() => closeAuthenticate()}
            >
            </div>
            
        </header>
    )
};

export default Header;