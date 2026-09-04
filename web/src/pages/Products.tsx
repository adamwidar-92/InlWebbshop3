import { Container, Box, Typography } from '@mui/material'

export default function Products() {
  return (
    <Container sx={{ py: 8 }}>
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          Produkter
        </Typography>
      </Box>
    </Container>
  )
}
