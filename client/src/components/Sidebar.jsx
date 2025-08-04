import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const Sidebar = ({ onGenreSelect }) => {
  const [genres, setGenres] = useState([])
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`${location.pathname}`,{state:{id}})
  }


  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const type = location.pathname.includes('/tv') ? 'tv' : 'movie'
        const res = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list`, {
          params: { api_key: 'dc2a02055fae27c0242153eb4dea1bdf' }
        })
        setGenres(res.data.genres)
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    }
    fetchGenres()
  }, [location.pathname])

  return (
    <aside className="w-64 bg-[#1a1a1a] text-white p-4">
      <h2 className="text-xl font-bold mb-4">Genres</h2>
      <ul className="space-y-2">
        {genres.map(genre => (
          <li
            key={genre.id}
            className="hover:text-yellow-400 cursor-pointer"
            onClick={() => handleClick(genre.id)}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
