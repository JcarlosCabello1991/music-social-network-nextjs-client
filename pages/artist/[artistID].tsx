import { Button } from '@mui/material';
import Image from 'next/image';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';

import Layout from '../../components/Layout/Layout';
import TabPanel from '../../components/TabPanel/TabPanel';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useGetArtistDetailsQuery } from '../../redux/artistAPI';

import styles from './styles.module.css';

type Props = {};

const ArtistDetails = (props: Props) => {
  const { query } = useRouter();

  const {
    data: artist,
    isLoading,
    error,
  } = useGetArtistDetailsQuery(query.artistID);
  console.log(artist);
  return (
    <>
      <Head>
        <title>Artist Details</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles.artist_details_container}>
          <div className={styles.artist_details}>
            <Image
              className={styles.artist_image}
              src={artist?.data.image}
              alt={artist?.data.name}
              width={200}
              height={200}
              layout="fixed"
            />
            <div className={styles.artist_information}>
              <p className={styles.type}>Artist</p>
              <h1 className={styles.artist_name}>{artist?.data.name}</h1>
              <div className={styles.artist_genres}>
                {artist?.data.genres.map((genre: string, index: number) => {
                  return (
                    <p key={index} className={styles.genre}>
                      {genre}
                    </p>
                  );
                })}
              </div>
              <Tooltip title="Add the artist to your library.">
                <Button
                  className={styles.follow_button}
                  variant="contained"
                  color="inherit"
                  startIcon={<FavoriteBorderIcon />}
                >
                  Follow
                </Button>
              </Tooltip>
            </div>
            <div className={styles.play_button_container}>
              <p className={styles.discography_info}>15 albums - 1080 tracks</p>
              <Button
                className={styles.play_button}
                variant="contained"
                color="inherit"
                startIcon={<PlayArrowIcon />}
              >
                Play
              </Button>
            </div>
          </div>
          <div className={styles.artist_discography_info}>
            <TabPanel data={artist?.data.tracks} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ArtistDetails;
