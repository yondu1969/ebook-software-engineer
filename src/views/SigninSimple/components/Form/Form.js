/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import {
  signInWithGooglePopup
  , createUserDocumentFromAuth 
} from '../../../../utils/firebase.utils'

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
  password: yup
    .string()
    .required('Please specify your password')
    .min(8, 'The password should have at minimum length of 8'),
});

const Form = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values) => {
    return values;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Welcome back
        </Typography>
        <Typography color="text.secondary">
          Login to manage your account.
        </Typography>
      </Box>
      <Box marginBottom={4}>
        <Button size={'large'} variant={'contained'} onClick={signInWithGoogle}>
          Login with Google
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
