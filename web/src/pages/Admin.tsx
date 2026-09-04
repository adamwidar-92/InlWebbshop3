import { Container, Box, Typography } from '@mui/material'

export default function Admin() {
  return (
    <Container sx={{ py: 8 }}>
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          Admin
        </Typography>
      </Box>
    </Container>
  )
}
