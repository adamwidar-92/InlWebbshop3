import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../types/Product";

interface Props {
  product: Product;
}
export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        sx={{
          height: 320,
          objectFit: "contain",
          backgroundColor: "#f5f5f5",
          p: 2,
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          color="text.primary"
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description.length > 90
            ? product.description.slice(0, 90) + "..."
            : product.description}
        </Typography>

        <Typography variant="h5" color="primary.main">
          {product.price.toLocaleString("sv-SE")} kr
        </Typography>

      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
        <Button
          size="small"
          variant="outlined"
          component={Link}
          to={`/product/${product.id}`}
          fullWidth
        >
          Visa mer
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => addToCart(product)}
          fullWidth
        >
          Lägg i kundvagn
        </Button>
      </CardActions>
    </Card>
  );
}
