import React, {useState, useEffect} from 'react';
import { SearchResultList } from '../components/search'
import { BaseLayoutListPages } from '../layouts'
import Search from '../components/search/Search'
import { appConfig } from '../config';
import { Pagination } from '../components/pagination';
import { Helmet } from 'react-helmet';

const searchApi = `https://api.themoviedb.org/3/search/`

const SearchResultsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState('movie');
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getSearchResults();

    // eslint-disable-next-line
  }, [searchType, pageNumber]);

  const getSearchResults = async () => {
    if (searchQuery) {
      const response = await fetch(searchApi + `${searchType}?api_key=${appConfig.tmdb_key}&query=${encodeURI(searchQuery)}&page=${pageNumber}`);
      if (!response.ok) {
        console.error('Something wrong with api link');
      }
      const resultsData = await response.json();
      setSearchResults(resultsData.results);

      const npages = resultsData.total_pages;
      setTotalPages(npages);
    }
  }

  const handleOnSubmit = async (ev) => {
    ev.preventDefault();
    getSearchResults();
  }

  const handleOnChange = (e) => {
    setSearchQuery(e.target.value);
  }

  return (
    <BaseLayoutListPages>
      <Helmet>
        <title>Search | Movie db</title>
        <meta 
          name='description'
          content='Search Movies and TV Shows'
        />
      </Helmet>

      <Search handleOnSubmit={handleOnSubmit} handleOnChange={handleOnChange} searchQuery={searchQuery}/>
      <SearchResultList searchQuery={searchQuery} searchResults={searchResults} searchType={searchType} setSearchType={setSearchType}/>
      
      {totalPages > 1 && 
        <Pagination setPageNumber={setPageNumber} nPages={totalPages}/>
      }
    </BaseLayoutListPages>
  )
}

export default SearchResultsPage
