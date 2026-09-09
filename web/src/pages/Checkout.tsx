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
          required
          label="E-post"
          name="email"
          type="email"
          autoComplete="email"
        />

        <TextField
          required
          fullWidth
          label="Telefonnummer"
          name="phone"
          type="tel"
          autoComplete="tel"
          helperText="Ange ett svenskt telefonnummer, t.ex. 0701234567 eller +46701234567"
          slotProps={{
            htmlInput: {
              pattern: "(?:0[0-9]{9}|[+]46[0-9]{9})",
            },
          }}
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

