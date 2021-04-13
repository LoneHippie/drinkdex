import React, { useState, useEffect } from 'react';

import './../styles/usermenu.scss';

const UserMenu = (props) => {

    const { user, drinks } = props;   
    
    const [ createdDrinks, setCreatedDrinks ] = useState(undefined);

    //find created drinks if they exist
    useEffect(() => {
        const signedDrinks = drinks.filter(el => {
            if (el.createdBy !== undefined) {
                if (el.createdBy[1] === user._id) {
                    return el;
                }
            }
        });

        setCreatedDrinks(signedDrinks);

    }, [drinks, user._id]);

    const [ activeForm, setActiveForm ] = useState(undefined);

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ newPasswordConfirm, setNewPasswordConfirm ] = useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    };

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    };

    function handleChangePassword(e) {
        setPassword(e.target.value);
    };

    function handleChangeNewPassword(e) {
        setNewPassword(e.target.value);
    };

    function handleChangeNewPasswordConfirm(e) {
        setNewPasswordConfirm(e.target.value);
    };

    function clearFields() {
        setName('');
        setEmail('');
        setPassword('');
        setNewPassword('');
        setNewPasswordConfirm('');
    };

    function handleOpenForm(e) {
        clearFields();
        setActiveForm(e.target.id);
    };

    function handleCloseForm() {
        clearFields();
        setActiveForm(undefined);
    };

    const nameField = () => {
        if (activeForm === 'name') {
            return (
                <form onSubmit={(e) => changeField(e)}>
                    <span className="cancel" onClick={() => handleCloseForm()}>X</span>
                    <input
                        id="input-name"
                        placeholder={user.username}
                        type="text"
                        onChange={(e) => handleChangeName(e)}
                        value={name}
                        minLength="2"
                        required={true}
                    >
                    </input>
                    <label htmlFor="input-name">New Username</label>
                    <button 
                        type="submit"
                    >
                        Change Name
                    </button>
                    <div id="auth-message"></div>
                </form>
            )
        } else {
            return (
                <>
                    <span>{user.username}</span>
                    <button 
                        id="name"
                        onClick={(e) => handleOpenForm(e)}
                    >
                        Change Name
                    </button>
                </>
            )
        }
    };

    const emailField = () => {
        if (activeForm === 'email') {
            return (
                <form onSubmit={(e) => changeField(e)}>
                    <span className="cancel" onClick={() => handleCloseForm()}>X</span>
                    <input
                        id="input-email"
                        placeholder={user.email}
                        type="email"
                        onChange={(e) => handleChangeEmail(e)}
                        value={email}
                        minLength="2"
                        required={true}
                    >
                    </input>
                    <label htmlFor="input-name">New email address</label>

                    <button 
                        type="submit"
                    >
                        Change Email
                    </button>
                    <div id="auth-message"></div>
                </form>
            )
        } else {
            return (
                <>
                    <span>{user.email}</span>
                    <button 
                        id="email"
                        onClick={(e) => handleOpenForm(e)}
                    >
                        Change Email
                    </button>
                </>
            )
        }
    };

    const passwordField = () => {
        if (activeForm === 'password') {
            return (
                <form onSubmit={(e) => changeField(e)}>
                    <span className="cancel" onClick={() => handleCloseForm()}>X</span>
                    <input
                        id="input-password-current"
                        placeholder="current password"
                        type="password"
                        onChange={(e) => handleChangePassword(e)}
                        value={password}
                        minLength="8"
                        required={true}
                    >
                    </input>
                    <label htmlFor="input-name">Password Verification</label>

                    <input
                        id="input-password-new"
                        placeholder="choose a password"
                        type="password"
                        onChange={(e) => handleChangeNewPassword(e)}
                        value={newPassword}
                        minLength="8"
                        required={true}
                    >
                    </input>
                    <label htmlFor="input-name">New Password</label>

                    <input
                        id="input-password-new-confirm"
                        placeholder="confirm new password"
                        type="password"
                        onChange={(e) => handleChangeNewPasswordConfirm(e)}
                        value={newPasswordConfirm}
                        minLength="8"
                        required={true}
                    >
                    </input>
                    <label htmlFor="input-name">Password Confirmation</label>

                    <button 
                        type="submit"
                    >
                        Change Password
                    </button>
                    <div id="auth-message"></div>
                </form>
            )
        } else {
            return (
                <button 
                    id="password"
                    onClick={(e) => handleOpenForm(e)}
                >
                    Change Password
                </button>
            )
        }
    };

    async function changeField(e) {
        e.preventDefault();

        let bodyObj;

        switch(true) {
            case activeForm === 'name':
                bodyObj = { 'username': name };
                break;
            case activeForm === 'email':
                bodyObj = { 'email': email };
                break;
            case activeForm === 'password':
                bodyObj = { 
                    'passwordCurrent': password, 
                    'password': newPassword ,
                    'passwordConfirm': newPasswordConfirm
                };
                break;
            default:
                console.log('No active forms found');
        };

        try {
            let update;

            if (activeForm !== 'password') {
                update = await fetch('api/v1/users/updateMe', {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(bodyObj)
                });
            } else {
                update = await fetch('api/v1/users/updateMyPassword', {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(bodyObj)
                });
            };

            if (update.ok) {
                console.log('User updated!');
                // console.log(update);
                window.location.reload();
            } else {
                const response = await update.json();

                if (response.message.includes('is incorrect')) {
                    document.getElementById('auth-message').textContent = "Current password is incorrect";
                } else {
                    document.getElementById('auth-message').textContent = "Something went wrong, please try again";
                }
            }

        } catch (err) {
            console.log('oops');
        }
    };

    //log out the current user and refresh (working)
    async function logoutUser() {
        try {
            const result = await fetch('api/v1/users/logout', {
                method: 'post'
            });

            const sent = await result;

            console.log(sent);

            window.location.reload();

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="menu" id="menu">

            <section className="menu-overview">

                <div className="menu-overview__header">
                    <h3>My Profile</h3>
                    {/* <label htmlFor="profile-name">Username</label> */}
                </div>

                <div className="menu-overview__stats">
                    <div className="menu-overview__stats--saved">
                        <span>{`Saved Drinks: ${user.savedDrinks.length}`}</span>
                        <i></i>
                    </div>
                    <div className="menu-overview__stats--created">
                        <span>{`Created Drinks: ${createdDrinks ? createdDrinks.length : '---'}`}</span>
                        <i></i>
                    </div>
                </div>

            </section>

            <section className="menu-profile">

                <div className="menu-profile--field">
                    <h4>Username</h4>
                    {nameField()}
                </div>

                <div className="menu-profile--field">
                    <h4>Email</h4>
                    {emailField()}
                </div>

                <div className="menu-profile--field">
                    <h4>Password</h4>
                    {passwordField()}
                </div>

            </section>

            <section className="menu-auth">

                <button onClick={() => logoutUser()}>
                    Log out
                </button>

            </section>

        </div>
    )
};

export default UserMenu;