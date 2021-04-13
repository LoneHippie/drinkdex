import React from 'react'

import SaveButton from './SaveButton';
import BlankState from './BlankState';

import './../styles/cardLarge.scss';

const CardLarge = (props) => {

    const { user, randomDrink, id, openFull, refreshUser } = props;

    const coverImage = () => {
        return randomDrink && randomDrink?.coverImage !== undefined ? `${randomDrink.coverImage}` : "https://media.istockphoto.com/vectors/alcohol-cocktail-drink-vector-neon-icon-food-blue-neon-illustration-vector-id1215989223?k=6&m=1215989223&s=170667a&w=0&h=wORytj0B6AzIiEDvf-5lCwTqw_i_3J6ASZPP9LkfE6s=";
    };

    const isAuthor = () => {
        if (randomDrink.createdBy !== undefined) {
            if (user === undefined) {
                return false;
            } else {
                return randomDrink.createdBy[1] === user._id ? true : false;
            }
        } else {
            return false;
        }
    };

    return (
        <article className="largecard" id={`card-${id}`}>

            <section className="largecard__display">

                <h3 className="largecard__display--title">{randomDrink ? randomDrink.name : 'Fetching Drink'}</h3>

                <img className="largcard__display--image" src={coverImage()} alt="large drink background" style={{width: '100%', height: '100%'}}></img>

            </section>

            <section className="largecard__info">

                <span className="largecard__info--summary">
                    {randomDrink ? randomDrink.description : 'We\'re coming as fast as we can to brink you a drink! If we take to long, please refresh us!'}
                </span>
                
                <div className="largecard__info__actions">
                   
                    <span 
                        className="largecard__info__actions--more"
                        onClick={() => openFull(id)}
                    >
                        More
                    </span>

                    {
                        randomDrink ? (
                            <SaveButton 
                                drink = {id}
                                user = {user}
                                className = {"largecard__info__actions"}
                                refreshUser = {refreshUser}
                                isAuthor = {isAuthor()}
                            />
                        ) : (
                            <BlankState />
                        )
                    }

                </div>

            </section>

        </article>
    )
}

export default CardLarge;