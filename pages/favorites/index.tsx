import { useEffect } from 'react';

import { useGetPlaylistQuery } from '../../redux/playlistsAPI';

import Head from 'next/head';
import Layout from '../../components/Layout/Layout';
import { useI18N } from '../../context/i18';
import Banner from '../../components/Banner/Banner';
import TrackList from '../../components/TrackList/TrackList';
import { useGetArtistsQuery } from '../../redux/artistAPI';
import styles from './styles.module.css';
import { useGetUserQuery } from '../../redux/userAPI';
import { useCookies } from 'react-cookie';

type Props = {};

const Favorites = (props: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'userID',
    'userToken',
  ]);

  const { t } = useI18N();

  const {
    data: playlists,
    isLoading: isLoadingPlaylists,
    isError: isErrorPlaylists,
    refetch,
  } = useGetPlaylistQuery(
    { userID: cookies.userID, token: cookies.userToken },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );

  const {
    data: userData,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    refetch: refetchUser,
  } = useGetUserQuery(
    { id: cookies.userID, token: cookies.userToken },
    { refetchOnMountOrArgChange: true, refetchOnFocus: true }
  );

  console.log(userData);

  return (
    <>
      <Head>
        <title>{`${t('additional').app_name} - ${
          t('headers').headerFavorites
        }`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles.container}>
          <Banner
            user={userData?.data?.username}
            total={userData?.data?.likedSongs.length}
          />
          {!isLoadingPlaylists ? (
            <TrackList
              name="Liked Songs"
              tracks={playlists?.data?.likedSongs}
            />
          ) : (
            //TODO hacer un componente de loading
            <h1>Loading...</h1>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Favorites;
