import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';

import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { useTheme, styled } from '@mui/material/styles';

import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Container, Typography } from '@mui/material';
// components
import FormProvider, {
  RHFTextField,
} from '../../../components/hook-form';
import { MotionViewport } from '../../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    textAlign: 'center',
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
  }));
  
export default function ContactUsForm() {
  const theme = useTheme();

  const ContactUsFormSchema = Yup.object().shape({
    fullName: Yup.string().required('Name is required'),
    email: Yup.string().required('eMail is required'),
    message: Yup.string().required('Message is required'),
  });

  const defaultValues = {
    fullName: '',
    email: '',
    message: '',
  };

  const methods = useForm({
    resolver: yupResolver(ContactUsFormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = async (data) => {
    try {
      alert(data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
    } catch (error) {
      alert(error)
      console.error(error);
    }
  };

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h2" sx={{ mb: 3 }}>Questions?</Typography>

                <Typography
                  sx={{
                    lineHeight: '30px',
                    color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'),
                  }}>
                  Please send me any questions you have on this eBook or other products.
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <RHFTextField name="fullName" label="Your Name" />

                  <RHFTextField name="email" label="Your eMail" />

                  <RHFTextField name="message" label="Your Message" multiline rows={3} />
                </Stack>

                <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                  <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                    Send
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </Container>
    </StyledRoot>
  );
}
