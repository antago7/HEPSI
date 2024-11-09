import React from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import { GitHub, LinkedIn, Instagram, Telegram, WhatsApp } from '@mui/icons-material';

const socialLinks = [
    {
        name: 'Telegram',
        icon: <Telegram />,
        url: 'https://telegram.org'
    },
    {
        name: 'WhatsApp',
        icon: <WhatsApp />,
        url: 'https://www.whatsapp.com'
    },
    {
        name: 'Instagram',
        icon: <Instagram />,
        url: 'https://www.instagram.com'
    },
    {
        name: 'GitHub',
        icon: <GitHub />,
        url: 'https://github.com'
    },
    {
        name: 'LinkedIn',
        icon: <LinkedIn />,
        url: 'https://www.linkedin.com'
    }
];

const ContactPage = () => {
    return (
        <Container style={{ marginTop: '40px', paddingBottom: '40px' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
                Contact Us
            </Typography>
            <Typography variant="body1" align="center" paragraph>
                Connect with us on social media and stay updated with the latest news!
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {socialLinks.map((link, index) => (
                    <Grid item xs={6} sm={3} key={index}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={link.icon}
                            fullWidth
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                padding: '12px 20px',
                                fontSize: '1rem',
                                textTransform: 'none',
                                backgroundColor: '#1976d2',
                                '&:hover': {
                                    backgroundColor: '#115293',
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                },
                                '&:active': {
                                    backgroundColor: '#0c4c8f',
                                },
                            }}
                        >
                            {link.name}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ContactPage;
