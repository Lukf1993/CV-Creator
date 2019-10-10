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
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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

const Education = ({ history }) => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const [values, setValues] = React.useState({
    start: '',
    end: '',
    schoolName: '',
    level: '',
  });

  const [schools, setSchools] = React.useState([]);

  function addSchool() {
    setSchools(state => [
      ...state,
      {
        start: '',
        end: '',
        schoolName: '',
        level: '',
      },
    ]);
  }

  function removeItem(index, arr) {
    const newArr = arr.filter(item => item.index !== index);
    setSchools(newArr)
  }

  function editSchool(index, name, value) {

    const classes = useStyles();

    const newSchool = schools.map((item, i) => {
      if (index === i) {
        return {
          ...item,
          [name]: value,
        };
      }

      return item;
    });

    setSchools([...newSchool]);
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
    history.push('/cv/experience');
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };


  console.log(values);

  const level = [
    {
      value: 'C',
      label: 'Podstawowe',
    },
    {
      value: 'B',
      label: 'Średnie',
    },
    {
      value: 'C',
      label: 'Wyższe',
    },
  ];
  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Box component={Paper} mt={{ sm: 5 }} mx={{ xs: 0 }} p={0}>
          <Box display={{ sm: 'block', md: 'none' }} pt={5} ml={3}>
            <Link
              to={{
                pathname: '/cv/languages',
              }}>
              <ArrowBackIcon />
            </Link>
          </Box>
          <Box px={{ xs: 3, md: 9 }}>
            <Box pt={{ xs: 5, md: 7 }}>
              <Typography component="h2" variant="h2">
                Jakie jest twoje{' '}
                <Typography component="b" variant="h2" color="primary">
                  wykształcenie
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
              {schools.map((item, index) => (
                <>
                  <Box display="flex">
                    <Box mt={4} flex={1}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          label="Start"
                          format="11/02/2018"
                          value="selectedDate"
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          fullWidth
                        />
                      </MuiPickersUtilsProvider>
                    </Box>
                    <Box mt={4} flex={1}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          label="Koniec"
                          format="11/02/2018"
                          value="selectedDate"
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          fullWidth
                        />
                      </MuiPickersUtilsProvider>
                    </Box>
                  </Box>
                  <Box mt={4}>
                    <TextField
                      label="Nazwa instytucji"
                      value={values.name}
                      onChange={handleChange('name')}
                      fullWidth
                    />
                  </Box>
                  <Box mt={4}>
                    <TextField
                      select
                      label="Poziom wykształcenia"
                      value={values.level}
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
                      text="Usuń poprzednią szkołę"
                      icon={
                        <RemoveCircleOutlineIcon
                          className={classes.icon}
                        />
                      }
                      hover="error.dark"
                      color="error.main"
                      buttonProps={{
                        color: 'error.main',
                        onClick: () => removeItem(item.index, schools),
                      }}
                    />
                  </Box>
                </>
              ))}
            </form>
            <>
              <Box display="flex">
                <Box mt={4} flex={1}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      label="Start"
                      format="11/02/2018"
                      value="selectedDate"
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Box>
                <Box mt={4} flex={1}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      label="Koniec"
                      format="11/02/2018"
                      value="selectedDate"
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Box>
              </Box>
              <Box mt={4}>
                <TextField
                  label="Nazwa instytucji"
                  value={values.name}
                  onChange={handleChange('name')}
                  fullWidth
                />
              </Box>
              <Box mt={4}>
                <TextField
                  select
                  label="Poziom wykształcenia"
                  value={values.level}
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
                      text="Dodaj kolejną szkołę "
                      icon={
                        <AddCircleOutlineIcon
                          className={classes.icon}
                        />
                      }
                      hover="primary.main"
                      color="primary"
                      buttonProps={{
                        color: 'primary',
                        onClick: addSchool,
                      }}
                    />
              </Box>
            </>
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

export default Education;
