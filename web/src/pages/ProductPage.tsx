import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Product } from '../types/Product'

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Produkten hittades inte')
        return res.json()
      })
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error || !product) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">{error || 'Produkten hittades inte'}</Typography>
        <Button component={Link} to="/" sx={{ mt: 2 }}>
          Tillbaka till startsidan
        </Button>
      </Container>
    )
  }

  return (
    <Container sx={{ py: 4 }}>
      <Button component={Link} to="/" sx={{ mb: 3 }}>
        ← Tillbaka
      </Button>

      <Grid container spacing={4}>
        {/* Bild */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{
              width: '100%',
              borderRadius: 2,
              objectFit: 'cover',
              maxHeight: 500,
            }}
          />
        </Grid>

        {/* Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            {product.name}
          </Typography>

          {product.category && (
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {product.category}
            </Typography>
          )}

          <Typography variant="h5" color="primary" sx={{ my: 2 }}>
            {product.price.toLocaleString('sv-SE')} kr
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          <Button variant="contained" size="large">
            Lägg i kundvagn
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}