import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';
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
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextButton from '@c/Common/TextButton';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const Contact = ({ history }) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: '',
  });
  const [phone, setPhone] = React.useState([
    {
      id: shortid.generate(),
      phoneNumber: '',
    },
  ]);

  function addPhone() {
    setPhone(state => [
      ...state,
      {
        id: shortid.generate(),
        phoneNumber: '',
      },
    ]);
  }

  function removeItem(id, arr) {
    if (arr.length > 1) {
      const newArr = arr.filter(item => item.id !== id);
      setPhone(newArr);
    }
  }

  function editPhone(id, name, value) {
    console.log({ id, name, value });
    const newPhone = phone.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [name]: value,
        };
      }
      return item;
    });
    console.log(newPhone);
    setPhone(newPhone);
  }

  const cvStore = useSelector(store => ({
    formData: store.cv.formData,
    loading: store.cv.loading,
  }));

  const dispatch = useDispatch();
  const { formData } = cvStore;

  // console.log(formData.data);
  // console.log(formData);

  const onClick = () => {
    dispatch(
      storeFormData({
        ...formData,
        ...values,
      }),
    );
    history.push('/cv/inhabitancy');
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  // console.log(values);

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Box component={Paper} mt={{ sm: 5 }} mx={{ xs: 0 }} p={0}>
          <Box display={{ sm: 'block', md: 'none' }} pt={5} ml={3}>
            <Link
              to={{
                pathname: '/cv/photo',
              }}>
              <ArrowBackIcon />
            </Link>
          </Box>
          <Box px={{ xs: 3, md: 9 }}>
            <Box pt={{ xs: 5, md: 7 }}>
              <Typography component="h2" variant="h2">
                Jak się z tobą{' '}
                <Typography component="b" variant="h2" color="primary">
                  skontaktować
                </Typography>
                ?
              </Typography>
            </Box>
            <Box mt={4}>
              <Typography component="p" variant="subtitle1">
                Z nami stworzysz swoje CV w 10 minut, przygotuj wszystkie
                niezbędne informacje i zaczynajmy.
              </Typography>
            </Box>
            <form>
              <Box mt={4}>
                <TextField
                  label="Adres email"
                  value={values.email}
                  onChange={handleChange('email')}
                  fullWidth
                />
              </Box>
              {phone.map(item => (
                <Box key={item.id}>
                  <Box mt={4}>
                    <TextField
                      label="NUMER TELEFONU"
                      value={item.phoneNumber}
                      onChange={event =>
                        editPhone(item.id, 'phoneNumber', event.target.value)
                      }
                      fullWidth
                    />
                  </Box>
                  {phone.length > 1 && (
                    <Box mt={3} display="flex" alignItems="center">
                      <TextButton
                        text="Usuń poprzedni numer"
                        icon={
                          <RemoveCircleOutlineIcon className={classes.icon} />
                        }
                        hover="error.dark"
                        color="error.main"
                        buttonProps={{
                          color: 'error.main',
                          onClick: () => removeItem(item.id, phone),
                        }}
                      />
                    </Box>
                  )}
                </Box>
              ))}
              <Box mt={3} display="flex" alignItems="center">
                <TextButton
                  text="Dodaj kolejny numer"
                  icon={<AddCircleOutlineIcon className={classes.icon} />}
                  hover="primary.main"
                  color="primary"
                  buttonProps={{
                    color: 'primary',
                    onClick: addPhone,
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
            </form>
          </Box>
        </Box>
      </Grid>
      <Grid item md={4} />
    </Grid>
  );
};

export default Contact;
