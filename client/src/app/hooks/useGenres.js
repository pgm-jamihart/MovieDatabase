const useGenres = (filteredGenres) => {
  if (filteredGenres.length < 1 ) return '';

  const genreIds = filteredGenres.map(genre => { return genre.id });

  const reducer = (accumulator, currentValue) => accumulator+ ',' + currentValue;
  
  return genreIds.reduce(reducer)
}

export default useGenres