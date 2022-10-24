import React from "react";
import { Button } from "@mui/material";
import Image from "next/image";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Tooltip from "@mui/material/Tooltip";

import Layout from "../../components/Layout/Layout";
import TabPanel from "../../components/TabPanel/TabPanel";
import Head from "next/head";
import { useRouter } from "next/router";
import { useGetArtistDetailsQuery } from "../../redux/artistAPI";
import { numberWithCommas } from "../../utils/converter";
import {
  setCurrentIndex,
  setArtistName,
  currentTrack as setCurrentTrack,
} from "../../redux/features/player/currentTracks";
import { useDispatch } from "react-redux";

import styles from "./styles.module.css";
import { useI18N } from "../../context/i18";
import { updateTrackList } from "../../redux/features/player/musicPlayerSlice";
import { useGetUserQuery } from "../../redux/userAPI";
import FollowButton from "../../components/FollowButton/FollowButton";
import SkelettonButton from "../../components/SkelettonButton/SkelettonButton";
import { Artist } from "../../interfaces/ServerResponse";

type Props = {};

const ArtistDetails = (props: Props) => {
  const { query } = useRouter();
  const artistID = query.artistID?.toString() as string;
  const userID = "63566ec7f9d5803a4019ed57";
  let isFollowed = undefined;
  const { t } = useI18N();
  const dispatch = useDispatch();

  const { data: artist, isLoading } = useGetArtistDetailsQuery(artistID, {
    refetchOnMountOrArgChange: true,
  });

  const playArtistTracks = () => {
    dispatch(updateTrackList(artist?.data.tracks));
    dispatch(setCurrentIndex(0));
    dispatch(setCurrentTrack(artist?.data.tracks[0]));
    dispatch(setArtistName(artist.data.name!));
  };

  const { data: user, isSuccess: isSuccessUser } = useGetUserQuery(userID);

  if (isSuccessUser) {
    isFollowed = user.data.artists.some(
      (item: Artist) => item._id === artistID
    );
  }

  return (
    <>
      <Head>
        <title>
          {`${t("additional").app_name} - ${t("headers").headerArtist}`}
        </title>
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
              priority
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
                {isSuccessUser && artistID ? (
                  <FollowButton
                    isFollowed={isFollowed}
                    id={artistID}
                    type="artist"
                  />
                ) : (
                  <SkelettonButton />
                )}
              </Tooltip>
            </div>
            <div className={styles.play_button_container}>
              <p className={styles.discography_info}>
                {!isLoading &&
                  `${numberWithCommas(artist?.data?.followers)} Followers`}
              </p>
              <Button
                className={styles.play_button}
                variant="contained"
                color="inherit"
                startIcon={<PlayArrowIcon />}
                onClick={playArtistTracks}
              >
                Play
              </Button>
            </div>
          </div>
          <div className={styles.artist_discography_info}>
            <TabPanel data={artist?.data.tracks} artist={artist?.data?.name} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ArtistDetails;
