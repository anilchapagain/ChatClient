import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { grayColor } from '../components/constants/Color';

const Home = () => {
  return (
    <Box bgcolor={grayColor} height={'100%'} >
<Typography p={'2rem'} variant='h5' textAlign={'center'} >
  Select a friend to chat
</Typography>
    </Box>
  )
}

export default AppLayout(Home);