import { useState } from "react";

function Add() {
    const [movie, setMovie] = useState({
        name: "",
        category: ""
    });
    const [error, setError] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setMovie((prevMovie) => ({
            ...prevMovie,
            [name]: value
        }));
        setError(true)
    }

    function handleSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:5000/addMovie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            alert('Movie has been added');
            console.log(data);
        })
        .catch(error => {
            setError(error.message);
            console.error('Error:', error);
        });

        setMovie({ 
            name: "",
            category: ""
        })
    }

    return (
        <div className="displayFlex">
            <form onSubmit={handleSubmit} className="addWrapper">
            {error ? <p style={{color: 'red'}}>{error}</p> : null}
                <input
                    name="name"
                    placeholder="name"
                    value={movie.name}
                    onChange={handleChange}
                />
                <input
                    name="category"
                    placeholder="category"
                    value={movie.category}
                    onChange={handleChange}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default Add;
