import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const SearchResults = () => {
  const { query } = useParams()
  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/search/multi`, {
          params: {
            api_key: 'dc2a02055fae27c0242153eb4dea1bdf',
            query: query
            }
        })
        console.log(query)
        setResults(res.data.results)
    } catch (error) {
        console.error('Search fetch failed:', error)
      }
    }

    fetchResults()
  }, [query])

  return (
    <div className="bg-[#121212] text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {results.map((item) => (
          <Link to={`/${item.media_type === 'tv' ? 'tv' : 'movie'}/${item.id}`} key={item.id}>
            <div className="bg-[#1f1f1f] rounded overflow-hidden hover:scale-105 transition">
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path || item.profile_path}`}
                alt={item.title || item.name}
                className="w-full h-[240px] object-cover"
              />
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate">{item.title || item.name}</h3>
                <p className="text-gray-400 text-xs capitalize">{item.media_type}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SearchResults