import React, { useState } from 'react';

import Login from './Login';
import SignUp from './SignUp';

import './../styles/login.scss';

const AuthenticateForm = (props) => {

    const { closeAuthenticate } = props;

    const [ formState, setFormState ] = useState(false);

    function toggleForm(e) {
        setFormState(e.target.checked);
    };

    const formHeight = () => formState ? '80%' : '60%';

    return (
        <div 
            className="authenticate"
            id="authenticate-form"
            style={{height: formHeight()}}
        >

            <div className="switch">
                <input type="checkbox" id="switch" onClick={(e) => toggleForm(e)}/>
                <label className="switch-label" htmlFor="switch">Login</label>
                <span className="switch-title">{formState ? 'Login' : 'Sign Up'}</span>
            </div>

            <span className="authenticate--close" onClick={() => closeAuthenticate()}>
                X
            </span>

            {
                formState ? (
                    <SignUp />
                ) : (
                    <Login />
                )
            }

        </div>
    )
};


export default AuthenticateForm;