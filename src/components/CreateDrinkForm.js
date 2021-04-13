import React, { useState } from 'react';

import './../styles/createform.scss';

const CreateDrinkForm = (props) => {

    const { user, backHome } = props;

    const [ formName, setFormName ] = useState('');
    const [ formSummary, setFormSummary ] = useState('');

    const [ formIngredients, setFormIngredients ] = useState([]);
    const [ ingredientSearch, setIngredientSearch ] = useState('');

    const [ formInstructions, setFormInstructions ] = useState(['']);

    const [ formCategories, setFormCategories ] = useState([]);

    const [ formImage, setFormImage ] = useState(undefined);
    const [ formUrl, setFormUrl ] = useState('');
    
    //methods for handling form changes
    const formHandlers = {
        changeName: (e) => {
            setFormName(e.target.value);
        },
        changeSummary: (e) => {
            setFormSummary(e.target.value);
        },
        changeIngSearch: (e) => {
            setIngredientSearch(e.target.value);
        },
        changeAddIngredient: (e) => {
            //don't allow adding to ingredients if state already has 6 entries
            if (formIngredients.length > 5) {
                document.getElementById('create-warning-ing').textContent = "Please choose no more than 6 ingredients";
            } else {
                document.getElementById('create-warning-ing').textContent = "";
                setFormIngredients([ ...formIngredients, e.target.id ]);
            }
        },
        changeRemoveIngredient: (e) => {
            const item = e.target.getAttribute("name");
            document.getElementById('create-warning-ing').textContent = "";
            setFormIngredients(formIngredients.filter(el => el !== item));
        },
        changeInstructions: (e) => {
            document.getElementById('create-warning-ins').textContent = "";

            const newArr = [...formInstructions];
            let curIndex = e.target.id;
            curIndex = curIndex.slice(4);
            newArr.splice(curIndex, 1, e.target.value);

            setFormInstructions(newArr);
        },
        changeAddInstruction: () => {
            if (formInstructions.length > 4) {
                document.getElementById('create-warning-ins').textContent = "Please keep instructions under 6 steps"
            } else {
                const newArr = [...formInstructions];
                newArr.push('');
                setFormInstructions(newArr);
            }
        },
        changeRemoveInstruction: () => {
            document.getElementById('create-warning-ins').textContent = "";

            const newArr = [...formInstructions];
            newArr.pop();
            setFormInstructions(newArr);
        },
        changeCategories: (e) => {
            //get shallow copy for state
            const newArr = [...formCategories];

            if (e.target.checked) { //change styles and push input value into state
                document.getElementById(`${e.target.id}-label`).style.color = '#FFFFFF';
                document.getElementById(`${e.target.id}-label`).style.background = "#00a8cc";

                newArr.push(e.target.value);
                setFormCategories(newArr);
            } else { //change style back to default and filter out input value from state
                document.getElementById(`${e.target.id}-label`).style.color = '#0c7b93';
                document.getElementById(`${e.target.id}-label`).style.background = "#FFFFFF";

                let removedArr = newArr.filter(el => el !== e.target.value);
                setFormCategories(removedArr);
            }
        },
        changeImage: (e) => {
            setFormImage(document.getElementById(`${e.target.id}`).files[0]);
            
            const fileName = document.getElementById(`${e.target.id}`).files[0].name;

            document.getElementById('file-chosen').textContent = '';
            setFormUrl(fileName);
        }
    };

    //filter terms for enumed categories and ingredients
    const enums = {
        ingredients: [
            'vodka', 'whiskey', 'tequila', 'gin', 'rum', 'lemon juice', 'lemon', 'triple sec', 'club soda', 'tonic water',
            'mint', 'orange peel', 'sugar', 'simple syrup', 'orange juice', 'baileys', 'kahlua', 'campari', 'sweet vermouth',
            'dry vermouth', 'bitters', 'honey', 'water', 'ginger', 'ginger beer', 'olive', 'cola', 'sprite', 'salt', 'grenadine',
            'lime', 'ginger ale', 'fruit juice', 'lime juice', 'pineapple', 'pineapple juice', 'cranberry juice', 'absinthe', 'coffee liqueur',
            'amaretto', 'chocolate liqueur', 'egg white', 'maple syrup', 'peach liqueur', 'sake', 'arak', 'tomato juice', 'soy sauce', 'tobasco sauce',
            'hot sauce', 'ouzo', 'jagermeister', 'milk', 'coffee', 'tea', 'clove', 'midori', 'cinnamon', 'ice', 'banana liqueur', 'cream',
            'red wine', 'white wine', 'sangria', 'port wine'
        ],
        categories: [
            'citrus', 'sweet', 'bitter', 'thick', 'strong', 'light', 'sour', 'fruity'
        ]
    };

    //searchbar component for adding drink ingredients
    const ingredientSearchbar = () => {

        const filteredIngredients = enums.ingredients.filter(el => {
            let firstPass = el.includes(ingredientSearch);
            let secondPass = formIngredients.includes(el);

            if (firstPass === true && secondPass === false) {
                return el;
            }
        });

        const searchResults = () => {
            if (ingredientSearch.length === 0) {
                return <></>
            } else {
                return filteredIngredients.map((el, index) => 
                    <div className="create__result" key={`results-${index}`}>
                        <li key={`results-text-${index}`}>{el}</li>
                        <img 
                            id={el} 
                            key={`results-btn-${index}`}
                            src="images/icons/plus.svg"
                            alt="add ingredient button"
                            onClick={(e) => formHandlers.changeAddIngredient(e)}
                        >
                        </img>
                    </div>
                )
            }
        };

        return (
            <>
                <input 
                    className="create--search-input" 
                    type="text"
                    onChange={(e) => formHandlers.changeIngSearch(e)}
                    value={ingredientSearch}
                    placeholder="Search for ingredients"
                >
                </input>

                <ul
                    className="create__search"
                    id="ing-search"
                >
                    {searchResults()}
                </ul>
            </>
        )
    };

    //grid component of added drink ingredients
    const addedIngredients = () => {
        
        const ingTags = () => {
            if (formIngredients.length === 0) {
                return <></>
            } else {
                return formIngredients.map((el, index) =>
                    <div className="create__ing-container--ing" key={`add-ing-${index}`}>
                        <span 
                            key={`add-ing-${index}-span`}
                            name={el}
                            onClick={(e) => formHandlers.changeRemoveIngredient(e)}
                        >
                            {el}
                        </span>
                    </div>
                )
            }
        };

        if (formIngredients.length === 0) {
            return <></>
        } else {
            return (
                <div className="create__ing-container">
                    {ingTags()}
                </div>
            );
        }
    };

    //textarea components for drink instructions
    const drinkInstructions = () => {

        return formInstructions.map((el, index) => 
            <div className="create__instruction" key={`instruction-${index}`} id={`instruction-${index}`}>
                <textarea
                    required={true}
                    rows="3"
                    placeholder={`Step ${index + 1}`}
                    value={formInstructions[index]}
                    minLength="4"
                    maxLength="80"
                    onChange={(e) => formHandlers.changeInstructions(e)}
                    id={`ins-${index}`}
                >
                </textarea>
                {
                    index === formInstructions.length -1 ? (
                        <>
                            <img 
                                src="images/icons/plus.svg"
                                alt="add instructions button"
                                onClick={() => formHandlers.changeAddInstruction()}
                            >
                            </img>
                            { index > 0 ? <span onClick={() => formHandlers.changeRemoveInstruction()}>x</span> : <></> }
                        </>
                    ) : (
                        <></>
                    )
                }
            </div>
        );
    };

    //grid component of tags/categories for drinks
    const drinkCategories = () => {

        const gridItems = () => {
            return enums.categories.map((el, index) =>
                <div className="check-el" key={`tag-${el}-${index}`}>
                    <input
                        type="checkbox" 
                        className="create__categories__checkbox checkbox-part" 
                        id={`check-${el}`} 
                        value={el} 
                        onChange={(e) => formHandlers.changeCategories(e)}
                    ></input>
                    <label htmlFor={`check-${el}`} id={`check-${el}-label`}>{el}</label>
                </div>
            )
        };

        return (
            <section className="create__categories">
                {gridItems()}
            </section>
        );
    };

    //submit function for form post
    async function submitDrink(e) {
        e.preventDefault();

        const authMessage = document.getElementById('auth-message');

        if (!formIngredients.length) {
            authMessage.textContent = 'Drink must have at least one ingredient';
            return;
        };
        if (!formCategories.length) {
            authMessage.textContent = 'Drink must have at least one category';
            return;
        };

        try {
            //initialize form data and set uploaded image file as data
            const formData = new FormData();
            formData.append('drinkImage', formImage);

            //upload image and return file path for new drink
            const imageRes = await fetch('api/v1/images', {
                method: 'post',
                body: formData
            });

            //image json for more form data
            const image = await imageRes.json();

            //determine form body req
            const drinkBody = () => {
                if (imageRes.ok) {
                    return {
                        'name': formName,
                        'description': formSummary,
                        'ingredients': formIngredients,
                        'instructions': formInstructions,
                        'categories': formCategories,
                        'createdBy': [ user.username, user._id ],
                        'coverImage': image.data.data.imagePath,
                        'imageId': image.data.data._id
                    }
                } else {
                    return {
                        'name': formName,
                        'description': formSummary,
                        'ingredients': formIngredients,
                        'instructions': formInstructions,
                        'categories': formCategories,
                        'createdBy': [ user.username, user._id ]
                    }
                }
            };

            //create new drink with drinkBody
            let newDrink = await fetch('api/v1/drinks', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(drinkBody())
            });

            const response = await newDrink.json();

            if (response.status === 'fail' || response.status === 'error') {
                console.log('Error');

                if (response.message.includes('duplicate key error')) {
                    authMessage.textContent = "Drink name is already taken";
                }
            } else {
                authMessage.textContent = "Drink created!";

                window.location.reload();
            }

        } catch(err) {
            console.log('Uncaught error occured');
        }
    };

    return (
        <div 
            className="create"
            id="create-form"
        >

            <span className="create--close" onClick={() => backHome()}>
                X
            </span>

            <h3 className="create--head-title">{formName === '' ? 'Drink Name' : formName}</h3>

            <section className="create__container">

                <form
                    className="create__form"
                    id="drink-form"
                    encType="mutlipart/form-data"
                    onSubmit={(e) => submitDrink(e)}
                >

                    <h4 className="create--title">Overview</h4>

                    <input
                        required={true}
                        className="create--input" 
                        type="text" 
                        id="create-name"
                        value={formName}
                        pattern="([A-z0-9À-ž\s]){2,15}"
                        maxLength="15"
                        onChange={(e) => formHandlers.changeName(e)}
                        placeholder="Give your drink a name"
                    >
                    </input>
                    <label className="create--label" htmlFor="create-name">Drink Name</label>

                    <div className="create__ta-container">
                        <textarea
                            required={true}
                            className="create--ta-container--textarea"
                            rows="3"
                            minLength="4"
                            maxLength="200"
                            id="create-summary"
                            value={formSummary}
                            onChange={(e) => formHandlers.changeSummary(e)}
                            placeholder="Describe your drink"
                        >
                        </textarea>
                        <label className="create--ta-container__label" id="summary-label" htmlFor="create-summary">Summary</label>
                    </div>

                    <h4 className="create--title">Ingredients</h4>

                    {ingredientSearchbar()}

                    {addedIngredients()}

                    <span className="create--message" id="create-warning-ing"></span>

                    <h4 className="create--title">Instructions</h4>

                    {drinkInstructions()}

                    <span className="create--message" id="create-warning-ins"></span>

                    <h4 className="create--title">Tags</h4>

                    {drinkCategories()}

                    <h4 className="create--title">Image</h4>

                    <div className="create--upload-container">

                        <input 
                            className="create--upload"
                            type="file"
                            id="drink-upload"
                            onChange={(e) => formHandlers.changeImage(e)}
                            name="drink-upload"
                            accept="image/png, image/jpeg"
                        >    
                        </input>
                        <label className="create--upload-label" htmlFor="drink-upload"><img className="create--upload-icon" src="images/icons/upload.svg" alt="upload file icon"></img></label>

                        <input
                            required={true}
                            className="create--url"
                            type="text"
                            placeholder="url"
                            id="drink-upload-url"
                            value={formUrl}
                            readOnly={true}
                        >
                        </input>

                    </div>
                    <span className="create--file-chosen" id="file-chosen">No file chosen</span>

                </form>

            </section>

            <input
                className="create--btn" 
                type="submit" 
                form="drink-form" 
                value="Create Drink"
            >
            </input>
            <span className="create--auth-message" id="auth-message"></span>

        </div>
    );
};

export default CreateDrinkForm;