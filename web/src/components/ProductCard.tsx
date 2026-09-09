import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import type { Product } from '../types/Product'

interface ProductCardProps {
  product: Product
}
export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      {product.image && (
        <CardMedia
          component="img"
          height="220"
          image={product.image}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
      )}
      {!product.image && (
        <Box
          sx={{
            height: 220,
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography color="text.secondary">Ingen bild</Typography>
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom noWrap>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {product.description.length > 80
            ? product.description.slice(0, 80) + '...'
            : product.description}
        </Typography>
        <Typography variant="h6" color="primary">
          {product.price.toLocaleString('sv-SE')} kr
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          size="small"
          variant="outlined"
          component={Link}
          to={`/product/${product.id}`}
        >
          Visa mer
        </Button>
        <Button onClick={() => addToCart(product)} size="small" variant="contained" color="primary">
          Lägg i kundvagn
        </Button>
      </CardActions>
    </Card>
  )
}
