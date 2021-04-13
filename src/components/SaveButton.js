import React, { useState, useEffect } from 'react';

const SaveButton = (props) => {

    const { drink, user, className, refreshUser, isAuthor } = props;

    const [ isSaved, setIsSaved ] = useState(false);

    //check and set whether drink is already saved or not
    useEffect(() => {
        const saved = () => {
            if (user !== undefined && drink !== undefined) {
                return user.savedDrinks.some(el => el.id === drink);
            } else {
                return false;
            }
        };

        setIsSaved(saved());
    }, [user, drink]);

    async function saveDrink(e) {

        //disable clicking while patch request is in process
        e.target.style.pointerEvents = 'none';

        //set patch route
        const route = isSaved ? 'removeDrink' : 'addDrink';

        try {
            setTimeout(() => {
                fetch(`https://drinkdex.herokuapp.com/api/v1/users/${route}/${drink}`, { 
                    method: 'PATCH'
                })
                .then(res => {
                    if (res.ok && !isSaved) {
                        refreshUser();
                    }
                    if (res.ok && isSaved) {
                        refreshUser();
                    }

                    setTimeout(() => {
                        e.target.style.pointerEvents = 'auto';
                    }, 500);
    
                    return res;
                });
            }, 100);

        } catch (err) {
            console.log('An error occurred');
        }
    };
    
    const btnSave = () => {

        if (user === undefined) {
            return <img
                        className={`${className}--btn-save inactive`} 
                        src="https://drinkdex.herokuapp.com/images/icons/heart-disabled.svg"
                        alt="save drink button"
                    >
                    </img>
        } else {
            if (isAuthor) {
                return <img 
                            className={`${className}--btn-save author`}
                            src="https://drinkdex.herokuapp.com/images/icons/signature.svg"
                            alt="creator of drink icon"
                        >
                        </img>
            } else if (isSaved) {
                return <img
                            className={`${className}--btn-save favorited`}
                            onClick={(e) => saveDrink(e)}
                            src="https://drinkdex.herokuapp.com/images/icons/heart-full.svg"
                            alt="save drink button"
                        >
                        </img>
            } else {
                return (
                    <img
                        className={`${className}--btn-save active`}
                        onClick={(e) => saveDrink(e)}
                        src="https://drinkdex.herokuapp.com/images/icons/heart-empty.svg"
                        alt="save drink button"
                    >
                    </img>
                )
            }
        }
    };

    return (
        <>
            {btnSave()}
        </>
    )
};

export default SaveButton;