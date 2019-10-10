import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeFormData } from '@ctx/cv/actions';
import { Box, Button, Paper, Typography, Grid } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { Link } from 'react-router-dom';

const PhotoPicker = ({ history }) => {
  const [state] = useState({
    photo: {},
  });

  const cvStore = useSelector(store => ({
    formData: store.cv.formData,
    loading: store.cv.loading,
  }));

  const dispatch = useDispatch();
  const { formData } = cvStore;

  const onClick = () => {
    dispatch(
      storeFormData({
        ...formData,
        ...state,
      }),
    );
    history.push('/cv/contact');
  };
  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Box component={Paper} mt={{ sm: 5 }} mx={{ xs: 0 }} p={0}>
          <Box display={{ sm: 'block', md: 'none' }} pt={5} ml={3}>
            <Link
              to={{
                pathname: '/cv/personalData',
              }}>
              <ArrowBackIcon />
            </Link>
          </Box>
          <Box px={{ xs: 3, md: 9 }}>
            <Box pt={{ xs: 5, md: 7 }}>
              <Typography component="h2" variant="h2">
                Zaimportuj{' '}
                <Typography component="b" variant="h2" color="primary">
                  swoje zdjęcie
                </Typography>
                .
              </Typography>
            </Box>
            <Box mt={4} mb={8}>
              <Typography component="p" variant="subtitle1">
                Z nami stworzysz swoje CV w 10 minut, przygotuj wszystkie
                niezbędne informacje i zaczynajmy.
              </Typography>
            </Box>
            <Box>
              <Box display="none">
                <input
                  accept="image/*"
                  // className={classes.input}
                  id="outlined-button-file"
                  multiple
                  type="file"
                />
              </Box>
              <label htmlFor="outlined-button-file">
                <Box
                  border="1px dashed"
                  borderColor="grey.500"
                  borderRadius="borderRadius"
                  display="flex"
                  justifyContent="center"
                  width={{ md: '50%' }}
                  m={{ md: 'auto' }}
                  py={1}>
                  <Button variant="tekst" disabled component="span">
                    <PermIdentityIcon />
                    Zdjęcie profilowe
                  </Button>
                </Box>
              </label>
            </Box>
            <Box mt={39} pb={5}>
              <Button
                variant="contained"
                fullWidth
                size="medium"
                color="primary"
                onClick={onClick}>
                Kontynuuj
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item md={4} />
    </Grid>
  );
};

export default PhotoPicker;
