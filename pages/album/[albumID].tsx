import Layout from '../../components/Layout/Layout';
import TrackList from '../../components/TrackList/TrackList';
import styles from './styles.module.css';
import Head from 'next/head';
import { useGetAlbumDetailsQuery } from '../../redux/albumAPI';
import { Album, Artist, Track } from '../../interfaces/ServerResponse';
import { useRouter } from 'next/router';
import { getRating } from '../../utils/utils';
import AlbumHeader from '../../components/AlbumHeader/AlbumHeader';
import AlbumHeaderSkeletton from '../../components/AlbumHeaderSkeletton/AlbumHeaderSkeletton';

type Props = {};

const AlbumDetails = (props: Props) => {

  const {query} = useRouter()
  const albumID = query.albumID?.toString() as string

  let rating: number = 0
 
  let album = {
    _id: '',
    image: '',
    title: '',
    releaseDate: '',
    totalTracks: 0,
    tracks: [] as Track[],
    artist: {} as Artist,
    createdAt: '',
    updatedAt: ''
  }

  const {
    data: dataAlbum ,
    isSuccess: isSuccessAlbum
  } = useGetAlbumDetailsQuery(albumID);

  if (isSuccessAlbum) {
    album = dataAlbum.data
    rating = getRating(album.artist.popularity)
  }

  return (
    <>
      <Head>
        <title>Album Details</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles.album_details_container}>
          <div className={styles.album_details}>
            {isSuccessAlbum && album ? <AlbumHeader album={album} rating={rating} /> : <AlbumHeaderSkeletton/> }
          </div>
          <div className={styles.album_tracks_info}>
            <div className={styles.album_extra_info}>
              <p className={styles.extra_info_title}>Details</p>
              <span className={styles.info_element}>
                <p className={styles.info_element_title}>Release Date:</p>
                <p>2014-09-08</p>
              </span>
              <span className={styles.info_element}>
                <p className={styles.info_element_title}>Duration:</p>{' '}
                <p>65:65</p>
              </span>
            </div>
            <div className={styles.album_tracklist}>
              <h2>Tracklist</h2>
              {isSuccessAlbum && album ? <TrackList name="TrackList" tracks={album.tracks}/> : <TrackList name="TrackList" tracks={[]}/>}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AlbumDetails;
