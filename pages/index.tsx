import React from 'react';

import Layout from '../components/Layout/Layout';
import Row from '../components/Row/Row';
import { getGreetings } from '../utils/getGreetings';
import { useGetAlbumsQuery } from '../redux/albumAPI';
import { useGetArtistsQuery } from '../redux/artistAPI';
import RowSkeleton from '../components/RowSkeleton/RowSkeleton';
import { useI18N } from '../context/i18';

import styles from '../pages/home/styles.module.css';
import Head from 'next/head';
import { useGetPlaylistQuery } from '../redux/playlistsAPI';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import MusicGenre from '../components/MusicGenre/MusicGenre';

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'userID',
    'userToken',
  ]);
  const [token, setToken] = useState<string>('');

  const {
    data: albums,
    isLoading,
    error,
  } = useGetAlbumsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const {
    data: artists,
    isLoading: isLoadingArtist,
    error: artistsError,
  } = useGetArtistsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: playlists,
    isLoading: isLoadingPlaylist,
    error: playlistError,
  } = useGetPlaylistQuery(
    { userID: cookies.userID, token: cookies.userToken },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  // const unique = [...new Set(playlists.data.playlists.map((item) => item))];
  // console.log(unique);
  const isThereAnyPlaylist = playlists?.data?.playlists?.length > 0;

  const { t } = useI18N();

  return (
    <>
      <Head>
        <title>{`${t('additional').app_name} - ${t('home').home}`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles['home_container']}>
          <h1 className={styles.greetings}>{getGreetings()}</h1>
          {/* <Row title="Trending Now" /> */}
          {isLoading ? (
            <RowSkeleton />
          ) : (
            <Row title={t('additional').albums} data={albums?.data} />
          )}
          {isLoadingArtist ? (
            <RowSkeleton />
          ) : (
            <Row title={t('additional').artists} data={artists?.data} />
          )}
          {isLoadingPlaylist ? (
            <RowSkeleton />
          ) : isThereAnyPlaylist ? (
            <Row
              title={t('additional').playlist}
              data={playlists?.data?.playlists}
            />
          ) : null}
        </div>
      </Layout>
    </>
  );
};

export default Home;
