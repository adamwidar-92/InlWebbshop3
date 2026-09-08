import { Box } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Admin from './pages/Admin'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import Home from './pages/Home'
import Products from './pages/Products'

export default function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  )
}
