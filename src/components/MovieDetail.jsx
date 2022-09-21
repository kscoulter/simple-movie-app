import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState([])
  const { id } = useParams();

  const getMovie = (movieId) => {
    axios
      .get(`/movie/detail/${movieId}`)
      .then((res) => {
        setMovieDetail(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getMovie(id)
  }, [])

  return (
    <div className="movieDetailPage" data-testid="moviePage">
      <div className="left">
        <h1>{movieDetail["Title"]}</h1>
        <h2>{movieDetail["Director"]}</h2>
        <p>{movieDetail["Genre"]}</p>
        <p>{movieDetail["Plot"]}</p>
      </div>
      <div className="right">
        <img src={movieDetail["Poster"]} aria-hidden="true"/>
      </div>
    </div>
  );
}

export default MovieDetail;