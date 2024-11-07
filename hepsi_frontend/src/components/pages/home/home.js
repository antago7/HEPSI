import React from 'react';
import { Link } from 'react-router-dom'; 
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import './home.css';

const HomePage = () => {
    return (
        <div className="home-container">
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" className="logo" style={{ flexGrow: 1 }}>
                        HEPSI Online Platform
                    </Typography>
                    <Button component={Link} to="/courses" color="inherit">Courses</Button>
                    <Button component={Link} to="/contacts" color="inherit">Contacts</Button>
                    <Button component={Link} to="/auth" color="inherit">Auth</Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" className="main-content">
                <section className="intro-section">
                    <Typography variant="h4" gutterBottom>
                        Start Learning Programming
                    </Typography>
                    <Typography variant="body1" color="white" gutterBottom>
                        Enhance your skills and dive into the world of coding with our specialized courses.
                    </Typography>
                    <div className="button-group">
                        <Button variant="contained" color="primary" style={{ marginRight: '20px' }}>
                            Start Education
                        </Button>
                        <Button variant="outlined" color="secondary">
                            See More
                        </Button>
                    </div>
                </section>

                <section className="courses-section" id="courses">
                    <Typography variant="h5" gutterBottom>
                        Our Courses
                    </Typography>
                    <Box display="flex" flexWrap="wrap" justifyContent="space-between" spacing={2}>
                        <Box width={{ xs: '100%', sm: '30%' }} marginBottom={2}>
                            <div className="course-card">DevOps</div>
                        </Box>
                        <Box width={{ xs: '100%', sm: '30%' }} marginBottom={2}>
                            <div className="course-card">Network Engineer</div>
                        </Box>
                        <Box width={{ xs: '100%', sm: '30%' }} marginBottom={2}>
                            <div className="course-card">Cybersecurity</div>
                        </Box>
                    </Box>
                </section>

                <footer className="footer" id="contacts">
                    <Typography variant="body2">
                        <a href="https://github.com/antago7" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </Typography>
                </footer>
            </Container>
        </div>
    );
};

export default HomePage;