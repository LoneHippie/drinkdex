import React from 'react';

import CardMini from './CardMini';
import CardFull from './CardFull';

import './../styles/drinkgrid.scss';

const DrinkGrid = (props) => {

    const { drinkResults, user, refreshUser, gridName } = props;

    const imageFallback = "https://media.istockphoto.com/vectors/alcohol-cocktail-drink-vector-neon-icon-food-blue-neon-illustration-vector-id1215989223?k=6&m=1215989223&s=170667a&w=0&h=wORytj0B6AzIiEDvf-5lCwTqw_i_3J6ASZPP9LkfE6s=";

    function openFullDisplay(ID) {
        document.getElementById(`card-${ID}-full`).style.display = "block";
    };
    function closeFullDisplay(ID) {
        document.getElementById(`card-${ID}-full`).style.display = "none";
    };

    const allCards = drinkResults.map((el, index) => {

        return (
            <article className="card" key={`card-${el.id}`}>

                <CardMini 
                    id={el.id}
                    drink={el}
                    user={user}
                    imageFallback={imageFallback}
                    openFull={openFullDisplay}
                />

                <CardFull 
                    id={el.id}
                    drink={el}
                    user={user}
                    imageFallback={imageFallback}
                    closeFull={closeFullDisplay}
                    refreshUser = {refreshUser}
                />

            </article>
        )
    })

    return (
        <section className={gridName}>
            {allCards}
        </section>
    );
};

export default DrinkGrid;