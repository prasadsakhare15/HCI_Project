import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_KEY = 'dc2a02055fae27c0242153eb4dea1bdf'
const BASE_URL = 'https://api.themoviedb.org/3'

const HeroBanner = () => {
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    const fetchTrending = async () => {
      const res = await axios.get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
      const randomIndex = Math.floor(Math.random() * res.data.results.length)
      setMovie(res.data.results[randomIndex])
    }
    fetchTrending()
  }, [])
  useEffect(() => {
    const fetchTrailer = async () => {
      const res=await axios.get(`${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`)
    }
  },[])

  if (!movie) return null

  return (
    <section className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden bg-cover bg-center">
      
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent p-6 flex flex-col justify-end">
        {/* <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
        <p className="max-w-xl text-gray-300 line-clamp-3">{movie.overview}</p>
        <div className="mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">▶ Play Trailer</button>
        </div> */}
        <iframe
          className='w-full h-full'
          src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
          title="Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
      ></iframe>
      </div>


    </section>
  )
}

export default HeroBanner