import React from 'react';

import './../styles/loading.scss';

//load screen component for hiding UI while intial fetch for user is pending

const Loading = () => {
    return (
        <div className="loading">

            <div className="sign-container">
                <span className="sign-container--text">Welcome Back</span>

                <div>
                    <img
                        className="sign-container--image"
                        src="https://drinkdex.herokuapp.com/images/icons/shaker.svg"
                        alt="cocktail shaker vector"
                    ></img>
                </div>
            </div>
            
            <div className="loader">Loading</div>

        </div>
    )
}

export default Loading;