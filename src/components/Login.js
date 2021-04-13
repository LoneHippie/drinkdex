import React, { useState } from 'react';

import './../styles/login.scss';

const Login = () => {

    const [ formEmail, setFormEmail ] = useState('');
    const [ formPassword, setFormPassword ] = useState('');

    const [ authMessage, setAuthMessage ] = useState('');

    function handleChangeEmail(e) {
        setFormEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setFormPassword(e.target.value)
    }

    //log in and refresh page
    async function submitLogin(e) {
        e.preventDefault();
        try {
            let result = await fetch('https://drinkdex.herokuapp.com/api/v1/users/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    'email': formEmail,
                    'password': formPassword
                })
            });

            const response = await result.json();

            // console.log(response);

            if (response.status === 'fail') {
                return setAuthMessage(`*${response.message}`);
            } else {
                setAuthMessage('Login successful!');
            }

            //reset window
            // window.location.reload();

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form
            id="authenticate-login"
            className="authenticate__form"
            onSubmit={(e) => submitLogin(e)}
        >

            <h3 className="authenticate--title">Welcome</h3>

            <span className="authenticate--message"></span>

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

            <input className="authenticate__form--btn" type="submit" value="Log in"></input>

            <span className="authenticate--message">{authMessage}</span>

        </form>
    )
};

export default Login
