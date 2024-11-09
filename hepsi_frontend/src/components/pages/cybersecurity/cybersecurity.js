import React, { useState } from 'react';
import { Container, Typography, Box, Button, Paper, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import './cybersecurity.css';

const HeroSection = styled(Box)({
    position: 'relative',
    height: '100vh',
    background: 'url("background.jpg") no-repeat center center fixed', // Set video or image here
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
});

const CourseCard = styled(Card)({
    backgroundColor: '#3a87df',
    color: 'white',
    borderRadius: '12px',
    padding: '16px',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
    },
});

const AnimationWrapper = styled(motion.div)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: -1, 
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, #ff6b6b, #f06595, #6a5acd)',
    backgroundSize: '400% 400%',
    animation: 'gradientAnimation 5s ease infinite',
});

const Cspage = () => {
    const [expanded, setExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleTabChange = (index) => {
        setActiveTab(index);
    };

    return (
        <>
            {/* Hero Section */}
            <HeroSection>
                {/* Animated Background */}
                <AnimationWrapper
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />
                {/* Text Section */}
                <Box position="relative" zIndex={1}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                        <Typography variant="h2" align="center" gutterBottom>
                            Unlock the World of Cybersecurity
                        </Typography>
                        <Typography variant="h5" align="center" gutterBottom>
                            Master the skills to protect data and systems from cyber threats.
                        </Typography>
                        <Button variant="contained" color="secondary" size="large">
                            Enroll Now
                        </Button>
                    </motion.div>
                </Box>
            </HeroSection>

            {/* Course Overview */}
            <Container>
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={4}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Course Overview
                    </Typography>
                    <Box display="flex" justifyContent="space-around" flexWrap="wrap" mt={2}>
                        {/* Course Card 1 */}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <CourseCard sx={{ width: '300px', marginBottom: 4 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="cybersecurity-image.jpg"
                                    alt="Cybersecurity"
                                />
                                <CardContent>
                                    <Typography variant="h5">What You'll Learn</Typography>
                                    <Typography variant="body2">
                                        Learn how to secure networks, data, and systems from cyberattacks.
                                    </Typography>
                                </CardContent>
                            </CourseCard>
                        </motion.div>

                        {/* Course Card 2 */}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <CourseCard sx={{ width: '300px', marginBottom: 4 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="threat-analysis.jpg"
                                    alt="Threat Analysis"
                                />
                                <CardContent>
                                    <Typography variant="h5">Advanced Topics</Typography>
                                    <Typography variant="body2">
                                        Dive into threat analysis, encryption, and securing critical infrastructure.
                                    </Typography>
                                </CardContent>
                            </CourseCard>
                        </motion.div>
                    </Box>
                </Box>
            </Container>

            {/* Interactive Content with Tabs */}
            <Container>
                <Box display="flex" justifyContent="center" gap={2} mt={4}>
                    <Button
                        variant={activeTab === 0 ? 'contained' : 'outlined'}
                        color="primary"
                        onClick={() => handleTabChange(0)}
                    >
                        Course Topics
                    </Button>
                    <Button
                        variant={activeTab === 1 ? 'contained' : 'outlined'}
                        color="primary"
                        onClick={() => handleTabChange(1)}
                    >
                        Career Opportunities
                    </Button>
                </Box>

                <Box mt={4}>
                    {activeTab === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                            <Typography variant="h5" gutterBottom>
                                Key Course Topics
                            </Typography>
                            <ul>
                                <li>Network Security</li>
                                <li>Risk Management</li>
                                <li>Cryptography & Data Protection</li>
                                <li>Ethical Hacking & Penetration Testing</li>
                            </ul>
                        </motion.div>
                    )}

                    {activeTab === 1 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                            <Typography variant="h5" gutterBottom>
                                Career Paths in Cybersecurity
                            </Typography>
                            <ul>
                                <li>Security Analyst</li>
                                <li>Penetration Tester</li>
                                <li>Network Security Engineer</li>
                                <li>Cybersecurity Consultant</li>
                            </ul>
                        </motion.div>
                    )}
                </Box>
            </Container>

            <Box display="flex" justifyContent="center" mt={5}>
                <Button variant="contained" size="large" color="secondary">
                    Enroll Now and Start Your Cybersecurity Journey
                </Button>
            </Box>
        </>
    );
};

export default Cspage;
