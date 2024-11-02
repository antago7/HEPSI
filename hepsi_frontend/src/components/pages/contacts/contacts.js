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
        <Container style={{ marginTop: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Contact Us
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
                Connect with us on social media!
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