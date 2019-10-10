import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeFormData } from '@ctx/cv/actions';
import {
  Button,
  Typography,
  TextField,
  Paper,
  Box,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  menu: {
    width: 200,
  },
}));

const PersonalData = () => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    name: '',
    surname: '',
    sex: '',
    age: '',
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
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleDateChange = date => {
    setValues({ ...values, age: date });
  };

  const sex = [
    {
      value: 'Kobieta',
      label: 'Kobieta',
    },
    {
      value: 'Mężczyzna',
      label: 'Mężczyzna',
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Box component={Paper} mt={{ sm: 5 }} mx={{ xs: 0 }} p={0}>
          <Box display={{ sm: 'block', md: 'none' }} pt={5} ml={3}>
            <Link
              to={{
                pathname: '/cv/pattern',
              }}>
              <ArrowBackIcon />
            </Link>
          </Box>
          <Box pt={{ xs: 5, md: 7 }} mx={{ xs: 3, md: 9 }}>
            <Typography component="h2" variant="h2">
              Podaj nam swoje{' '}
              <Typography component="b" variant="h2" color="primary">
                dane
              </Typography>
            </Typography>
          </Box>
          <Box mt={4} px={{ xs: 3, md: 9 }}>
            <Typography component="p" variant="subtitle1">
              Z nami stworzysz swoje CV w 10 minut, przygotuj wszystkie
              niezbędne informacje i zaczynajmy.
            </Typography>
          </Box>
          <Box px={{ xs: 3, md: 9 }}>
            <form>
              <Box mt={4}>
                <TextField
                  label="Imię"
                  value={values.name}
                  onChange={handleChange('name')}
                  fullWidth
                />
              </Box>
              <Box mt={4}>
                <TextField
                  label="Nazwisko"
                  value={values.surname}
                  onChange={handleChange('surname')}
                  fullWidth
                />
              </Box>
              <Box mt={4}>
                <TextField
                  select
                  label="Płeć"
                  value={values.sex}
                  onChange={handleChange('sex')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  fullWidth>
                  {sex.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box mt={4}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    label="Data urodziń"
                    format="MM/dd/yyyy"
                    value="12/07/2015"
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
              </Box>
            </form>
            <Box mt={10} pb={5}>
              <Link
                to={{
                  pathname: '/cv/photo',
                }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="medium"
                  color="primary"
                  onClick={onClick}>
                  Kontynuuj
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item md={4} />
    </Grid>
  );
};

export default PersonalData;
