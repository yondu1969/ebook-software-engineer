import { Helmet } from 'react-helmet-async';
// @mui
import { Divider } from '@mui/material';
// sections
import { About, What, MyGoal, AboutMe, ContactUsForm, BuyNowForm } from './sections';
// ----------------------------------------------------------------------

export default function EBookSoftwareEngineerPage() {
  return (
    <>
      <Helmet>
        <title> Software Engineer eBook</title>
      </Helmet>

      <About />

      <What />

      {/* <Divider orientation="vertical" sx={{ my: 1, mx: 'auto', width: 2, height: 10 }} /> */}

      <ContactUsForm />

      <MyGoal />

      <BuyNowForm />


      <AboutMe />

    </>
  );
}
