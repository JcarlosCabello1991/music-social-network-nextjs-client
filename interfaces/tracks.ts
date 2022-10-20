export interface Response {
  data: Track[];
  ok: boolean;
}

export interface Track {
  __v: number;
  _id: string;
  album: Album;
  createdAt: Date;
  duration: number;
  title: string;
  trackAudio: string;
  trackNumber: number;
  updatedAt: Date;
}

export interface Album {
  __v: number;
  _id: string;
  artist: string;
  createdAt: Date;
  image: string;
  releaseDate: Date;
  title: string;
  totalTracks: number;
  tracks: string[];
  updatedAt: Date;
}
