import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import { Box, Container, Grid, Link, Stack, Typography } from '@mui/material'
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
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} gutterBottom>
                            Snabblänkar
                        </Typography>
                        <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
                            <Link component={RouterLink} to="/" underline="hover" color="inherit" sx={{ opacity: 0.9 }}>
                                Startsida
                            </Link>
                            <Link component={RouterLink} to="/checkout" underline="hover" color="inherit" sx={{ opacity: 0.9 }}>
                                Kundvagn
                            </Link>
                            <Link component={RouterLink} to="/admin" underline="hover" color="inherit" sx={{ opacity: 0.9 }}>
                                Adminpanel
                            </Link>
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} gutterBottom>
                            Kontakt
                        </Typography>
                        <Stack spacing={1.5}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.9 }}>
                                <LocationOnIcon fontSize="small" />
                                <Typography variant="body2">
                                    YRKESHÖGSKOLAN BORÅS SWEDEN
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.9 }}>
                                <PhoneIcon fontSize="small" />
                                <Link href="tel:0812345678" underline="hover" color="inherit" variant="body2">
                                    08-123 456 78
                                </Link>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.9 }}>
                                <EmailIcon fontSize="small" />
                                <Link href="mailto:kontakt@prilloteket.se" underline="hover" color="inherit" variant="body2" sx={{ overflowWrap: 'anywhere', minWidth: 0 }}>
                                    kontakt@prilloteket.se
                                </Link>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
                <Typography variant="body2" align="center">
                    2026 Prilloteket
                </Typography>
            </Container>
            </Box>
    )
}
