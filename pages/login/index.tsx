import type { NextPage } from "next";
import { useCookies } from "react-cookie";
import Head from "next/head";

import { GetServerSideProps } from "next";

import styles from "../../styles/Home.module.css";

import LoginInputs from "../../components/LoginInputs/LoginInputs";

import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";

import FreeSongs from "../../components/FreeSongs/FreeSongs";
import Logo from "../../components/Logo/Logo";

import { Track } from "../../interfaces/tracks";

interface parsedTracks {
  parsedTracks: Track[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("http://localhost:4002/track");
  const result = await response.json();

  //This is necessary. What it does is that Next does not render all the tracks, but only the first 10 tracks so that the app is not so heavy.
  const parsedTracks = result.data.slice(0, 10).map((track: Track) => track);

  return {
    props: { parsedTracks },
  };
};

const Login = ({ parsedTracks }: parsedTracks) => {
  return (
    <>
      <Head>
        <title>Spotify Impostor</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Logo Height={80} Width={110} ClassName={"logoMain"} />

      <main className={styles.indexMain}>
        <section className={styles.loginWrapper}>
          {/* <DemoAppComponent /> */}
          <div className={styles.logIn_signUp_Div}>
            <LoginInputs />
            <section className={styles.googleLogin}>
              <GoogleIcon />
              <span>Continue with Google</span>
            </section>
            <section className={styles.signUpSection}>
              <span>
                Don<span>&#39;</span>t have an account?
                
              </span>
              <Link href={"/signup"}>
                <a className={styles.colorLink}>Sign Up</a>
              </Link>
            </section>
          </div>
        </section>
        <FreeSongs tracks={parsedTracks} />
      </main>
    </>
  );
};

export default Login;
