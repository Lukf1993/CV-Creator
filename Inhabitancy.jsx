import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeFormData } from '@ctx/cv/actions';
import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  Grid, 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  menu: {
    width: 200,
  },
}));

const Inhabitancy = ({ history }) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    streetNr: '',
    postcode: '',
    city: '',
    country: '',
  });

  const [state] = useState({
    testData: 'teest',
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
    history.push('/cv/languages');
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const nation = [
    {
      value: 'Pl',
      label: 'Polska',
    },
    {
      value: 'Ger',
      label: 'Niemcy',
    },
    {
      value: 'Nl',
      label: 'Holandia',
    },
  ];
  // console.log(values);

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Box component={Paper} mt={{ sm: 5 }} mx={{ xs: 0 }} p={0}>
          <Box display={{ sm: 'block', md: 'none' }} pt={5} ml={3}>
            <Link
              to={{
                pathname: '/cv/contact',
              }}>
              <ArrowBackIcon />
            </Link>
          </Box>
          <Box px={{ xs: 3, md: 9 }}>
            <Box pt={{ xs: 5, md: 7 }}>
              <Typography component="h2" variant="h2">
                Gdzie{' '}
                <Typography component="b" variant="h2" color="primary">
                  mieszkasz
                </Typography>{' '}
                ?
              </Typography>
            </Box>
            <Box mt={4}>
              <Typography component="p" variant="subtitle1">
                Z nami stworzysz swoje CV w 10 minut, przygotuj
              </Typography>
            </Box>
            <form>
              <Box mt={4}>
                <TextField
                  label="Ulica i numer domu"
                  value={values.streetNr}
                  onChange={handleChange('streetNr')}
                  fullWidth
                />
              </Box>
              <Box mt={4}>
                <TextField
                  label="Kod pocztowy"
                  value={values.postcode}
                  onChange={handleChange('postcode')}
                  fullWidth
                />
              </Box>
              <Box mt={4}>
                <TextField
                  label="Miasto"
                  value={values.city}
                  onChange={handleChange('city')}
                  fullWidth
                />
              </Box>
              <Box mt={4}>
                <TextField
                  select
                  label="Kraj"
                  value={values.country}
                  onChange={handleChange('country')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  fullWidth>
                  {nation.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </form>
            <Box mt={10} pb={5}>
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

export default Inhabitancy;
