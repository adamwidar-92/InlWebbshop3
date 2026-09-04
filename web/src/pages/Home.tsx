import { Box, Typography } from '@mui/material'

export default function Home() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        p: 2,
      }}
    >
      <Box>
        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          Välkommen till InlWebbshop
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Upptäck vårt utvalda sortiment
        </Typography>
      </Box>
    </Box>
  )
}
