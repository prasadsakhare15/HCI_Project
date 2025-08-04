import React from 'react'
import { Link } from 'react-router-dom'

const MediaCard = ({ media,type }) => {
  return (
    <Link to={`/info/${String(type)}/${media.id}`} key={media.id}>
      <div className="w-[150px] flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-300">
        <img
          src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
          alt={media.title}
          className="w-full h-auto rounded-lg shadow-md"
        />
        <div className="mt-2">
          <h3 className="text-sm font-semibold truncate">{media.title}</h3>
          <p className="text-gray-400 text-sm">⭐ {media.vote_average}</p>
        </div>
      </div>
    </Link>
  )
}

export default MediaCard