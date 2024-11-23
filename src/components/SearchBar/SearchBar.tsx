import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
    const [query, setQuery] = useState<string>('');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);

    useEffect(() => {
        const storedSearchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        setSearchHistory(storedSearchHistory);
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        if (query.trim() === '') {

            toast.error("Enter a word to search for photos", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return;
        }

        const updatedSearchHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 10);
        localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
        setSearchHistory(updatedSearchHistory);
        onSubmit(query);
    };

    return (
        <header className={styles.searchBar}>
            <form onSubmit={handleSubmit} className={styles.searchForm}>
                <input
                    className={styles.input}
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
