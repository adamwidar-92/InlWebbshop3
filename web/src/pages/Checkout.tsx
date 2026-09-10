import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const { items } = useCart()

  let totalPrice = 0

  items.forEach((item) => {
    totalPrice = totalPrice + item.price * item.quantity
  })

  return (
    <Container sx={{ py: 8 }}>
      <Box component="section" sx={{ mb: 5 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Din kundvagn
        </Typography>

      {items.length === 0 ? (
        <Typography>
          Din kundvagn är tom
        </Typography>
        ) : (
        items.map((item) => (
          <Box key={item.id} sx={{
            display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' }, gap: 2, py: 2, borderBottom: 1, borderColor: 'divider'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {item.image && (
                <Box component='img' src={item.image} alt={item.name} sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1}}/>
              )}
              <Box>
                <Typography sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                <Typography>Antal: {item.quantity}</Typography>
                <Typography>Pris: {item.price} kr/st</Typography>
              </Box>
            </Box>
            <Typography sx={{ fontWeight: 'bold', textAlign: 'right'}}>
              Summa: {item.price * item.quantity} kr</Typography>
          </Box>
        ))
        )}

        {items.length > 0 && (
          <Typography variant="h6" sx={{ textAlign: 'right', mt: 2, fontWeight: 'bold' }}>
            Totalt: {totalPrice} kr
          </Typography>
        )}

      </Box>
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
          required
          fullWidth
          label="Adress"
          name="address"
          autoComplete="street-address"
          helperText="Ange gata och gatunummer"
          slotProps={{
            htmlInput: {
              minLength: 5,
            },
          }}
        />

        {/*Skickar formuläret och startar validering */}
        <Button type="submit" variant="contained">
          Slutför köp
        </Button>

      </Box>
    </Container>
  )
}
