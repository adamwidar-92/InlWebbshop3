import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Alert, Box, Button, Container, IconButton, TextField, Typography } from '@mui/material'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart()

  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [idempotencyKey] = useState(() => {
    const savedKey = sessionStorage.getItem('checkoutKey')

    if (savedKey) {
      return savedKey
    }

    const newKey = crypto.randomUUID()
    sessionStorage.setItem('checkoutKey', newKey)
    return newKey
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting || items.length === 0) {
      return
    }

    const formData = new FormData(event.currentTarget)

    const orderData = {
      idempotencyKey: idempotencyKey,
      customerName: String(formData.get('customerName') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
      address: String(formData.get('address') ?? '').trim(),
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,


      })),
    }

    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })
      if (!response.ok) {
        throw new Error('Beställningen kunde inte genomföras')
      }
      const createdOrder = await response.json()
      clearCart()
      sessionStorage.removeItem('checkoutKey')

      navigate(`/confirmation/${createdOrder.orderNumber}`, {
        replace: true,
      })
    } catch {
      setErrorMessage('Beställningen misslyckades. Försök igen.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
                  <Box component='img' src={item.image} alt={item.name} sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }} />
                )}
                <Box>
                  <Typography sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)} size="small" disabled={item.quantity <= 1} aria-label="Minska antal" sx={{ border: 1, borderColor: 'divider' }}>
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography>Antal: {item.quantity}</Typography>
                    <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)} size="small" aria-label="Öka antal" sx={{ border: 1, borderColor: 'divider' }}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography>Pris: {item.price} kr/st</Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Summa: {item.price * item.quantity} kr
                </Typography>
                <Button onClick={() => removeFromCart(item.id)} color="error" size="small">
                  Ta bort
                </Button>
              </Box>
            </Box>
          ))
        )}

        {items.length > 0 && (
          <Typography variant="h6" sx={{ textAlign: 'right', mt: 2, fontWeight: 'bold' }}>
            Totalt: {totalPrice.toLocaleString('sv-SE', {
              maximumFractionDigits: 3
            })} kr
          </Typography>
        )}

      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'grid', gap: 2 }}
      >
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
        {errorMessage && (
          <Alert severity="error">
            {errorMessage}
          </Alert>
        )}


        <Button type="submit"
          variant="contained"
          disabled={isSubmitting || items.length === 0}
        >
          {isSubmitting ? 'Skickar beställning...' : 'Slutför köp'}
        </Button>

      </Box>
    </Container>
  )
}
