import Image from 'next/image';
import Rating from '@mui/material/Rating';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Tooltip from '@mui/material/Tooltip';

import Layout from '../../components/Layout/Layout';
import TrackList from '../../components/TrackList/TrackList';
import styles from './styles.module.css';
import Head from 'next/head';
import { useGetAlbumDetailsQuery } from '../../redux/albumAPI';
import {useGetUserQuery} from '../../redux/userAPI'
import { Album } from '../../interfaces/ServerResponse';
import FollowButton from '../../components/FollowButton/FollowButton';
import SkelettonButton from '../../components/SkelettonButton/SkelettonButton';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Props = {};

// export async function getStaticPaths() {

//   const response = await fetch('http://localhost:4002/album')
//   const data = await response.json()

//   const paths = data.data.map((album: Album) => {
//     return {params: {albumID : album._id} }
//   })

//   return {
//     paths: paths,
//     fallback: false, // can also be true or 'blocking'
//   };
// }

// export async function getStaticProps(context: any) {
  
//   const albumID = context.params.albumID

//   console.log('dasmdkmasdasd', context, '---------------------')
//   return {
//     // Passed to the page component as props
//     props: { post: {} },
//   }
// }

const AlbumDetails = (props: Props) => {

  const {query} = useRouter()
  const albumID = query.albumID?.toString() as string

  const userID = '63496653b32bbbe6521bec29'
  let isFollowed = undefined

  const {
    data: album ,
    isLoading,
  } = useGetAlbumDetailsQuery(albumID);
  
  const {
    data: user,
    isSuccess,
  } = useGetUserQuery(userID)

  if (isSuccess) {
    isFollowed = user.data.albums.some((album: Album) => album._id === albumID)
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
            <Image
              className={styles.album_image}
              src={album?.data.image}
              alt={album?.data.title}
              width={200}
              height={200}
              layout="fixed"
            />
            <div className={styles.album_details_text}>
              <p className={styles.albums_ratings}>
                Album <Rating name="simple-controlled" value={4} />
              </p>
              <h1 className={styles.album_name}>So Long, See You Tomorrow</h1>
              <h2 className={styles.album_artist}>
                <InterpreterModeIcon />
                Bombay Bicycle Club
              </h2>
              <Tooltip title="Add this album to your library.">
                {isSuccess && albumID ? <FollowButton isFollowed={isFollowed} id={albumID} type='album'/> :
                <SkelettonButton/>}
              </Tooltip>
            </div>
            <div className={styles.play_button_container}>
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
              <TrackList name="TrackList"/>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AlbumDetails;
