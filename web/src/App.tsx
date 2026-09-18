import { Box, ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Admin from './pages/Admin'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import ProductFormPage from './pages/ProductFormPage'
import ProductPage from './pages/ProductPage'
import Products from './pages/Products'
import { theme } from './theme'

export default function App() {
  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flex: 1 }}>
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation/:orderNumber" element={<Confirmation />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/products/new" element={<ProductFormPage />} />
            <Route path="/admin/products/edit/:id" element={<ProductFormPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
        </Box>
        <Footer/>
      </Box>
      </ThemeProvider>
    </BrowserRouter>
  )
}
