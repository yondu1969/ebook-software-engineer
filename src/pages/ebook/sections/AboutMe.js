import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { useRef } from 'react';
// @mui
import { useTheme, alpha, styled } from '@mui/material/styles';
import { Box, Stack, Card, CardHeader, CardMedia, Grid, Container, Typography, IconButton } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
import { MotionViewport, varFade } from '../../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
}));

// ----------------------------------------------------------------------

export default function AboutMe() {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const isLight = theme.palette.mode === 'light';

  const shadow = `-40px 40px 80px ${alpha(isLight ? theme.palette.grey[500] : theme.palette.common.black, 0.48)}`;

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                About Me
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography
                fontWeight={1}
                lineHeight={1.5}
                variant="h6"
                sx={{
                  color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'),
                }}
              >
                <p>
                I've been working as a Software Engineer for over 20 years in various industries
                such as retail, finance, insurance, media and vertical saas.  I'm an AWS Certified Developer - Associate
                and have working in all aspects of product delivery from inception to production release.
                </p>

                <p>
                I work primary in Javascript and React, including other languages such as Java and Python.
                I have also done DevOps, QA, requirements gather, project management and product support.    
                </p>

                <p>
                Given my wide breadth of experiece, I will help guide you on the right path depending on your
                level of experience and your goals.                  
                </p>
                
              </Typography>
            </m.div>

          </Grid>
          
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardHeader
                title="David Hang"
                subheader="Full Stack Engineer"
                sx={{ mb: 2 }}
              />
              <CardMedia
                sx={{ width: 313, height: 415 }}
                component="img"
                image="/assets/images/about/me.jpeg"
                alt="me"
              />

              <Stack direction="row" alignItems="center" justifyContent="center" sx={{ p: 1.5 }}>
                <IconButton
                  sx={{
                    color: '#007EBB',
                    '&:hover': {
                      bgcolor: alpha('#007EBB', 0.08),
                    },
                  }}
                >
                  <Iconify icon='eva:linkedin-fill' />
                </IconButton>
                <IconButton
                  sx={{
                    color: '#00AAEC',
                    '&:hover': {
                      bgcolor: alpha('#00AAEC', 0.08),
                    },
                  }}
                >
                  <Iconify icon='eva:twitter-fill' />
                </IconButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </StyledRoot>
  );
}
