import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import { AuthProvider, FirebaseProvider, FirestoreProvider } from './contexts/firebase';
import * as Routes from './routes';
import {
  HomePage,
  TvShows,
  Movies,
  SignInPage,
  RegisterPage,
  PasswordResetPage,
  SearchResultsPage,
  MovieDetailPage,
  DashboardPage,
  ProfilePage,
  TvShowDetailPage,
  KeywordsSearchResults,
} from './pages';
import { ThemeContext } from './contexts/theme';
import styles from './App.module.scss';

function App () {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={styles.App} data-theme={theme}>
        <FirebaseProvider>
          <AuthProvider>
            <FirestoreProvider>
              <Router>
                <Helmet>
                  <title>Movie db</title>
                  <meta
                    name="description"
                    content="Discover new movies, tv-shows with rating and reviews"
                  />

                  <meta
                    name="keywords"
                    content="Movies, TV Shows, Search Movie, Search TV Shows, Movie database"
                  />
                </Helmet>

                <Switch>
                  <Route exact path={Routes.LANDING} component={HomePage} />
                  <Route from={Routes.HOME} to={Routes.LANDING} />
                  <Route exact path={Routes.TVSHOWS} component={TvShows} />
                  <Route exact path={Routes.MOVIES} component={Movies} />
                  <Route exact path={Routes.AUTH_SIGN_IN} component={SignInPage} />
                  <Route exact path={Routes.AUTH_REGISTER} component={RegisterPage} />
                  <Route exact path={Routes.AUTH_PASSWORDRESET} component={PasswordResetPage} />
                  <Route exact path={Routes.SEARCHRESULTS} component={SearchResultsPage} />
                  <Route exact path={Routes.KEYWORDSEARCHRESULTS} component={KeywordsSearchResults} />
                  <Route exact path={Routes.MOVIE_DETAILPAGE} component={MovieDetailPage} />
                  <Route exact path={Routes.TVSHOW_DETAILPAGE} component={TvShowDetailPage} />
                  <Route exact path={Routes.ACCOUNT_DASHBOARD} component={DashboardPage} />
                  <Route exact path={Routes.ACCOUNT_PROFILE} component={ProfilePage} />
                </Switch>
              </Router>
            </FirestoreProvider>
          </AuthProvider>
        </FirebaseProvider>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
