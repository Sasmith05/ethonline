"use client"
import React, { useState, createContext } from "react"

// Movie type and context for global state
export type Movie = {
  id: number;
  title: string;
  showtimes?: string[];
  dates?: string[];
  rating?: number;
  duration?: string;
  genre?: string;
  image?: string;
  price?: string;
  badge?: string;
  ageRating?: '16+' | '18+';
};

export type MovieContextType = {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
};

export const MovieContext = createContext<MovieContextType | null>(null)

const initialMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    showtimes: ["7:00 PM", "9:30 PM"],
    dates: [new Date().toISOString().split('T')[0]],
    ageRating: '18+',
    price: "$12.99",
    genre: "Sci-Fi",
    duration: "148 min",
    rating: 8.8,
    image: "/images/inception.jpg",
    badge: "Trending",
  },
  {
    id: 2,
    title: "Interstellar",
    showtimes: ["6:00 PM", "8:45 PM"],
    dates: [new Date().toISOString().split('T')[0]],
    ageRating: '16+',
    price: "$12.99",
    genre: "Adventure",
    duration: "169 min",
    rating: 8.6,
    image: "/images/interstellar.jpg",
    badge: "New",
  },
  {
    id: 3,
    title: "The Dark Knight",
    showtimes: ["5:00 PM", "8:00 PM"],
    dates: [new Date().toISOString().split('T')[0]],
    ageRating: '16+',
    price: "$11.99",
    genre: "Action",
    duration: "152 min",
    rating: 9.0,
    image: "/images/dark-knight.jpg",
    badge: "Classic",
  },
]

export function MovieProvider({ children }: { children: React.ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies)
  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      {children}
    </MovieContext.Provider>
  )
}
