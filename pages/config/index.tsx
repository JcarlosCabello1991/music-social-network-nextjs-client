import styles from './styles.module.css';
import Layout from '../../components/Layout/Layout';
import Head from 'next/head';
import Image from 'next/image';
import Button from '@mui/material/Button';
import toast, { Toaster } from 'react-hot-toast';

import { useGetUserQuery } from '../../redux/userAPI';
import { useI18N } from '../../context/i18';
import { User } from '../../interfaces/ServerResponse';
import { Formik } from 'formik';
import { useCookies } from 'react-cookie';

import IconButton from '@mui/material/IconButton';
import { PhotoCamera } from '@mui/icons-material';
import { useState } from 'react';
import { updateUser } from '../../services/updateUser';

type Props = {};

const UserConfig = (props: Props) => {
  const userID = '6352545c28ee198ab14e7772';
  const [cookies, setCookie, removeCookie] = useCookies(['userToken']);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [MetaDataPlayListImage, setMetaDataPlayListImage] = useState<
    string | null
  >(null);

  const {
    data: user,
    isSuccess: isSuccessUser,
    refetch,
    isLoading,
  } = useGetUserQuery(userID);
  const { t } = useI18N();

  const onLoad = (file) => {
    if (file.size < 10485760) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Use a regex to remove data url part
        const base64String = reader?.result
          ?.replace('data:', '')
          .replace(/^.+,/, '');
        setMetaDataPlayListImage(base64String);
        // Logs wL2dvYWwgbW9yZ...
      };
      reader.readAsDataURL(file);
      setPreviewImage(file);
    } else {
      toast.error('File size is too big. Maximum size is 10MB');
      return;
    }
  };

  return (
    <>
      <Head>
        <title>
          {`${t('additional').app_name} - ${t('headers').headerConfig}`}
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles.configuration_container}>
          <h1>{t('headers').headerConfig}</h1>
          <div className={styles.form_container}>
            <div className={styles.image_container}>
              <Image
                src={
                  previewImage
                    ? URL.createObjectURL(new Blob([previewImage]))
                    : 'https://res.cloudinary.com/juancarlos/image/upload/v1666559879/r8uysw6ypk2irfmn1a7j.png'
                }
                alt="contact"
                width={120}
                height={120}
                layout="fixed"
              />
              <IconButton
                className={styles.upload_button}
                aria-label="upload picture"
                component="label"
                onChange={(e) => onLoad(e.target.files[0])}
              >
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
              </IconButton>
            </div>
          </div>

          <Formik
            enableReinitialize={true}
            initialValues={
              isSuccessUser && {
                username: user.data.username,
                phone: user.data.phone,
                email: user.data.email,
              }
            }
            onSubmit={(values) => {
              console.log(values);
              console.log(MetaDataPlayListImage);
              updateUser(
                userID,
                values.username,
                values.phone,
                MetaDataPlayListImage!,
                cookies.userToken
              ).then((res) => {
                console.log(res);
              });
            }}
          >
            {({ handleSubmit, values, handleChange }) => (
              <form
                action=""
                className={styles.config_form}
                onSubmit={handleSubmit}
              >
                <div className={styles.input_group}>
                  <label className={styles.label}>Username</label>
                  <input
                    autoComplete="off"
                    name="username"
                    id="username"
                    className={styles.input}
                    type="text"
                    value={values?.username}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.input_group}>
                  <label className={styles.label}>Phone</label>
                  <input
                    autoComplete="off"
                    name="phone"
                    id="phone"
                    className={styles.input}
                    type="tel"
                    pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
                    value={values?.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.input_group}>
                  <label className={styles.label}>Email address</label>
                  <input
                    autoComplete="off"
                    name="email"
                    id="email"
                    className={styles.input}
                    type="email"
                    disabled
                    value={values?.email}
                    onChange={handleChange}
                  />
                </div>
                <Button
                  variant="contained"
                  type="submit"
                  className={styles.change_button}
                  sx={{ width: '20%' }}
                >
                  Save
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </Layout>
    </>
  );
};

export default UserConfig;
