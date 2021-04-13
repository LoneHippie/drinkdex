import React, { useState, useEffect } from 'react';

import CreateDrinkForm from './CreateDrinkForm';

import './../styles/navoptions.scss';
import BlankState from './BlankState';

const NavOptions = (props) => {

    const { navState, toggleToGrid, backHome, user } = props;

    const [ selectedOption, setSelectedOption ] = useState(undefined);

    //to refresh the state of the component when navState is changed
    useEffect(() => {
        if (navState.categories === true) {
            setSelectedOption('categories');
        } else if (navState.spirits === true) {
            setSelectedOption('spirits');
        } else if (navState.create === true) {
            setSelectedOption('create');
        } else {
            setSelectedOption(undefined);
        }
    }, [navState]);

    //will expand over ON TOP of Hero. Upon selecting an option it will dexpand and Hero will be replaced with the drink grid

    const categoryOptions = () => {
        return <ul className="options-container__list">
            <li id="citrus" onClick={(e) => toggleToGrid(e)}>citrus</li>
            <li id="sweet" onClick={(e) => toggleToGrid(e)}>sweet</li>
            <li id="bitter" onClick={(e) => toggleToGrid(e)}>bitter</li>
            <li id="thick" onClick={(e) => toggleToGrid(e)}>thick</li>
            <li id="strong" onClick={(e) => toggleToGrid(e)}>strong</li>
            <li id="light" onClick={(e) => toggleToGrid(e)}>light</li>
        </ul>
    }

    const spiritOptions = () => { //more can be added later
        return <ul className="options-container__list">
            <li id="vodka" onClick={(e) => toggleToGrid(e)}>vodka</li>
            <li id="gin" onClick={(e) => toggleToGrid(e)}>gin</li>
            <li id="tequila" onClick={(e) => toggleToGrid(e)}>tequila</li>
            <li id="whiskey" onClick={(e) => toggleToGrid(e)}>whiskey</li>
            <li id="rum" onClick={(e) => toggleToGrid(e)}>rum</li>
        </ul>
    }

    const createOption = () => {
        return <CreateDrinkForm 
            user = {user}
            backHome = {backHome}
        />
    }

    const selectedNavOptions = () => {
        if (selectedOption === 'categories') {
            return categoryOptions();
        }
        if (selectedOption === 'spirits') {
            return spiritOptions();
        }
        if (selectedOption === 'create') {
            return createOption();
        } 
        return <BlankState />
    }

    return (
        <section className="options-container">

            {selectedNavOptions()}
            
        </section>
    )
}

export default NavOptions;