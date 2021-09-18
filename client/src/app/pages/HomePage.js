import { BaseLayout } from '../layouts';
import { TopRatedTvShowsList } from '../components/homepageList'
import { PopularMoviesList } from '../components/homepageList'

const HomePage = () => {
  return (
    <BaseLayout>
      <PopularMoviesList />
      <TopRatedTvShowsList />
    </BaseLayout>
  );
};

export default HomePage;