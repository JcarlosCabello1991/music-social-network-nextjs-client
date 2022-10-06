import { Button } from '@mui/material';
import Image from 'next/image';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';

import Layout from '../../components/Layout/Layout';
import TabPanel from '../../components/TabPanel/TabPanel';
import styles from './styles.module.css';

type Props = {};

const ArtistDetails = (props: Props) => {
  return (
    <>
      <Layout>
        <div className={styles.artist_details_container}>
          <div className={styles.artist_details}>
            <Image
              className={styles.artist_image}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/BombayBicycleClub.jpg/300px-BombayBicycleClub.jpg"
              alt={'bombay'}
              width={200}
              height={200}
              layout="fixed"
            />
            <div>
              <p className={styles.type}>Artist</p>
              <h1 className={styles.artist_name}>Kings of Leon</h1>
              <div className={styles.artist_genres}>
                <p className={styles.genre}>Indie Rock</p>
                <p className={styles.genre}>Alternative Rock</p>
                <p className={styles.genre}>Southern Rock</p>
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
            <TabPanel />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ArtistDetails;
