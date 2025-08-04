// File: src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const dummyUser = {
  username: 'moviebuff123',
  avatar: 'https://i.pravatar.cc/150?img=12',
  bio: 'Lover of sci-fi, thrillers, and all things Christopher Nolan.',
  favorites: [
    {
      id: 299534,
      title: 'Avengers: Endgame',
      poster_path: '/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
      vote_average: 8.3
    },
    {
      id: 27205,
      title: 'Inception',
      poster_path: '/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
      vote_average: 8.4
    }
  ]
}

const UserProfile = () => {
  const { username } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Replace with real API call when backend is connected
    setUser(dummyUser)
  }, [username])

  if (!user) return <div className="text-white p-6">Loading...</div>

  return (
    <div className="bg-[#121212] text-white min-h-screen p-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.avatar}
          alt={user.username}
          className="w-[120px] h-[120px] rounded-full object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">@{user.username}</h1>
          <p className="text-gray-400 mt-2 max-w-md">{user.bio}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Favorite Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {user.favorites.map(movie => (
            <div key={movie.id} className="bg-[#1f1f1f] rounded overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[240px] object-cover"
              />
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
                <p className="text-gray-400 text-xs">⭐ {movie.vote_average}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
