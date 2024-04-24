import React, { useState, useEffect } from 'react';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define your backend search API endpoint URL
  const searchApiUrl = '/api/search';

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!searchTerm) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${searchApiUrl}?title=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error(error);
      setError('Error searching PDFs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Clear search results and errors when component unmounts
    return () => {
      setSearchResults([]);
      setError(null);
    };
  }, []);

  return (
    <div className="search-page">
      <h1>Search PDFs</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search by Title:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((result) => (
            <li key={result._id}>{result.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;