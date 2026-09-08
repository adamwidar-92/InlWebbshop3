import { Box, Container, TextField, Typography } from '@mui/material'

export default function Checkout() {
  return (
    <Container sx={{ py: 8 }}>
      <Box component="form" sx={{ display: 'grid', gap: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Kassa
        </Typography>

        <TextField
          fullWidth
          label="Namn"
          name="customerName"
          autoComplete="name"
        />

        <TextField
          fullWidth
          label="E-post"
          name="email"
          type="email"
          autoComplete="email"
        />

        <TextField
          fullWidth
          label="Telefonnummer"
          name="phone"
          type="tel"
          autoComplete="tel"
        />
      </Box>
    </Container>
  )
}

