import React, { useEffect, useState } from 'react'

import CardLarge from './CardLarge';
import CardFull from './CardFull';

import DrinkGrid from './DrinkGrid';

import './../styles/home.scss';

const Home = (props) => {

    const { user, drinks, randomDrink, refreshUser } = props;

    const [ createdDrinks, setCreatedDrinks ] = useState(undefined);

    //create created drinks array
    useEffect(() => {
        if (user && drinks) {
            const signedDrinks = drinks.filter(el => {
                if (el.createdBy !== undefined) {
                    if (el.createdBy[1] === user._id) {
                        return el;
                    }
                }
            });
    
            setCreatedDrinks(signedDrinks);
        }

    }, [drinks, user]);

    function openFullDisplay(id) {
        document.getElementById(`card-${id}-full`).style.display = "block";
    };
    function closeFullDisplay(id) {
        document.getElementById(`card-${id}-full`).style.display = "none";
    };

    function openAuthenticate() {
        document.getElementById('authenticate-form').style.display = "block";
        document.getElementById('authenticate-form-blur').style.display = "block";
        document.getElementById('nav').style.display = "none";
    };

    const homeContent = () => {
        //homepage for guest
        if (!user) {
            return (
                <>
                    <p className="home-container--flavor">
                        Welcome to Drinkdex! We have many delicious cocktail recipes from users around the world. No matter if you're looking for a classic cocktail, a punch for a party or an original concoction, we have a cocktail recipe for every taste and occasion, just a shake, stir or pour away.
                    </p>

                    <h3 className="home-container--title">Get Started</h3>

                    <p className="home-container--flavor">
                        Lets get started! Use the bottom navigation bar to find drink recipes according to the type of drink or key ingedients. By signing up now you can save drinks to your profile and even post your own recipes for others to save and share!
                    </p>

                    <span className="home-container--btn" onClick={() => openAuthenticate()}>Login/Sign Up</span>

                    <br/>
                    <br/>
                    <br/>
                </>
            )
        }
        //homepage for logged in user
        if (user) {
            return (
                <>
                    <h3 className="home-container--title">Saved Drinks</h3>

                    {
                        user.savedDrinks.length === 0 ? (
                            <p className="home-container--flavor">
                                *You currently have no drinks saved
                            </p>
                        ) : (
                            <DrinkGrid 
                                drinkResults = {user.savedDrinks}
                                user = {user}
                                refreshUser = {refreshUser}
                                gridName = {'user-grid'}
                            />
                        )
                    }

                    <h3 className="home-container--title">Created Drinks</h3>

                    {
                        createdDrinks === undefined || createdDrinks?.length === 0 ? (
                            <p className="home-container--flavor">
                                *You haven't created any drinks
                            </p>
                        ) : (
                            <DrinkGrid 
                                drinkResults = {createdDrinks}
                                user = {user}
                                refreshUser = {refreshUser}
                                gridName = {'user-grid'}
                            />
                        )
                    }

                    {/* {createdDrinksGrid()} */}

                    {/* <h3 className="home-container--title">About</h3> */}
                    
                </>
            )
        }
    }

    const pendingId = () => randomDrink === undefined ? 'random' : randomDrink.id;

    return (
        <div className="home-container">

            <h2 className="home-container--title">Random Drink</h2>

            <CardLarge
                randomDrink = {randomDrink}
                id = {pendingId()}
                user = {user}
                openFull = {openFullDisplay}
                refreshUser = {refreshUser}
            />

            <CardFull 
                drink = {randomDrink}
                id = {pendingId()}
                user = {user}
                closeFull = {closeFullDisplay}
                refreshUser = {refreshUser}
            />

            {homeContent()}

        </div>
    );
};

export default Home;