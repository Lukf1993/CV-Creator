import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeFormData } from '@ctx/cv/actions';
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Paper,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

const Interests = ({ history }) => {
  const [values, setValues] = React.useState({
    description: '',
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
        // ...state,
      }),
    );
    history.push('/cv/ready');
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Box component={Paper} mt={{ sm: 5 }} mx={{ xs: 0 }} p={0}>
          <Box display={{ sm: 'block', md: 'none' }} pt={5} ml={3}>
            <Link
              to={{
                pathname: '/cv/additionalInfo',
              }}>
              <ArrowBackIcon />
            </Link>
          </Box>
          <Box px={{ xs: 3, md: 9 }}>
            <Box pt={{ xs: 5, md: 7 }}>
              <Typography component="h2" variant="h2">
                Czym się{' '}
                <Typography component="b" variant="h2" color="primary">
                  interesujesz
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
                  label="Zainteresowania"
                  value={values.description}
                  onChange={handleChange('description')}
                  multiline
                  fullWidth
                  rows="4"
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
                />
              </Box>
            </form>
            <Box mt={28} pb={5}>
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

export default Interests;
