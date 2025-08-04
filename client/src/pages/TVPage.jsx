import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import { Link, useLocation } from 'react-router-dom'
import MediaCard from '../components/MediaCard'

const ShowsPage = () => {
  const [Shows, setShows] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const location = useLocation()
  const { id } = location.state || {}

   useEffect(() => {
    if (id) {
      fetchShowsByGenre(id)
    } else {
      fetchPopularShows()
    }
  }, [id])

  const fetchPopularShows = async () => {
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/tv/popular`, {
        params: {
          api_key: 'dc2a02055fae27c0242153eb4dea1bdf'
        }
      })
      setShows(res.data.results)
    } catch (error) {
      console.error('Error fetching popular shows:', error)
    }
  }

  const fetchShowsByGenre = async (id) => {
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/discover/tv`, {
        params: {
          api_key: 'dc2a02055fae27c0242153eb4dea1bdf',
          with_genres: id
        }
      })
      setShows(res.data.results)
    } catch (error) {
      console.error('Error fetching Shows by genre:', error)
    }
  }

  return (
    <div className="flex">
      <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 flex-1">
        {Shows.map((media) => (
            <MediaCard key={media.id} media={media} type="tv" />
        ))}
      </div>
    </div>
  )
}

export default ShowsPage
