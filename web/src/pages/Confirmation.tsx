import { Box, Container, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
export default function Confirmation() {
  const { orderNumber } = useParams()
  return (
    <Container sx={{ py: 8 }}>
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          Bekräftelse
        </Typography>
        <Typography>
          Ordernummer: {orderNumber}
        </Typography>
      </Box>
    </Container>
  )
}
