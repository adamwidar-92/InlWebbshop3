import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// MUI
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { CartProvider } from './context/CartContext'


const theme = createTheme({
  // Här kan vi senare ändra färger, typografi osv om vi vill
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Tar bort standard-styling och sätter bra defaults */}
      <CartProvider>
      <App />
      </CartProvider>
    </ThemeProvider>
  </StrictMode>,
)