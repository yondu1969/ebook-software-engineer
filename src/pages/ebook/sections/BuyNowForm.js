import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// @mui
import { 
  Box,
  Grid, 
  Container, 
  Typography, 
  Stack,
  TextField,
  Divider
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { MotionViewport } from '../../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    textAlign: 'center',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
  }));
  
export default function BuyNowForm() {
  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);

  const stripe = useStripe();
  const elements = useElements();
  const amount = "2.99"
  const CARD_ELEMENT_OPTIONS = {
    style: {
    base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "20px",
        "::placeholder": {
        color: "#aab7c4",
        },
    },
    invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
    },
    },
  };

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
            receipt_email: email,
            billing_details: {
                name: fullName,
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
    <StyledRoot>
      <Container component={MotionViewport}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                <Box
                    gap={5}
                    display="grid"
                    sx={{
                        p: { md: 5 },
                        borderRadius: 2,
                        border: (theme) => ({
                        md: `dashed 1px ${theme.palette.divider}`,
                        }),
                }}
                >
                    <Stack spacing={2}>
                        <Typography variant="h6">eMail & Payment Method</Typography>

                        <TextField 
                            fullWidth 
                            label="eMail" 
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        <TextField 
                            fullWidth 
                            label="Name on card" 
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                        />

                        <CardElement options={CARD_ELEMENT_OPTIONS} />

                        <LoadingButton onClick={handleBuyNow} fullWidth size="large" type="submit" variant="contained" sx={{ mt: 5, mb: 3 }}>
                            Buy Now
                        </LoadingButton>
                    </Stack>
                </Box>
            </Grid>

            <Grid item xs={12} md={4}>
                <Box
                    sx={{
                        p: 5,
                        borderRadius: 2,
                        bgcolor: 'background.neutral',
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        'Get Started on Being a Software Engineer' eBook
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 5 }}>
                        (Limited Time Sale Price ! )
                    </Typography>

                    <Stack spacing={2.5}>
                        <Stack spacing={1} direction="row" justifyContent="flex-end">
                            <Box component="span" sx={{ fontSize: 24, textDecoration: 'line-through red', mr: 0.5 }}>
                                $8.99
                            </Box>
                            <Typography variant="h5">$</Typography>
                            <Typography variant="h2">4.99</Typography>
                        </Stack>
                        <Divider sx={{ borderStyle: 'dashed' }} />
                    </Stack>

                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            Upon receipt of payment, I will send you my eBook as a PDF to the eMail provided.
                        </Typography>
                    </Stack>
                </Box>            
            </Grid>
        </Grid>
      </Container>
    </StyledRoot>
  );
}
