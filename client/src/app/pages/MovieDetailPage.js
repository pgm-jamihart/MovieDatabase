import React, { useState, useEffect } from 'react';
import { BaseLayout } from '../layouts';
import { appConfig } from '../config';
import { DetailCast, DetailComments, DetailInfo, DetailReviews } from '../components/detail';
import { useAuth, useFirestore } from '../contexts/firebase';
import useFetch from '../hooks/useFetch';
import { Helmet } from 'react-helmet';

const api = `https://api.themoviedb.org/3/movie/`;

const MovieDetailPage = (props) => {
  const id = props.match.params.id;

  const [movieDbRev, setMovieDbRev] = useState([]);
  const [movieDbCom, setMovieDbCom] = useState([]);
  const [movieDbRevRating, setMovieDbRevRating] = useState('');
  const [watchlist, setWatchlist] = useState(false);

  const [data, isLoading, error] = useFetch(api + `${id}?api_key=${appConfig.tmdb_key}`);
  
  const { getMoviesReviews, getUserWatchlist, getMoviesComments, getMovieById } = useFirestore(); 
  const {currentUser} = useAuth();

  
  useEffect(() => {
    fetchDataReviews(); 
    fetchDataWatchlist();
    fetchDataComments();
    fetchMovieById();

    // eslint-disable-next-line
  }, []);

  const fetchDataReviews = async () => {
    const movieReviews = await getMoviesReviews(id);
    setMovieDbRev(movieReviews);
  };

  const fetchDataWatchlist = async () => {
    if (currentUser) {
      const userId = currentUser.uid;
      const userWatchlist = await getUserWatchlist(userId);
      const selectedMovie = userWatchlist.filter(movie => {
        return movie.uid === id
      })
      const watchlistBtn = () => {
        if (selectedMovie.length > 0) {
          return 'Delete from watchlist'
        } else if (selectedMovie.length === 0) {
          return 'Add to watchlist'
        }
      }
      setWatchlist(watchlistBtn())   
    }
  };

  const fetchDataComments = async () => {
    const MoviesComments = await getMoviesComments(id);
    setMovieDbCom(MoviesComments);
  };

  const fetchMovieById = async () => {
    const movie = await getMovieById(id);
    const roundedRating = Math.floor(movie.avgRating)
    setMovieDbRevRating(roundedRating * 2 + ' Review score')
  };

  return (
    <BaseLayout>
      {
        error ? <div>{error.message}</div> :
        isLoading || !data ? 
          <div>Loading</div> :
          <>
            <Helmet>
              <title>{data.title} | Movie db</title>
              <meta 
                name='description'
                content={data.overview}
              />
            </Helmet>
            
            <div>
              <DetailInfo {...data} mediaType="movie" reviewScore={movieDbRevRating} watchlist={watchlist}/>
              <DetailCast {...data}/>
              <DetailReviews reviews={movieDbRev} movieRef={data.id}/>
              <DetailComments comments={movieDbCom} movieRef={data.id}/>
            </div>
          </>
      }
    </BaseLayout>
  )
}

export default MovieDetailPage
