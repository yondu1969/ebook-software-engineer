import { Helmet } from 'react-helmet-async';
// @mui
import { 
  Box,
  Grid, 
  Container, 
  Typography, 
  Stack,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// hooks
import useResponsive from '../hooks/useResponsive';
// sections
import { PaymentSummary, PaymentMethods, PaymentBillingAddress } from '../sections/payment';
import Iconify from '../components/iconify';


// ----------------------------------------------------------------------

export default function PaymentPage() {
  const isDesktop = useResponsive('up', 'md');

  const stripe = useStripe();
  const elements = useElements();
  const amount = "2.99"

  const handleBuyNow = async (e) => {
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => {
      return res.json();
    });

    const clientSecret = response.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'New Customer',
        },
      },
    });

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      alert(paymentResult.paymentIntent.status)
    }
  };

  return (
    <>
      <Helmet>
        <title> Payment | Minimal UI</title>
      </Helmet>

      <Container
        sx={{
          pt: 15,
          pb: 10,
          minHeight: 1,
        }}
      >
        <Typography variant="h3" align="center" paragraph>
          Let's finish powering you up!
        </Typography>

        <Typography align="center" sx={{ color: 'text.secondary', mb: 5 }}>
          Professional plan is right for you.
        </Typography>

        <Grid container spacing={isDesktop ? 3 : 5}>
          <Grid item xs={12} md={8}>
            <Box
              gap={5}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
              sx={{
                p: { md: 5 },
                borderRadius: 2,
                border: (theme) => ({
                  md: `dashed 1px ${theme.palette.divider}`,
                }),
              }}
            >
              <PaymentBillingAddress />

              {/* <PaymentMethods /> */}
              <Stack spacing={3}>
                <Typography variant="h6">Payment Method</Typography>

                <CardElement />

                <TextField fullWidth label="Name on card" />

                <TextField fullWidth label="Card number" />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField label="MM/YY" />

                  <TextField
                    label="CVV"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" edge="end" >
                            <Iconify icon="eva:info-fill" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>

                <LoadingButton onClick={handleBuyNow} fullWidth size="large" type="submit" variant="contained" sx={{ mt: 5, mb: 3 }}>
                  Buy Now
                </LoadingButton>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <PaymentSummary />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
