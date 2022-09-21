import React from 'react'
import { render, waitForElement, screen } from '@testing-library/react'
import axios from 'axios'

import MovieDetail from './MovieDetail'

jest.mock('axios')

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '123',
  })
}));

const data = {
  "Title": "The 355",
  "Genre": "Action, Thriller",
  "Director": "Simon Kinberg",
  "Plot": "When a top-secret weapon falls into mercenary hands, a wild card CIA agent joins forces with three international agents on a lethal mission to retrieve it, while staying a step ahead of a mysterious woman who's tracking their every m",
  "Poster": "https://m.media-amazon.com/images/M/MV5BNzk4MDZhNTctMDA3OC00ODdkLWIyOWYtN2M0MzA3MDY5NDk1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
}

describe('MovieDetail', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  axios.get.mockResolvedValue({
    data,
    status: 200
  })
  
  it('shows movie details', async () => {
    render(<MovieDetail />)
    await waitForElement(() => screen.getByTestId("moviePage"))
    expect(axios.get).toHaveBeenCalledWith("/movie/detail/123")
    for (const property in data) {
      if(property !== "Poster") {
        screen.getByText(data[property])
      }
    }
  })
})