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
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
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

const Experience = ({ history }) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    start: '',
    end: '',
    employer: '',
    description: '',
  });

  const [job, setJob] = React.useState([]);

  function addJob() {
    setJob(state => [
      ...state,
      {
        start: '',
        end: '',
        employer: '',
        decription: '',
      },
    ]);
  }

  function removeItem(index, arr) {
    const newArr = arr.filter(item => item.index !== index);
    setJob(newArr)
  }

  function editJob(index, name, value) {
    const newJob = job.map((item, i) => {
      if (index === i) {
        return {
          ...item,
          [name]: value,
        };
      }

      return item;
    });

    setJob([...newJob]);
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
        // ...state,
      }),
    );
    history.push('/cv/courses');
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <Grid container>
      <Grid item  mb={8}>
        <Box component={Paper} mt={{ sm: 5 }} mx={{ xs: 0 }} p={0}>
          <Box display={{ sm: 'block', md: 'none' }} pt={5} ml={3}>
            <Link
              to={{
                pathname: '/cv/education',
              }}>
              <ArrowBackIcon />
            </Link>
          </Box>
          <Box px={{ xs: 3, md: 9 }} pb={5}>
            <Box pt={{ xs: 5, md: 7 }}>
              <Typography component="h2" variant="h2">
                {' '}
                Jakie jest twoje{' '}
                <Typography component="b" variant="h2" color="primary">
                  doświadczenie
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
              {job.map((item, index) => (
                <>
                  <Box display="flex">
                    <Box mt={4} flex={1}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          label="Start"
                          format="dd/MM/yyyy"
                          value="11/05/2015"
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
                          format="dd/MM/yyyy"
                          value="11/05/2015"
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
                      label="Nazwa pracodawcy"
                      value={values.employer}
                      onChange={handleChange('employer')}
                      fullWidth
                    />
                  </Box>
                  <Box mt={4}>
                    <TextField
                      label="Opis stanowiska"
                      value={values.description}
                      onChange={handleChange('description')}
                      fullWidth
                    />
                  </Box>
                  <Box mt={3} display="flex" alignItems="center">
                  <TextButton
                      text="Usuń poprzedni etat"
                      icon={
                        <RemoveCircleOutlineIcon
                          className={classes.icon}
                        />
                      }
                      hover="error.dark"
                      color="error.main"
                      buttonProps={{
                        color: 'error.main',
                        onClick: () => removeItem(item.index, job),
                      }}
                    />
                  </Box>
                </>
              ))}
            </form>
            <form>
              <>
                <Box display="flex">
                  <Box mt={4} flex={1}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        label="Start"
                        format="dd/MM/yyyy"
                        value="11/05/2015"
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
                        format="dd/MM/yyyy"
                        value="11/05/2015"
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
                    label="Nazwa pracodawcy"
                    value={values.employer}
                    onChange={handleChange('employer')}
                    fullWidth
                  />
                </Box>
                <Box mt={4}>
                  <TextField
                    label="Opis stanowiska"
                    value={values.description}
                    onChange={handleChange('description')}
                    fullWidth
                  />
                </Box>
                <Box mt={3} display="flex" alignItems="center">
                    <TextButton
                      text="Dodaj kolejny etat"
                      icon={
                        <AddCircleOutlineIcon
                          className={classes.icon}
                        />
                      }
                      hover="primary.main"
                      color="primary"
                      buttonProps={{
                        color: 'primary',
                        onClick: addJob,
                      }}
                    />
                </Box>
              </>
            </form>
            <Box mt={10} pt={5}>
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
      <Grid item mb={4} />
    </Grid>
  );
};

export default Experience;
