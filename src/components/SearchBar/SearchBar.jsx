import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        const storedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        setSearchHistory(storedSearchHistory);
    }, []);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (query.trim() === '') {
            alert('Please enter a search term.');
            return;
        }

        const updatedSearchHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 10); // Оставляем только уникальные последние 10 запросов
        localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
        setSearchHistory(updatedSearchHistory);
        onSubmit(query);
    };

    return (
        <header className={styles.searchBar}>
            <form onSubmit={handleSubmit} className={styles.searchForm}>
                <input className={styles.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={query}
                    onChange={handleInputChange}
                    list="search-suggestions"

                />
                <button type="submit" className={styles.searchButton}>
                    <FaSearch />
                </button>

                {searchHistory.length > 0 && (
                    <datalist id="search-suggestions">
                        {searchHistory.map((historyItem, index) => (
                            <option key={index} value={historyItem} />
                        ))}
                    </datalist>
                )}
            </form>
        </header>
    );
};

export default SearchBar;
