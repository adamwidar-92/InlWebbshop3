import { Box, Container, Grid, Link, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function Footer() {
    return (
        <Box component="footer"
            sx={{ backgroundColor: '#64705c', color: '#ffffff', pt: 5, pb: 3, mt: 'auto' }}
        >
            <Container maxWidth="xl">
                <Grid container spacing={4} sx={{ justifyContent: 'space-between', textAlign: 'left' }}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Link component={RouterLink} to="/" underline="none" color="inherit" sx={{ display: 'inline-block', mb: 1.5 }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                Prilloteket
                            </Typography>
                        </Link>
                        <Typography variant="body2" sx={{ opacity: 0.9, maxWidth: 300 }}>
                            Din lokala leverantör av kvalitetssnus. Vi levererar alltid färska produkter snabbt och smidigt.
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="body2" align="center">
                    2026 Prilloteket
                </Typography>
            </Container>
            </Box>
    )
}
