import { Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Order } from '../types/Order'

export default function Confirmation() {
  const { orderNumber } = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  useEffect(() => {
    async function fetchOrder() {
      if (!orderNumber) {
        return
      }
      const response = await fetch(
        `/api/orders/${orderNumber}`,
      )
      const data = (await response.json()) as Order
      setOrder(data)
    }

    fetchOrder()

  }, [orderNumber])


  if (!order) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography>Laddar order.</Typography>
      </Container>
    )
  }
  return (
    <Container sx={{ py: 8 }}>
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          Bekräftelse
        </Typography>
        <Typography>
          Ordernummer: {order.orderNumber}
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Leveransuppgifter
          </Typography>

          <Typography>Namn: {order.customerName}</Typography>
          <Typography>E-post: {order.email}</Typography>
          <Typography>Telefon: {order.phone}</Typography>
          <Typography>Adress: {order.address}</Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Din order
          </Typography>

          {order.items.map((item) => (
            <Box
              key={item.id}
              sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 2 }}
            >
              <Typography sx={{ fontWeight: 'bold' }}>
                {item.product.name}
              </Typography>

              <Typography>Antal: {item.quantity}</Typography>
              <Typography>Pris: {item.price.toFixed(2)} Kr</Typography>
              <Typography>
                Radtotal: {(item.price * item.quantity).toFixed(2)} kr
              </Typography>
            </Box>
          ))}

          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: {order.totalPrice.toFixed(2)} kr
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
