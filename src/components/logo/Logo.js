import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link, Stack, Typography } from '@mui/material';
import { PATH_PAGE } from '../../routes/paths';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Stack direction="column">
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 60,
          height: 40,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <img src="/assets/images/pancakes-logo1.jpeg" alt="logo" />
        {/* <Typography>Pancakes FullStack Engineer</Typography> */}
      </Box>
    </Stack>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to={PATH_PAGE.ebook} component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
