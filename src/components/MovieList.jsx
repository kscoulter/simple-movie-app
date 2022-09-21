import React, { useState, useEffect } from "react";
import axios from 'axios';

const MovieCard = (props) => {
  const {
    id,
    title,
    posterUrl
  } = props;

  return (
    <a className="movieCard" href={`/movie/${id}`} data-testid="movieCard">
        <img src={posterUrl} alt={`${title} movie poster`}></img>
        <h2 className="movieTitle">{title}</h2>
    </a>
  )
}

const MovieList = (props) => {
  const [movieList, setMovieList] = useState([])
  const [page, setPage] = useState(1) // use for pagination
  const [isLoading, setLoading] = useState(false)

  const fetchMovies = () => {
    setLoading(true)
    axios
      .get(`/movie/list/${page}`)
      .then((res) => {
        setMovieList(res.data["Search"])
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    fetchMovies()
    return () => {
      // cancel the request before component unmounts
      source.cancel();
    }
  }, [,page])

  const prevPage = () => {
    if(page > 1) setPage(page - 1)
  }

  const nextPage = () => {
    // api taps out at 100 pages
    if(page < 100) setPage(page + 1)
  }

  // would be nice to add shimer animation to this later
  const renderSkeleton = () => {
    return [1, 2, 3].map((index) => {
      return (
      <div className="movieCard" key={index} data-testid="loadingPlaceholder" aria-label="loading movies">
        <img src="http://lexingtonvenue.com/media/poster-placeholder.jpg" aria-hidden="true"></img>
        <h2 className="movieTitle"></h2>
      </div>)})
  }

  return (
    <>
      <div className="moviesList">
        {isLoading ?
          renderSkeleton()
          :
          movieList.map((movie) => {
            return <MovieCard 
                      key={movie.imdbID}
                      id={movie.imdbID}
                      title={movie["Title"]}
                      year={movie["Year"]}
                      posterUrl={movie["Poster"]} />
          }) 
        }
      </div>
      <div className="moviesList-pagination">
        <button onClick={prevPage} arial-label="previous page">prev</button>
        <span arial-label="page number" data-testid="pageNumber"> {page} </span>
        <button onClick={nextPage} arial-label="next page">next</button>
      </div>
    </>
  )
}

export default MovieList;