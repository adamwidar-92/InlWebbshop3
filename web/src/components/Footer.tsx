import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box component="footer"
            sx={{
                backgroundColor: 'primary.main', 
                color: 'primary.contrastText',
                py: 3,
                mt: 'auto'
            }}
        >
            <Container maxWidth="xl">
                <Typography variant="body2" align="center">
                    2026 Prilloteket
                </Typography>
            </Container>
            </Box>
    )
}