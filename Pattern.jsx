import React from 'react';
import { Button, Grid, Typography, Paper, Box } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const background = require('@a/img/cv/cv-pattern.png');

const useStyles = makeStyles(theme => ({
  pattern: {
    display: 'block',
    maxWidth: 750,
    minHeight: 316,
    marginTop: 58,
    marginBottom: 86,
    background: `url(${background}) 50% 50% no-repeat`,
  },
}));

const CvPattern = ({ history }) => {
  const classes = useStyles();

  const onClick = () => {
    history.push('/cv/photo');
  };
  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        {' '}
        <Box component={Paper} mt={{ sm: 5 }} mx={{ xs: 0 }} p={0}>
          <Box display={{ sm: 'block', md: 'none' }} pt={5} ml={3}>
            <Link
              to={{
                pathname: '/cv',
              }}>
              <ArrowBackIcon />
            </Link>
          </Box>
          <Box px={{ xs: 3, md: 9 }}>
            <Box pt={{ xs: 5, md: 7 }}>
              <Typography component="h2" variant="h2">
                Wybierz{' '}
                <Typography variant="h2" component="b" color="primary">
                  odpowiedni wzór
                </Typography>
              </Typography>
            </Box>
            <Box mt={4} mx={{ xs: 3, md: 9 }}>
              <Typography component="p" variant="subtitle1">
                Z nami stworzysz swoje CV w 10 minut, przygotuj wszystkie
                niezbędne informacje i zaczynajmy.
              </Typography>
            </Box>
            <Box className={classes.pattern} />
            <Box m={3} mx={{ md: 5 }} pb={5}>
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

export default CvPattern;
