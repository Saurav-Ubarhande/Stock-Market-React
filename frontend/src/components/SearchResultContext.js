// SearchResultContext.js
import React, { createContext, useContext, useState } from 'react';

const SearchResultContext = createContext();

export const SearchResultProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState(null);

  return (
    <SearchResultContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchResultContext.Provider>
  );
};

export const useSearchResults = () => useContext(SearchResultContext)