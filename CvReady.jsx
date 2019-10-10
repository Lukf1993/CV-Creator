import React from 'react';
import { Button, Grid, Typography, Box, Paper } from '@material-ui/core';
import { ReactComponent as CvReadySVG } from '@a/img/cv/cv-ready.svg';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

const CvReady = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Box>
          <Box px={{ xs: 3, md: 9 }}>
            <Typography component="p" variant="subtitle2">
              Potrzebujesz{' '}
              <Typography component="b" variant="subtitle2" color="primary">
                przetłumaczyć swoje cv
              </Typography>
              ?
            </Typography>
            <Typography component="p" variant="caption" color="primary">
              Możemy ci pomóc, kliknij aby dowiedzieć się więcej
            </Typography>
          </Box>
          <Box component={Paper} mt={{ sm: 5 }} mx={{ xs: 0 }} p={0}>
            <Box display={{ sm: 'block', md: 'none' }} pt={5} ml={3}>
              <Link
                to={{
                  pathname: '/cv/interests',
                }}>
                <ArrowBackIcon />
              </Link>
            </Box>
            <Box px={{ xs: 3, md: 9 }}>
              <Box pt={{ xs: 5, md: 7 }}>
                <Typography component="h2" variant="h2">
                  Twoje cv jest{' '}
                  <Typography component="b" variant="h2" color="primary">
                    gotowe
                  </Typography>{' '}
                  !
                </Typography>
              </Box>
              <Box mt={4}>
                <Typography component="p" variant="subtitle1">
                  Wysłaliśmy je również na podanego wcześniej emaila :{')'}
                </Typography>
              </Box>
              <Box>
                <CvReadySVG />
              </Box>
              <Box mt={10}>
                <Button
                  variant="contained"
                  fullWidth
                  size="medium"
                  color="primary">
                  Pobierz i wyjdź
                </Button>
              </Box>
              <Box mt={7} pb={5}>
                <Link
                  to={{
                    pathname: '',
                  }}>
                  <Button fullWidth size="medium" color="primary">
                    Wyłącz
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item md={4} />
    </Grid>
  );
};

export default CvReady;
