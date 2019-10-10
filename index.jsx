import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeFormData } from '@ctx/cv/actions';
import { Button, Grid, Typography, Paper, Box } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { ReactComponent as CvCreatorSVG } from '@a/img/cv/cv-creator.svg';
import { Link } from 'react-router-dom';

const CvCreator = ({ history }) => {
  const [state] = useState({
    testData: 'qweqwe',
  });

  const cvStore = useSelector(store => ({
    formData: store.cv.formData,
    loading: store.cv.loading,
  }));

  const dispatch = useDispatch();
  const { formData } = cvStore;

  console.log(formData.data);
  console.log(formData);

  const onClick = () => {
    dispatch(
      storeFormData({
        ...formData,
        ...state,
      }),
    );
    history.push('/cv/pattern');
  };

  return (
    <Box component={Paper} mt={{ sm: 10 }} mx={{ xs: 0 }} p={0}>
      <Box maxHeight={{ xs: '100hv', md: 'auto' }}>
        <Box display={{ sm: 'block', md: 'none' }} pt={5} ml={3}>
          <Link
            to={{
              pathname: '/',
            }}>
            <ArrowBackIcon />
          </Link>
        </Box>
        <Grid container direction="row-reverse">
          <Grid item md={8} lg={9}>
            <Box mt={{ xs: 5, md: 7 }} m={3}>
              <Typography component="h2" variant="h2">
                Stwórz swoje{' '}
                <Typography component="b" variant="h2" color="primary">
                  CV
                </Typography>{' '}
                już dziś
              </Typography>
              <Box mt={{ xs: 4, md: 2 }} mr={{ md: 30 }}>
                <Typography component="p" variant="subtitle1">
                  Z nami stworzysz swoje CV w 10 minut, przygotuj wszystkie
                  niezbędne informacje i zaczynajmy.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Grid container justify="center">
              <Box m={{ xs: 15, md: 7 }} ml={{ md: 9 }} mx={0}>
                <CvCreatorSVG />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box display={{ sm: 'block' }} m={3} pb={5}>
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
  );
};

export default CvCreator;
