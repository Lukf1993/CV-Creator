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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextButton from '@c/Common/TextButton';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const Courses = ({ history }) => {

  const classes = useStyles();

  const [values, setValues] = React.useState({
    name: '',
    date: '',
  });

  const [courses, setCourses] = React.useState([]);

  function addCours() {
    setCourses(state => [
      ...state,
      {
        date: '',
        coursName: '',
      },
    ]);
  }

  function removeItem(index, arr) {
    const newArr = arr.filter(item => item.index !== index);
    setCourses(newArr)
  }

  function editCours(index, name, value) {
    const newCours = courses.map((item, i) => {
      if (index === i) {
        return {
          ...item,
          [name]: value,
        };
      }

      return item;
    });

    setCourses([...newCours]);
  }

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
        // ...state,
      }),
    );
    history.push('/cv/additionalInfo');
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleDateChange = date => {
    setValues({ ...values, date });
  };
//   const ID = function () {
//     return (
//     `_${ 
//       Math.random()
//       .toString(36)
//     .substr(2, 9)}`
// )};

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Box component={Paper} mt={{ sm: 5 }} mx={{ xs: 0 }} p={0}>
          <Box display={{ sm: 'block', md: 'none' }} pt={5} ml={3}>
            <Link
              to={{
                pathname: '/cv/experience',
              }}>
              <ArrowBackIcon />
            </Link>
          </Box>
          <Box px={{ xs: 3, md: 9 }}>
            <Box pt={{ xs: 5, md: 7 }}>
              <Typography component="h2" variant="h2">
                Masz jakieś{' '}
                <Typography component="b" variant="h2" color="primary">
                  kursy i szkolenia
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
              {courses.map((item, index) => (
                <>
                  <Box mt={4}>
                    <TextField
                      label="Nazwa kursu"
                      value={values.name}
                      onChange={handleChange('name')}
                      fullWidth
                    />
                  </Box>
                  <Box mt={4}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        label="Data uzyskania"
                        format="dd/MM/yyyy"
                        value=""
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        fullWidth
                      />
                    </MuiPickersUtilsProvider>
                  </Box>
                  <Box mt={3} display="flex" alignItems="center">
                  <Box mt={3} display="flex" alignItems="center">
                  <TextButton
                      text="Usuń kolejny"
                      icon={
                        <RemoveCircleOutlineIcon
                          className={classes.icon}
                        />
                      }
                      hover="error.dark"
                      color="error.main"
                      buttonProps={{
                        color: 'error.main',
                        onClick: () => removeItem(item.index, courses),
                      }}
                    />
                </Box>
                  </Box>
                </>
              ))}
            </form>
            <form>
              <>
                <Box mt={4}>
                  <TextField
                    label="Nazwa kursu"
                    value={values.name}
                    onChange={handleChange('name')}
                    fullWidth
                  />
                </Box>
                <Box mt={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      label="Data uzyskania"
                      format="dd/MM/yyyy"
                      value=""
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Box>
                <Box mt={3} display="flex" alignItems="center">
                <TextButton
                      text="Dodaj kolejny numer"
                      icon={
                        <AddCircleOutlineIcon
                          className={classes.icon}
                        />
                      }
                      hover="primary.main"
                      color="primary"
                      buttonProps={{
                        color: 'primary',
                        onClick: addCours,
                      }}
                    />
                </Box>
              </>
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

export default Courses;
