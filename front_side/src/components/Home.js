import { useState, useEffect } from "react";
import downloadImage from '../Images/download.png'; // Import the image

function Home() {
    const [categories, setCategories] = useState([]);
    const [movies, setMovies] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [search, setSearch] = useState('');

    useEffect(() => {
        // Fetch categories from server
        fetch('http://localhost:5000/getCategories')
            .then(response => response.json())
            .then(data => setCategories(['All', ...data])) // Adding 'All' category for showing all movies
            .catch(error => console.error('Error:', error));

        // Fetch movies from server
        fetch('http://localhost:5000/getMovies')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/deleteMovie/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => {
            setMovies(movies.filter(movie => movie._id !== id));
        })
        .catch(error => console.error('Error:', error));
    };

    const filteredMovies = movies.filter(movie => {
        const matchesCategory = selectedCategory === 'All' || movie.category === selectedCategory;
        const matchesSearch = movie.name.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div>
            <div className="searchWrapper">
                <input
                    type="search"
                    placeholder="Search"
                    onChange={handleChange}
                    value={search}
                />
            </div>
            <ul className="categoryWrapper">
                {categories.map((value, index) => {
                    return (
                        <li key={index} onClick={() => handleCategoryClick(value)}>
                            {value}
                        </li>
                    );
                })}
            </ul>
            <div className="moviesWrapper">
                {filteredMovies.map((value, index) => {
                    return (
                        <ul key={index}>
                            <img src={downloadImage} alt="Movie" />
                            <li>{value.name}</li>
                            <li>{value.category}</li>
                            <button onClick={() => handleDelete(value._id)}>X</button>
                        </ul>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;
