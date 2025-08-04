import React from 'react'
import MediaCard from './MediaCard'

const CategoryRow = ({ title, movies }) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4 px-2">{title}</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-2">
        {movies.map((movie) => (
          <MediaCard key={movie.id} media={movie} type='movie' />
        ))}
      </div>
    </section>
  )
}

export default CategoryRow
