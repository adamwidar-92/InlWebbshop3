import { Button, Container, Stack, Typography } from "@mui/material";
import { Link } from 'react-router-dom';



export default function NotFound() {
    return (
        <Container
            maxWidth="sm"
            sx={{
                py: 8,
                textAlign: 'center',
            }}
        >
            <Stack spacing={3} sx={{ alignItems: "center" }}>
                <Typography variant="h2" component="h1">
                    404
                </Typography>

                <Typography variant="h5">
                    Sidan kunde inte hittas
                </Typography>

                <Button component={Link} to="/" variant="contained">
                    Till startsidan
                </Button>
            </Stack>
            </Container>
    )
}