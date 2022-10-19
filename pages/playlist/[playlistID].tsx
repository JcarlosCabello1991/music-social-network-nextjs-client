import Layout from "../../components/Layout/Layout";

import styles from "./styles.module.css";
import Head from "next/head";
import TabPanel from "../../components/TabPanel/TabPanel";
import { useRouter } from "next/router";
import { useGetPlaylistDetailsQuery } from "../../redux/playlistAPI";
import CreatePlaylist from "../../components/Playlist/CreatePlaylist";
import Searchbar from "../../components/Playlist/Searchbar/Searchbar";
import TrackList from "../../components/TrackList/TrackList";

type Props = {};

const Playlist = (props: Props) => {
  const { query } = useRouter();

  const {
    data: playlist,
    isLoading: isLoadingPlaylist,
    error: playlistError,
  } = useGetPlaylistDetailsQuery(query.playlistID);

  const tracksExist = playlist?.data?.tracks?.length > 0;

  return (
    <>
      <Head>
        <title>Create Playlist</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <CreatePlaylist
          playlistId={true}
          title={playlist?.data?.title}
          image={playlist?.data?.image}
          description={playlist?.data?.description}
        />
        {tracksExist ? (
          <>
            <div className={styles.playlist_tracks}>
              <TrackList
                name={playlist?.data?.title}
                tracks={playlist?.data?.tracks}
              />
            </div>
            <Searchbar />
          </>
        ) : (
          <>
            <Searchbar />
            <div className={styles.playlist_tracks}>
              <TrackList
                name={playlist?.data?.title}
                tracks={playlist?.data?.tracks}
              />
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default Playlist;
