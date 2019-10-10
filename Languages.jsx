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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link } from 'react-router-dom';
import TextButton from '@c/Common/TextButton';

const useStyles = makeStyles(theme => ({
  menu: {
    width: 200,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));
const Languages = ({ history }) => {
  const classes = useStyles();

  const [languages, setLanguages] = React.useState([]);

  function addLanguage() {
    setLanguages(state => [
      ...state,
      {
        date: '',
        coursName: '',
      },
    ]);
  }

  function removeItem(index, arr) {
    const newArr = arr.filter(item => item.index !== index);
    setLanguages(newArr)
  }

  function editLanguage(index, name, value) {
    const newLanguage = languages.map((item, i) => {
      if (index === i) {
        return {
          ...item,
          [name]: value,
        };
      }

      return item;
    });

    setLanguages([...newLanguage]);
  }

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
      }),
    );
    history.push('/cv/education');
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  // console.log(values);

  const languageSelect = [
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

  const level = [
    {
      value: 'A',
      label: 'Podstawowy',
    },
    {
      value: 'B',
      label: 'Średnio zaawansowany',
    },
    {
      value: 'C',
      label: 'Holandia',
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Box component={Paper} mt={{ sm: 5 }} mx={{ xs: 0 }} p={0}>
          <Box display={{ sm: 'block', md: 'none' }} pt={5} ml={3}>
            <Link
              to={{
                pathname: '/cv/inhabitancy',
              }}>
              <ArrowBackIcon />
            </Link>
          </Box>
          <Box px={{ xs: 3, md: 9 }}>
            <Box pt={{ xs: 5, md: 7 }}>
              <Typography component="h2" variant="h2">
                W jakich językach{' '}
                <Typography component="b" variant="h2" color="primary">
                  się porozumiewasz
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
              {languages.map((index, item) => (
                <>
                  <Box mt={4}>
                    <TextField
                      select
                      label="JĘZYK"
                      value=""
                      onChange={handleChange('language')}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      fullWidth>
                      {languageSelect.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  <Box mt={4}>
                    <TextField
                      select
                      label="POZIOM"
                      value=""
                      onChange={handleChange('level')}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      fullWidth>
                      {level.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  <Box mt={3} display="flex" alignItems="center">
                  <TextButton
                      text="Usuń poprzedni język"
                      icon={
                        <RemoveCircleOutlineIcon
                          className={classes.icon}
                        />
                      }
                      hover="error.dark"
                      color="error.main"
                      buttonProps={{
                        color: 'error.main',
                        onClick: () => removeItem(item.index, languages),
                      }}
                    />
                  </Box>
                </>
              ))}
            </form>
            <Box mt={4}>
              <TextField
                select
                label="JĘZYK"
                value=""
                onChange={handleChange('language')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                fullWidth>
                {languageSelect.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box mt={4}>
              <TextField
                select
                label="POZIOM"
                value=""
                onChange={handleChange('level')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                fullWidth>
                {level.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box mt={3} display="flex" alignItems="center">
            <TextButton
                      text="Dodaj kolejny etat"
                      icon={
                        <AddCircleOutlineIcon
                          className={classes.icon}
                          color="primary"
                        />
                      }
                      hover="primary.main"
                      color="primary"
                      buttonProps={{
                        color: 'primary',
                        to: '/',
                        onClick: addLanguage,
                      }}
                    />
            </Box>
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

export default Languages;
