import { BaseLayoutListPages } from '../layouts';
import { MovieList } from '../components/movies_and_tv';
import { Helmet } from 'react-helmet';

const Movies = () => {
  return (
    <BaseLayoutListPages>
      <Helmet>
        <title>Movies | Movie db</title>
        <meta 
          name='description'
          content='Discover new Movies'
        />
      </Helmet>

      <MovieList />
    </BaseLayoutListPages>
  );
};

export default Movies;