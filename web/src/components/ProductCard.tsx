<<<<<<< HEAD
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
=======
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material'
import { Link } from 'react-router-dom'
>>>>>>> feature/products-seed
import type { Product } from '../types/Product'

interface Props {
  product: Product
}
<<<<<<< HEAD
export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

=======

export default function ProductCard({ product }: Props) {
>>>>>>> feature/products-seed
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="220"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.description.length > 90
            ? product.description.slice(0, 90) + '...'
            : product.description}
        </Typography>
        <Typography variant="h6" color="primary">
          {product.price.toLocaleString('sv-SE')} kr
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={Link}
          to={`/product/${product.id}`}
        >
          Visa mer
        </Button>
<<<<<<< HEAD
        <Button onClick={() => addToCart(product)} size="small" variant="contained" color="primary">
=======
        <Button size="small" variant="contained">
>>>>>>> feature/products-seed
          Lägg i kundvagn
        </Button>
      </CardActions>
    </Card>
  )
}
