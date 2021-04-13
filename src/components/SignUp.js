import React, { useState } from 'react';

import './../styles/login.scss';

const SignUp = () => {

    const [ formName, setFormName ] = useState('');
    const [ formEmail, setFormEmail ] = useState('');
    const [ formPassword, setFormPassword ] = useState('');
    const [ formPasswordConfirm, setFormPasswordConfirm ] = useState('');

    const [ authMessage, setAuthMessage ] = useState('');

    function handleChangeName(e) {
        setFormName(e.target.value);
    }

    function handleChangeEmail(e) {
        setFormEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setFormPassword(e.target.value);
    }

    function handleChangePasswordConfirm(e) {
        setFormPasswordConfirm(e.target.value);
    }

    async function submitSignUp(e) {
        e.preventDefault();
        try {

            if (formPassword !== formPasswordConfirm) {
                return setAuthMessage('*Password does not match confirmation');
            };

            let result = await fetch('api/v1/users/signup', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    'username': formName,
                    'email': formEmail,
                    'password': formPassword,
                    'passwordConfirm': formPasswordConfirm
                })
            });

            const response = await result.json();

            console.log(response);

            if (response.status === 'error') {
                console.log('Sign up failed, please check info');
                return;
            } else {
                setAuthMessage('Sign up successful!');
            }

            //reset window
            window.location.reload();

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form
            id="authenticate-signup"
            className="authenticate__form"
            onSubmit={(e) => submitSignUp(e)}
        >

            <h3 className="authenticate--title">Get Started</h3>

            <input
                required={true}
                className="authenticate__form--input" 
                type="text" 
                id="authenticate-name"
                value={formName}
                minLength="2"
                onChange={(e) => handleChangeName(e)}
                placeholder="Pick a name"
            >
            </input>
            <label className="authenticate__form--label" htmlFor="authenticate-email">Username</label>

            <input
                required={true}
                className="authenticate__form--input" 
                type="email" 
                id="authenticate-email"
                value={formEmail}
                onChange={(e) => handleChangeEmail(e)}
                placeholder="Your Email"
            >
            </input>
            <label className="authenticate__form--label" htmlFor="authenticate-email">Email</label>

            <input
                required={true}
                className="authenticate__form--input" 
                type="password"
                id="authenticate-password"
                value={formPassword}
                minLength="8"
                onChange={(e) => handleChangePassword(e)}
                placeholder="Your Password"
            >
            </input>
            <label className="authenticate__form--label" htmlFor="authenticate-password">Password</label>

            <input
                required={true}
                className="authenticate__form--input" 
                type="password"
                id="authenticate-password-confirm"
                value={formPasswordConfirm}
                minLength="8"
                onChange={(e) => handleChangePasswordConfirm(e)}
                placeholder="Confirm Your Password"
            >
            </input>
            <label className="authenticate__form--label" htmlFor="authenticate-password">Confirm Password</label>

            <input className="authenticate__form--btn" type="submit" value="Sign Up"></input>

            <span className="authenticate--message">{authMessage}</span>

        </form>
    )
}

export default SignUp;