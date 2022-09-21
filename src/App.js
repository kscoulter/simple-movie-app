import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MovieList from './components/MovieList.jsx';
import MovieDetail from './components/MovieDetail.jsx';

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Movie List</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <MovieList />
          </Route>
          <Route path="/movie/:id" children={<MovieDetail />} />
        </Switch>
      </div>
    </Router>
  );
}
