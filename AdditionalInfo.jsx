import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeFormData } from '@ctx/cv/actions';
import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  FormGroup,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

const AdditionalInfo = ({ history }) => {
  const [values, setValues] = React.useState({
    driverLicence: false,
    accommodation: false,
    bsn: false,
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
    history.push('/cv/interests');
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.checked });
  };

  console.log(values);

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Box component={Paper} mt={{ sm: 5 }} mx={{ xs: 0 }} p={0}>
          <Box display={{ sm: 'block', md: 'none' }} pt={5} ml={3}>
            <Link
              to={{
                pathname: '/cv/courses',
              }}>
              <ArrowBackIcon />
            </Link>
          </Box>
          <Box px={{ xs: 3, md: 9 }}>
            <Box pt={{ xs: 5, md: 7 }}>
              <Typography component="h2" variant="h2">
                Dodatkowe{' '}
                <Typography component="b" variant="h2" color="primary">
                  informacje
                </Typography>{' '}
              </Typography>
            </Box>
            <FormGroup>
              <Box mt={4} display="flex">
                <Box flex={2}>
                  <Typography component="p">Prawo jazdy kat. b </Typography>
                </Box>
                <Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.driverLicence}
                        onChange={handleChange('driverLicence')}
                        value="driverLicence"
                        color="primary"
                      />
                    }
                  />
                </Box>
              </Box>
              <Box mt={4} display="flex">
                <Box flex={2}>
                  <Typography component="p">Własne zakwaterowanie </Typography>
                </Box>
                <Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.accommodation}
                        onChange={handleChange('accommodation')}
                        value="accommodation"
                        color="primary"
                      />
                    }
                  />
                </Box>
              </Box>
              <Box mt={4} display="flex">
                <Box flex={2}>
                  <Typography component="p">Numer BSN </Typography>
                </Box>
                <Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.bsn}
                        onChange={handleChange('bsn')}
                        value="bsn"
                        color="primary"
                      />
                    }
                  />
                </Box>
              </Box>
            </FormGroup>
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

export default AdditionalInfo;
