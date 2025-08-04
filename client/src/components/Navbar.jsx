import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import SearchResults from '../pages/SearchResults';

const Navbar = ({toggleSidebar}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("")
  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/search/${encodeURIComponent(search.trim())}`)
      setSearch('')
    }
  }
  return (
    <nav className="sticky top-0 z-50 bg-[#1a1a1a] text-white h-16 flex items-center px-6 shadow-md">
      
      <button onClick={toggleSidebar} className="text-xl">&#9776;</button>

      <div className="text-xl font-bold mr-10">CineScope</div>
      <div className="flex gap-6">
        <a href="/movies" className="hover:text-blue-400">Movies</a>
        <a href="/tv" className="hover:text-blue-400">TV Shows</a>
        <a href="#" className="hover:text-blue-400">Upcoming</a>
        <a href="#" className="hover:text-blue-400">Trending</a>
      </div>
      
      <form onSubmit={handleSearch} className="ml-auto relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search movies, TV shows..."
          className="bg-gray-800 text-white px-3 py-1 rounded"
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
        >
          Search
        </button>
      </form>
    </nav>
  )
}

export default Navbar