import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "dc2a02055fae27c0242153eb4dea1bdf";
const BASE_URL = "https://api.themoviedb.org/3";

const HeroBanner = () => {
  const [movie, setMovie] = useState(null);
  const [yturl, setyturl] = useState(null); // Use null, not ''

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        // 1. Get trending movies
        const res = await axios.get(
          `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
        );
        const movies = res.data.results;

        if (!movies || movies.length === 0) {
          console.error("No movies found.");
          return;
        }

        // 2. Pick a random movie
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);

        // 3. Get its video list
        const videoRes = await axios.get(
          `${BASE_URL}/movie/${randomMovie.id}/videos?api_key=${API_KEY}`
        );
        const videos = videoRes.data.results;

        // 4. Find the trailer on YouTube
        const trailer = videos.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailer) {
          setyturl(
            `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`
          );
        } else {
          console.warn("No trailer found for", randomMovie.title);
          setyturl(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTrending();
  }, []);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative w-full h-[500px] mb-8 rounded-xl overflow-hidden bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent p-6 flex">
        {/* Movie Details Section */}
        <div className="w-1/3 z-1 flex flex-col justify-center text-white p-6">
          <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
          <p className="text-lg mb-6">{movie.overview}</p>
        </div>

        {/* Trailer Section */}
        <div
          style={{
            maskImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))", // Creating transparency from left to right
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))", // For Safari
          }}
          className="w-3/4 h-full absolute right-0 overflow-hidden"
        >
          {yturl ? (
            <iframe
              className="w-full h-full object-cover absolute top-0 transform scale-200"
              src={yturl}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="text-white text-xl">Loading trailer...</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
