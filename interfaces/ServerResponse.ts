export interface Response<T> {
  ok: boolean;
  data: T[] | T;
}

export interface Album {
  _id: string;
  image: string;
  title: string;
  releaseDate: string;
  totalTracks: number;
  tracks: Track[];
  artist: Artist;
  createdAt: string;
  updatedAt: string;
  // __v: number;
}

export interface Artist {
  _id: string;
  image: string;
  followers: number;
  name: string;
  popularity: number;
  genres: string[];
  tracks: string[];
  albums: string[];
  createdAt: string;
  updatedAt: string;
  // __v: number;
}

export interface Track {
  _id: string;
  title: string;
  duration: number;
  trackNumber: number;
  trackAudio?: string;
  album: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  _id:        string;
  username:   string;
  email:      string;
  phone:      string;
  image:      string;
  playlists:  any[];
  artists:    any[];
  albums:     Album[];
  likedSongs: any[];
  createdAt:  string;
  updatedAt:  string;
}