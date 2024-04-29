import { Error } from '@mui/icons-material'
import { Container, Link, Stack, Typography } from '@mui/material'
import React from 'react'

function NotFound() {
  return (
    <Container>
      <Stack alignContent={'center'} textAlign={'center'} justifyContent={'center'}>
        <Error />
        <Typography>404</Typography>
        <Typography>NotFound</Typography>
        <Link to='/'>Go Back To Home</Link>
      </Stack>
    </Container>
  );
}

export default NotFound