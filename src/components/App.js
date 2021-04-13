import React, { useState, useEffect } from 'react';

import './../styles/base.scss';

import Loading from './Loading';
import Header from './Header';
import Home from './Home';
import DrinkGrid from './DrinkGrid';
import BlankState from './BlankState';
import NavOptions from './NavOptions';
import Navbar from './Navbar';

/*
    Notes: 

    7/4/21 - Make createdBy[0] refresh when user changes usernames

*/////////

const App = () => {

////////// USER LOGIC

    const [ user, setUser ] = useState(undefined);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    //on load check for valid jwt and retrieve user data
    useEffect(() => {
        fetch('https://drinkdex.herokuapp.com/api/v1/users/me', {
            credentials: 'include'
        })
            .then(res => res.ok ? res.json() : res)
            .then(resJson => {
                if (resJson.status === 'success') {
                    setUser(resJson.data.data);
                } else {
                    setUser(undefined);
                };
                setIsLoggedIn(resJson.status === 'success' ? true : false);
            })
            .then(() => {
                setTimeout(() => { //delay to allow brief animation play and smoothing
                    setIsLoading(false);
                }, 800);
            });
    }, []);

    async function refreshUser() {
        fetch('https://drinkdex.herokuapp.com/api/v1/users/me', {
            credentials: 'include' //THIS IS HOW YOU DETECT HTTPONLY COOKIE, FUCK YEAH
        })
            .then(res => res.ok ? res.json() : res)
            .then(resJson => {
                if (resJson.status === 'success') {
                    setUser(resJson.data.data);
                } else {
                    setUser(undefined);
                };
                setIsLoggedIn(resJson.status === 'success' ? true : false);
            });
    };

////////// DATA FETCH/SORT

    const [ drinks, setDrinks ] = useState([]);
    const [ randomDrink, setRandomDrink ] = useState(undefined);

    //initial fetch of data for drinks and randomDrink
    useEffect(() => {
        //fetch all drinks
        fetch('https://drinkdex.herokuapp.com/api/v1/drinks')
            .then(res => res.json())
            .then(resJson => resJson.data.data)
            .then(allDrinks => {
                //set drinks
                setDrinks(allDrinks);
                //get random id from drinks and query it
                let random = Math.floor(Math.random() * allDrinks.length);
                return fetch(`https://drinkdex.herokuapp.com/api/v1/drinks/${allDrinks[random].id}`);
            })
            .then(res => res.json())
            .then(resJson => setRandomDrink(resJson.data.data));
    }, []);

    const [ drinkResults, setDrinkResults ] = useState([]);
    const [ gridState, setGridState ] = useState(false);

    //functionality for switching to results grid after a search
    function toggleToGrid (e) {
        const search = e.target.id;

        let results = [];

        //open grid and set gen data for drinks by spirits
        if (search === 'vodka' || search === 'gin' || search === 'tequila' || search === 'whiskey' || search === 'rum') {
            setGridState(true);
            setNavState({categories: false, spirits: false, create: false});

            drinks.forEach(el => {
                if (el.spirits.includes(search)) {
                    results.push(el);
                };
            });
        };

        //open grid and set gen data for drinks by categories
        if (search === 'citrus' || search === 'sweet' || search === 'bitter' || search === 'thick' || search === 'strong' || search === 'light') {
            setGridState(true);
            setNavState({categories: false, spirits: false, create: false});

            drinks.forEach(el => {
                if (el.categories.includes(search)) {
                    results.push(el);
                };
            });
        };

        //set result state
        setDrinkResults(results);
    };

////////// NAVIGATION

    //state to keep track of which nav option is open or not so as to only have one open at a time
    const [ navState, setNavState ] = useState({ categories: false, spirits: false, create: false });

    //onclick event for Navbar: changes state of navState accordingly
    function openOption(e) {
        const btn = e.target.id;

        //close and open full cards
        document.querySelector('.cardfull').style.display = "none";

        if (btn === 'btn-categories') {
            if (navState.categories === true) { return setNavState({categories: false, spirits: false, create: false}) }
            setNavState({categories: true, spirits: false, create: false});
        } else if (btn === 'btn-spirits') {
            if (navState.spirits === true) { return setNavState({categories: false, spirits: false, create: false}) }
            setNavState({categories: false, spirits: true, create: false});
        } else if (btn === 'btn-create') {
            if (navState.create === true) { return setNavState({categories: false, spirits: false, create: false}) }
            setNavState({categories: false, spirits: false, create: true});
        }
    };

    function openCard(e) {
        const target = e.target.id;
        document.getElementById(`${target}-full`).style.display = 'flex';
    };

    function backHome() {
        setNavState({categories: false, spirits: false, create: false});
        setGridState(false);
    };

////////// APP PARENT COMPONENTS

    const appBodyRender = () => {
        if (gridState === false) {
            return <Home 
                randomDrink = {randomDrink}
                drinks = {drinks}
                user = {user}
                openCard = {openCard}
                refreshUser = {refreshUser}
            />
        }

        return <DrinkGrid
            drinkResults = {drinkResults}
            user = {user}
            openCard = {openCard}
            refreshUser = {refreshUser}
            gridName = {'drink-grid'}
        />
    };

    const appRender = () => {
        return isLoading ? (
            <Loading />
        ) : (
            <main>
                <Header 
                    loggedStatus = {isLoggedIn}
                    user = {user}
                    drinks = {drinks}
                    backHome = {backHome}
                />

                {appBodyRender()}

                {
                    navState.categories === false &&
                    navState.spirits === false &&
                    navState.create === false ? (
                        <BlankState />
                    ) : (
                        <NavOptions 
                            navState = {navState}
                            toggleToGrid = {toggleToGrid}
                            backHome = {backHome}
                            user = {user}
                        />
                    )
                }
                <Navbar 
                    openOption = {openOption}
                    user = {user}
                />
            </main>
        );
    };

    return (
        appRender()
    );
};

export default App;