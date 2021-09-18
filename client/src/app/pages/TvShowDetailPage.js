import React, { useState, useEffect } from 'react';
import { BaseLayout } from '../layouts';
import { appConfig } from '../config';
import { DetailCastTV, DetailCommentsTV, DetailInfo, DetailReviewsTV } from '../components/detail';
import { useAuth, useFirestore } from '../contexts/firebase';
import useFetch from '../hooks/useFetch';
import { Helmet } from 'react-helmet';

const api = `https://api.themoviedb.org/3/tv/`;

const TvShowDetailPage = (props) => {
  const id = props.match.params.id;

  const [movieDbRev, setMovieDbRev] = useState([]);
  const [movieDbCom, setMovieDbCom] = useState([]);
  const [movieDbRevRating, setMovieDbRevRating] = useState('');
  const [watchlist, setWatchlist] = useState(false);

  const [data, isLoading, error] = useFetch(api + `${id}?api_key=${appConfig.tmdb_key}`);
  
  const { getTvShowReviews, getUserWatchlist, getTvShowComments, getTvShowById } = useFirestore(); 
  const {currentUser} = useAuth();
 
  useEffect(() => {
    fetchDataReviews(); 
    fetchDataWatchlist();
    fetchDataComments();
    fetchTvShowById();

    // eslint-disable-next-line
  }, []);

  const fetchDataReviews = async () => {
    const tvshowReviews = await getTvShowReviews(id);
    setMovieDbRev(tvshowReviews);
  };

  const fetchDataWatchlist = async () => {
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
  };

  const fetchDataComments = async () => {
    const MoviesComments = await getTvShowComments(id);
    setMovieDbCom(MoviesComments);
  };

  const fetchTvShowById = async () => {
    const tvshow = await getTvShowById(id);
    const roundedRating = Math.floor(tvshow.avgRating)
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
              <title>{data.name} | Movie db</title>
              <meta 
                name='description'
                content={data.overview}
              />
            </Helmet>

            <div>
              <DetailInfo {...data} mediaType="tv" reviewScore={movieDbRevRating} watchlist={watchlist}/>
              <DetailCastTV {...data}/>
              <DetailReviewsTV reviews={movieDbRev} tvshowRef={data.id}/>
              <DetailCommentsTV comments={movieDbCom} tvshowRef={data.id}/>
            </div>
          </>
      }
    </BaseLayout>
  )
}

export default TvShowDetailPage
