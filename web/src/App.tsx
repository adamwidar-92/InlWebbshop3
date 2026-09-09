import { Box } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Admin from './pages/Admin'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import Products from './pages/Products'

export default function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  )
}
