import React from 'react';

import './../styles/navbar.scss'

const Navbar = (props) => {

    const { openOption, user } = props;

    const activeStatus = () => {
        if (user !== undefined) {
            return 'active';
        } else {
            return 'inactive'
        }
    }

    return (
        <nav className="navbar" id="nav">
            <div className="navbar__option">
                <img 
                    className="navbar__option--icon" 
                    id="btn-categories" 
                    onClick={(e) => openOption(e)} 
                    src="https://drinkdex.herokuapp.com/images/icons/cocktail.svg" 
                    alt="drink categories"
                ></img>
                <span className="navbar__option--label" htmlFor="btn-categories">Categories</span>
            </div>
            <div className="navbar__option">
                <img 
                    className="navbar__option--icon" 
                    id="btn-spirits" 
                    onClick={(e) => openOption(e)} 
                    src="https://drinkdex.herokuapp.com/images/icons/glass.svg" 
                    alt="drink spirits"
                ></img>
                <span className="navbar__option--label" htmlFor="btn-spirits">Spirits</span>
            </div>
            <div className="navbar__option">
                <img 
                    className={`navbar__option--icon ${activeStatus()}`} 
                    id="btn-create" 
                    onClick={(e) => openOption(e)} 
                    src={user ? "https://drinkdex.herokuapp.com/images/icons/recipe.svg" : "https://drinkdex.herokuapp.com/images/icons/recipe-disabled.svg"} 
                    alt="crete a new drink"
                ></img>
                <span className={`navbar__option--label ${activeStatus()}`} htmlFor="btn-create">Create</span>
            </div>
        </nav>
    )
};

export default Navbar;
