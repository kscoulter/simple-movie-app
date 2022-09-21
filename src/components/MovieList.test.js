import React from 'react'
import { render, waitForElementToBeRemoved, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import MovieList from './MovieList'

jest.mock('axios')


const mockedAxios = axios

class CancelToken {
  static source() {
    const cancel = jest.fn()
    const token = new CancelToken()
    return {
      cancel,
      token
    };
  }
}

mockedAxios.CancelToken = CancelToken;

const data = {
  "Search":[
  {
    "Title": "The 355",
    "Year": "2022",
    "imdbID": "tt8356942",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNzk4MDZhNTctMDA3OC00ODdkLWIyOWYtN2M0MzA3MDY5NDk1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
  },
  {
    "Title": "The Ice Age Adventures of Buck Wild",
    "Year": "2022",
    "imdbID": "tt13634480",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNDJmMzQyMzAtMzMxMy00NTI3LTgzOGMtZDU3Yzc4MjRjNzkwXkEyXkFqcGdeQXVyMTA1OTcyNDQ4._V1_SX300.jpg"
  },
  {
    "Title": "Death on the Nile",
    "Year": "2022",
    "imdbID": "tt7657566",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNjI4ZTQ1OTYtNTI0Yi00M2EyLThiNjMtMzk1MmZlOWMyMDQwXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg"
  },
]}

describe('MovieList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  axios.get.mockResolvedValue({
    data,
    status: 200
  })

  it('shows a placeholder while fetching movies', () => {
    render(<MovieList />);
    const placeholderCards = screen.getAllByTestId("loadingPlaceholder")
    expect(placeholderCards).toHaveLength(3)
    const placeholderTitles = screen.getAllByRole('heading', { level: 2 })
    placeholderTitles.map((el) => {
      expect(el).toBeEmpty()
    })
  })

  it('renders a list of movies', async () => {
    render(<MovieList />);
    await waitForElementToBeRemoved(() => screen.getAllByTestId("loadingPlaceholder"))
    screen.getByText("The 355")
    screen.getByText("The Ice Age Adventures of Buck Wild")
    screen.getByText("Death on the Nile")
    expect(screen.getAllByTestId('movieCard')).toHaveLength(3)
    expect(axios.get).toHaveBeenCalledWith("/movie/list/1")
  })

  it('links to movie detail page', async () => {
    render(<MovieList />);
    await waitForElementToBeRemoved(() => screen.getAllByTestId("loadingPlaceholder"))
    screen.getAllByTestId("movieCard").map((el, index) => {
      expect(el).toHaveAttribute("href", `/movie/${data["Search"][index]["imdbID"]}`)
    })
  })

  it('implements pagination', () => {
    const { getByTestId, getAllByRole } = render(<MovieList />);
    expect(getAllByRole('button')).toHaveLength(2)
    const page = getByTestId('pageNumber')
    expect(page).toHaveTextContent('1')
  })

  it('correctly changes page', async () => {
    render(<MovieList />);
    await waitForElementToBeRemoved(() => screen.getAllByTestId("loadingPlaceholder"))
    userEvent.click(screen.getByText("next"))
    expect(await screen.findByTestId("pageNumber")).toHaveTextContent('2')
    expect(axios.get).toHaveBeenCalledWith("/movie/list/2")
    userEvent.click(screen.getByText("prev"))
    expect(await screen.findByTestId("pageNumber")).toHaveTextContent('1')
    expect(axios.get).toHaveBeenCalledWith("/movie/list/1")
  })

  it('does not go to previous page on page 1', async () => {
    render(<MovieList />);
    await waitForElementToBeRemoved(() => screen.getAllByTestId("loadingPlaceholder"))
    expect(axios.get).toHaveBeenCalledTimes(1)
    userEvent.click(screen.getByText("prev"))
    expect(await screen.findByTestId("pageNumber")).toHaveTextContent('1')
    expect(axios.get).toHaveBeenCalledTimes(1) // initial call on render
  })
})