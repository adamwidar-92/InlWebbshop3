import { Box, Container, TextField, Typography } from '@mui/material'

export default function Checkout() {
  return (
    <Container sx={{ py: 8 }}>
      <Box component="form">
        <Typography variant="h3" component="h1" gutterBottom>
          Kassa
        </Typography>

        <TextField
          fullWidth
          label="Namn"
          name="customerName"
          autoComplete="name"
        />
      </Box>
    </Container>
  )
}

