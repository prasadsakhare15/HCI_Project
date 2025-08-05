import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import HomePage from './pages/HomePage'
import MediaInfo from './pages/MediaInfo'
import UserProfile from './pages/UserProfile'
import SearchResults from './pages/SearchResults'
import MoviesPage from './pages/MoviePage'
import TVPage from './pages/TVPage'

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Router>
      <div className="flex flex-col h-screen">
        {/* Navbar at the top */}
        <Navbar toggleSidebar={() => setSidebarOpen(prev => !prev)} />

        {/* Sidebar + Main content */}
        <div className="flex flex-1">
          {sidebarOpen && <Sidebar />}
          <main className="flex-1 overflow-auto pt-25 no-scrollbar bg-[#121212]">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/info/:media/:id" element={<MediaInfo />} />
              <Route path="/user/:username" element={<UserProfile />} />
              <Route path="/search/:query" element={<SearchResults />} />

              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/tv" element={<TVPage />} />
              {/*<Route path="/upcoming" element={<UpcomingPage />} />
              <Route path="/trending" element={<TrendingPage />} /> */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
