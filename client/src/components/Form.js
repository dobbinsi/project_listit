import React from 'react';

const Form = (props) => {
    const { submitHandler, product, setProduct, errors, buttonText } = props;

    const onChangeHandler = (e) => {
        const newStateObject = { ...product };
        newStateObject[e.target.name] = e.target.value;
        setProduct(newStateObject);
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="logregform">
                    <label className="form-labels">Title:</label>
                    <input onChange={onChangeHandler} className="login-input" type="text" name="title" value={product.title} />
                    {
                        errors.title ?
                            <span>{errors.title.message}</span>
                            : null
                    }
                </div>
                <div className="logregform">
                    <label className="form-labels">Image (URL):</label>
                    <input className="login-input" type="text" name="image" value={product.image} onChange={onChangeHandler} />
                    {
                        errors.image ?
                            <span>{errors.image.message}</span>
                            : null
                    }
                </div>
                <div className="logregform">
                    <label className="form-labels">Description:</label>
                    <input className="login-input" type="text" name="description" value={product.description} onChange={onChangeHandler} />
                    {
                        errors.description ?
                            <span>{errors.description.message}</span>
                            : null
                    }
                </div>
                <div className="logregform">
                    <label className="form-labels">Category:</label>
                    <select className="create-dropdown" name="categories" value={product.categories} onChange={onChangeHandler} >
                        <option value="none" defaultValue hidden>Select</option>
                        <option value="Electronics/Media">Electronics/Media</option>
                        <option value="Home/Garden">Home/Garden</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Vehicles">Vehicles</option>
                        <option value="Toys/Games/Hobbies">Toys/Games/Hobbies</option>
                        <option value="Sports/Outdoors">Sports/Outdoors</option>
                        <option value="Pet Supplies">Pet Supplies</option>
                        <option value="General">General</option>
                        <option value="Collectibles/Art">Collectibles/Art</option>
                        <option value="Business Equipment">Business Equipment</option>
                    </select>
                    {
                        errors.categories ?
                            <span>{errors.categories.message}</span>
                            : null
                    }
                </div>
                <div className="logregform">
                    <label className="form-labels">Condition:</label>
                    <select className="create-dropdown" name="condition" value={product.condition} onChange={onChangeHandler} >
                        <option value="none" defaultValue hidden>Select</option>
                        <option value="New">New</option>
                        <option value="Used (normal wear)">Used (normal wear)</option>
                        <option value="For parts">For parts</option>
                        <option value="Other (see description)">Other (see description)</option>
                    </select>
                    {
                        errors.condition ?
                            <span>{errors.condition.message}</span>
                            : null
                    }
                </div>
                <div className="logregform">
                    <label className="form-labels">Price ($):</label>
                    <input className="login-input" type="number" name="price" value={product.price} onChange={onChangeHandler} />
                    {
                        errors.price ?
                            <span>{errors.price.message}</span>
                            : null
                    }
                </div>
                <div className="logregform">
                    <label className="form-labels">Location (ZIP Code):</label>
                    <input className="login-input" type="text" name="location" value={product.location} onChange={onChangeHandler} />
                    {
                        errors.price ?
                            <span>{errors.price.message}</span>
                            : null
                    }
                </div>
                <div className="center-button">
                    <button class="hover-button" type="submit">{buttonText}</button>
                </div>
            </form>
        </div>
    )
}

export default Form;


