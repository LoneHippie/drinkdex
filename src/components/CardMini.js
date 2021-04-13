import React from 'react';

import './../styles/cardMini.scss';
import SaveButton from './SaveButton';

const CardMini = (props) => {

    const { drink, id, user, loggedStatus, imageFallback, openFull } = props;

    const isAuthor = () => {
        if (drink.createdBy !== undefined) {
            if (user === undefined) {
                return false;
            } else {
                return drink.createdBy[1] === user._id ? true : false;
            }
        } else {
            return false;
        }
    };

    return (
        <div 
            className="card__mini" 
            id={`card-${id}-mini`} 
            key={`cardmini-${id}`}
            onClick={() => openFull(id)}
            // style={{background: `${drink.coverImage === undefined ? imageFallback : `url(${drink.coverImage})`}`}}
        >

            <img className="card__mini--image" src={drink.coverImage === undefined ? imageFallback : drink.coverImage} alt="minified card background"></img>

            <span className="card__mini--name">{drink.name}</span>

            <SaveButton 
                drink = {id}
                user = {user}
                className = {"card__mini"}
                loggedStatus = {loggedStatus}
                isAuthor = {isAuthor()}
            />

        </div>
    )
}

export default CardMini
