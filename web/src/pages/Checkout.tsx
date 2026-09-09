import { Box, Button, Container, TextField, Typography } from '@mui/material'

export default function Checkout() {
  return (
    <Container sx={{ py: 8 }}>
      <Box component="form" sx={{ display: 'grid', gap: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Kassa
        </Typography>

        <TextField
          required
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

        <TextField
          fullWidth
          label="Adress"
          name="address"
          autoComplete="street-address"
        />

        {/*Skickar formuläret och startar validering */}
        <Button type="submit" variant="contained">
          Slutför köp
        </Button>

      </Box>
    </Container>
  )
}

