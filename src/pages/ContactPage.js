import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Box } from '@mui/material';
// sections
import { ContactHero, ContactForm } from '../sections/contact';

// ----------------------------------------------------------------------

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title> Contact us | Minimal UI</title>
      </Helmet>

      <ContactHero />

      <Container sx={{ py: 10 }}>
        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          <ContactForm />

        </Box>
      </Container>
    </>
  );
}
