import { BaseLayoutListPages } from '../layouts';
import { TvShowList } from '../components/movies_and_tv';
import { Helmet } from 'react-helmet';

const TvShows = () => {
  return (
    <BaseLayoutListPages>
      <Helmet>
        <title>TV Shows | Movie db</title>
        <meta 
          name='description'
          content='Discover new TV Shows'
        />
      </Helmet>
      
      <TvShowList />
    </BaseLayoutListPages>
  );
};

export default TvShows;