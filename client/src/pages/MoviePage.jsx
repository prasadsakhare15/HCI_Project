import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import { Link, useLocation } from 'react-router-dom'
import MediaCard from '../components/MediaCard'

const MoviesPage = () => {
  const [movies, setMovies] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const location = useLocation()
  const { id } = location.state || {}

   useEffect(() => {
    if (id) {
      fetchMoviesByGenre(id)
    } else {
      fetchPopularMovies()
    }
  }, [id])

  const fetchPopularMovies = async () => {
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
        params: {
          api_key: 'dc2a02055fae27c0242153eb4dea1bdf'
        }
      })
      setMovies(res.data.results)
    } catch (error) {
      console.error('Error fetching popular movies:', error)
    }
  }

  const fetchMoviesByGenre = async (id) => {
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: 'dc2a02055fae27c0242153eb4dea1bdf',
          with_genres: id
        }
      })
      setMovies(res.data.results)
    } catch (error) {
      console.error('Error fetching movies by genre:', error)
    }
  }

  return (
    <div className="no-scrollbar">
      <div className="flex flex-wrap justify-center gap-6">
        {movies.map((media) => (
            <MediaCard key={media.id} media={media} type="movie" />
        ))}
      </div>
    </div>
  )
}

export default MoviesPage
