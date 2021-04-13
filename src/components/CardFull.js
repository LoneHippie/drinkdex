import React, { useState } from 'react';

import SaveButton from './SaveButton';
import BlankState from './BlankState';

import './../styles/cardfull.scss';

const CardFull = (props) => {

    const { drink, id, user, closeFull, refreshUser } = props;

    const drinkTags = () => {
        if (drink !== undefined) {
            const arrCategories = drink.categories.map(el => el);
            const spiritCategoires = drink.spirits.map(el => el);
            const tags = [...arrCategories, ...spiritCategoires];

            return tags.map((el, index) =>
                    <span key={`drink-${index}-tag`} className="card-tag-container--tag">{el}</span>
                )
        } else {
            return <BlankState />
        }
    };

    const drinkIngredients = () => {
        if (drink !== undefined) {
            return drink.ingredients.map((el, index) =>
                <li key={`drink-${index}-ingredient`}>{el}</li>
            )
        } else {
            return <BlankState />
        }
    };

    const drinkInstructions = () => {
        if (drink !== undefined) {
            return drink.instructions.map((el, index) =>
                <li key={`drink-${index}-instruction`}>{el}</li>
            )
        } else {
            return <BlankState />
        }
    };

    const coverImage = () => {
        return drink && drink?.coverImage !== undefined ? <img className="card-image" src={drink.coverImage} alt="cocktail"></img> : <img className="card-image" src="https://media.istockphoto.com/vectors/alcohol-cocktail-drink-vector-neon-icon-food-blue-neon-illustration-vector-id1215989223?k=6&m=1215989223&s=170667a&w=0&h=wORytj0B6AzIiEDvf-5lCwTqw_i_3J6ASZPP9LkfE6s=" alt="cocktail placeholder"></img>;
    };

    const isAuthor = () => {
        if (drink?.createdBy !== undefined) {
            if (user === undefined) {
                return false;
            } else {
                return drink.createdBy[1] === user?._id ? true : false;
            }
        } else {
            return false;
        }
    };

    //state for rendering delete confirmation
    const [ confirmationOpen, setConfirmationOpen ] = useState(false);

    function openConfirmation() {
        setConfirmationOpen(true);
    };

    function closeConfirmation() {
        setConfirmationOpen(false);
    };

    async function deleteDrink(e) {
        e.preventDefault();
        try {
            if (drink?.imageId !== undefined) { //delete image ref in db, doesn't delete file
                fetch(`api/v1/images/${drink.imageId}`, {
                    method: 'DELETE'
                });
            }

            fetch(`api/v1/drinks/${id}`, {
                method: 'DELETE'
            })
            .then(() => {
                window.location.reload();
            });
        } catch(err) {
            console.log('ERROR');
        }
    }

    const deleteButton = () => {
        if (isAuthor()) {
            return (
                <>
                    <button className="card-body--delete" onClick={() => openConfirmation()}>Delete Drink</button>
                </>
            )
        } else {
            return <></>
        }
    };

    return (
        <div className="cardfull" id={`card-${id}-full`}>

            <section className="cardfull__header">
                <h3 className="cardfull__header--name">{drink !== undefined ? drink.name : 'Drink name'}</h3>
                <span className="cardfull__header--close" onClick={() => closeFull(id)}>X</span>
            </section>

            <section className="card-body">

                <div className="card-body__display">
                    
                    {coverImage()}

                    <span className="card-body--author">{drink !== undefined && drink.createdBy[0] !== undefined ? `By ${drink.createdBy[0]}` : ''}</span>

                    <div className="card-tag-container">
                        {drinkTags()}
                    </div>

                    <SaveButton 
                        drink = {id}
                        user = {user}
                        className = {"card-save"}
                        refreshUser = {refreshUser}
                        isAuthor = {isAuthor()}
                    />

                    {deleteButton()}

                    {
                        confirmationOpen ? (
                            <div className="card-body--delete-confirmation" onClick={() => closeConfirmation()}>
                                <div className="card-body--delete-confirmation--center">
                                    <span>Are you sure?</span>
                                    <div className="card-body--delete-confirmation--center-buttons">
                                        <button className="card-body--delete-confirmation--confirm" onClick={(e) => deleteDrink(e)}>Delete</button>
                                        <button className="card-body--delete-confirmation--cancel" onClick={() => closeConfirmation()}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )
                    }

                </div>

                <div className="card-body__info">

                    <h4 className="card-summary--title">Summary</h4>
                    
                    <div className="card-summary-container">
                        <p className="card-summary-container--summary">
                            {drink ? drink.description : 'Your drink is on the way'}
                        </p>
                    </div>

                    <h4 className="card-ingredients--title">Ingredients</h4>

                    <div className="card-ingredients-container">
                        <ul className="card-ingredients-container__list">
                            {drinkIngredients()}
                        </ul>
                    </div>

                    <h4 className="card-instructions--title">Instructions</h4>

                    <div className="card-instructions-container">
                        <ul className="card-instructions-container__list">
                            {drinkInstructions()}
                        </ul>
                    </div>

                </div>

            </section>
            
        </div>
    );
};

export default CardFull;