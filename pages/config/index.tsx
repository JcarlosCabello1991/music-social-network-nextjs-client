import styles from './styles.module.css';
import Layout from '../../components/Layout/Layout';
import Head from 'next/head';
import Image from 'next/image';
import Button from '@mui/material/Button';
import toast, { Toaster } from 'react-hot-toast';

import { useGetUserQuery, useEditUserMutation } from '../../redux/userAPI';
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
  const [editUser] = useEditUserMutation();
  const [cookies, setCookie, removeCookie] = useCookies([
    'userToken',
    'userID',
    'username',
  ]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [MetaDataPlayListImage, setMetaDataPlayListImage] = useState<
    string | null
  >(null);
  const {
    data: user,
    isSuccess: isSuccessUser,
    refetch,
    isLoading,
  } = useGetUserQuery({ id: cookies.userID, token: cookies.userToken });
  const { t } = useI18N();
  console.log(user);
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
              {isSuccessUser ? (
                <>
                  <Image
                    src={
                      previewImage
                        ? URL.createObjectURL(new Blob([previewImage]))
                        : user?.data?.image ||
                          'https://res.cloudinary.com/juancarlos/image/upload/v1666559879/r8uysw6ypk2irfmn1a7j.png'
                    }
                    alt="contact"
                    width={120}
                    height={120}
                    layout="fixed"
                  />
                </>
              ) : (
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
              )}
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

          <div className={styles.main_content}>
            <Formik
              enableReinitialize={true}
              initialValues={
                isSuccessUser && {
                  username: user?.data?.username,
                  phone: user?.data?.phone,
                  email: user?.data?.email,
                  token: cookies.userToken,
                }
              }
              onSubmit={(values) => {
                const image = MetaDataPlayListImage
                  ? MetaDataPlayListImage
                  : 'https://res.cloudinary.com/juancarlos/image/upload/v1666942620/gxlttit28glyqcro0reu.png';
                editUser({
                  id: cookies.userID,
                  username:
                    values.username !== cookies.username
                      ? values.username
                      : undefined,
                  phone: values.phone,
                  image: image,
                  token: cookies.userToken,
                }).then((data) => {
                  if (data.data?.ok) {
                    setCookie('username', values.username, { path: '/' });
                  } else {
                    toast.error(data.error?.data.msg);
                  }
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
                    <label className={styles.label}>
                      {t('content').username}
                    </label>
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
                    <label className={styles.label}>{t('content').phone}</label>
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
                    <label className={styles.label}>{t('content').email}</label>
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
                    sx={{ width: '35%' }}
                  >
                    {t('content').saveButton}
                  </Button>
                </form>
              )}
            </Formik>
            <Image
              className={styles.config_image}
              src="/Images/config_image.png"
              alt="contact"
              width={320}
              height={320}
              layout="intrinsic"
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserConfig;
