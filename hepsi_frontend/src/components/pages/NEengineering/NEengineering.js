import React, { useState } from 'react';
import { Container, Typography, Box, Button, Paper, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import './NEengineering.css';

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
    background: 'linear-gradient(45deg, #e64bd2, #f21824, #971dff)',
    backgroundSize: '400% 400%',
    animation: 'gradientAnimation 5s ease infinite',
});

const NEpage = () => {
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
            <HeroSection>
                <AnimationWrapper
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />
                <Box position="relative" zIndex={1}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                        <Typography variant="h2" align="center" gutterBottom>
                            What about network engineering?
                        </Typography>
                        <Typography variant="h5" align="center" gutterBottom>
                            A Network Engineer is responsible for designing, implementing, managing, and troubleshooting computer networks within an organization. These networks can be local area networks (LANs), wide area networks (WANs),
                            cloud networks, or hybrid infrastructures.
                        </Typography>
                        <Button variant="contained" color="secondary" size="large">
                            Enroll Now
                        </Button>
                    </motion.div>
                </Box>
            </HeroSection>
            <Container>
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={4}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Course Overview
                    </Typography>
                    <Box display="flex" justifyContent="space-around" flexWrap="wrap" mt={2}>
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
                                        Network engineers ensure that all devices, systems, and applications can
                                        communicate effectively and securely across the network.
                                    </Typography>
                                </CardContent>
                            </CourseCard>
                        </motion.div>

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
                                        Dive into the networking engineering.
                                    </Typography>
                                </CardContent>
                            </CourseCard>
                        </motion.div>
                    </Box>
                </Box>
            </Container>


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
                                <li>Network Design</li>
                                <li>Network Installation and Configuration</li>
                                <li>Network Maintenance</li>
                                <li> Network Security</li>
                            </ul>
                        </motion.div>
                    )}

                    {activeTab === 1 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                            <Typography variant="h5" gutterBottom>
                                Career Paths in network engineering
                            </Typography>
                            <ul>
                                <li>Network Engineer</li>
                                <li>Network Administrator</li>
                                <li>Network Security Engineer</li>
                                <li>Wireless Network Engineer</li>
                            </ul>
                        </motion.div>
                    )}
                </Box>
            </Container>

            <Box display="flex" justifyContent="center" mt={5}>
                <Button variant="contained" size="large" color="secondary">
                    Enroll Now and Start Your Journey in Network Engineering
                </Button>
            </Box>
        </>
    );
};

export default NEpage;
