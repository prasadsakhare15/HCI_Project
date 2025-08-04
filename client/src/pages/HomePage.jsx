import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import HeroBanner from '../components/Herobanner'
import CategoryRow from '../components/Categoryrow'
import axios from 'axios'

const API_KEY = 'dc2a02055fae27c0242153eb4dea1bdf'
const BASE_URL = 'https://api.themoviedb.org/3'

const Home = () => {
  const [trending, setTrending] = useState([])
  const [topRated, setTopRated] = useState([])
  const [upcoming, setUpcoming] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trendingRes = await axios.get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
        const topRatedRes = await axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
        const upcomingRes = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`)

        setTrending(trendingRes.data.results)
        setTopRated(topRatedRes.data.results)
        setUpcoming(upcomingRes.data.results)
      } catch (err) {
        console.error('Error fetching movie data:', err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="bg-[#121212] min-h-screen text-white">
      <div className="flex">
        <main className="flex-1 p-4 overflow-x-hidden">
          <HeroBanner />
          <CategoryRow title="Trending Now" movies={trending} />
          <CategoryRow title="Top Rated" movies={topRated} />
          <CategoryRow title="Upcoming Movies" movies={upcoming} />
        </main>
      </div>
    </div>
  )
}

export default Home
