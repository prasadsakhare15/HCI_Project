// File: src/pages/MovieInfo.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import MediaCard from '../components/MediaCard'

const API_KEY = 'dc2a02055fae27c0242153eb4dea1bdf'
const BASE_URL = 'https://api.themoviedb.org/3'

const MediaInfo = () => {
  const { id, media } = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [similar, setSimilar] = useState([])

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieRes = await axios.get(`${BASE_URL}/${media}/${id}?api_key=${API_KEY}&append_to_response=videos,credits,similar`)
        setMovie(movieRes.data)
        setCast(movieRes.data.credits.cast.slice(0, 5))
        setSimilar(movieRes.data.similar.results.slice(0, 6))
      } catch (err) {
        console.error('Error fetching movie details:', err)
      }
    }
    fetchMovieDetails()
  }, [id])

  if (!movie) return <div className="text-white p-4">Loading...</div>

  return (
    <div className="bg-[#121212] text-white min-h-screen p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-[300px] rounded shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 mb-4">{movie.release_date} • {movie.runtime} mins • {movie.vote_average}⭐</p>
          <p className="mb-4 max-w-2xl leading-relaxed">{movie.overview}</p>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Genres</h2>
            <div className="flex gap-2 flex-wrap">
              {movie.genres.map(genre => (
                <span key={genre.id} className="bg-blue-700 px-3 py-1 rounded-full text-sm">{genre.name}</span>
              ))}
            </div>
          </div>

          {movie.videos.results.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Trailer</h2>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Cast</h2>
        <div className="flex gap-4 overflow-x-auto">
          {cast.map(actor => (
            <div key={actor.cast_id} className="w-[120px] text-center">
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="rounded h-[160px] object-cover mb-2"
              />
              <p className="text-sm font-semibold truncate">{actor.name}</p>
              <p className="text-gray-400 text-xs truncate">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Similar Movies</h2>
        <div className="flex gap-4 overflow-x-auto">
          {similar.map(sim => (
            <MediaCard key={sim.id} media={sim} type="movie" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MediaInfo
