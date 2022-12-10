import { m } from 'framer-motion';
// @mui
import { Box, Container, Typography, Stack } from '@mui/material';
// components
import Image from '../../../components/image';
import { MotionViewport, varFade } from '../../../components/animate';

// ----------------------------------------------------------------------

export default function MyGoal() {
  return (
    <Container component={MotionViewport} sx={{ mt: 10 }}>
      <Box
        sx={{
          mb: 10,
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Image src="/assets/images/about/code.jpeg" alt="code" sx={{ height: 448 }} />
      </Box>

      <m.div variants={varFade().inUp}>
        <Typography variant="h3" sx={{ textAlign: 'center', maxWidth: 900, mx: 'auto' }}>
          My goal is to help you succeed in your career, by getting you off to the right start in Software Development.
        </Typography>
      </m.div>
    </Container>
  );
}
