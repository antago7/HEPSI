import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button, Collapse, IconButton, Box, Tab, Tabs, CardMedia } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import threatan from '../../../assets/cybersec/threatan.webp'; 
import Risk from '../../../assets/cybersec/Risk.webp';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const courseDetails = [
    {
        title: "Cybersecurity",
        description: "Dive into threat analysis, risk management, and cybersecurity protocols.",
        moreInfo: "Gain insights into data protection, risk assessment, encryption, and strategies for defending against cyber threats and securing information systems.",
    }
];

const Cspage = () => {
    const [expanded, setExpanded] = useState(-1);
    const [tabValue, setTabValue] = useState(0);

    const handleExpandClick = (index) => {
        setExpanded(expanded === index ? -1 : index);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Container style={{ marginTop: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Cybersecurity Course Information
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
                Discover in-depth details about our specialized cybersecurity course.
            </Typography>
            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3} mt={4}>
                {courseDetails.map((course, index) => (
                    <Box key={index} width={{ xs: '100%', sm: '48%', md: '30%' }}>
                        <Card sx={{ backgroundColor: '#3a87df' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={threatan} 
                                alt="Cybersecurity Threat Analysis"
                            />
                            <CardContent>
                                <Typography variant="h5" component="div" color="white">
                                    {course.title}
                                </Typography>
                                <Typography variant="body2" color="black">
                                    {course.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                                    Enroll Now
                                </Button>
                                <ExpandMore
                                    expand={expanded === index}
                                    onClick={() => handleExpandClick(index)}
                                    aria-expanded={expanded === index}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Tabs value={tabValue} onChange={handleTabChange} centered>
                                        <Tab label="Overview" />
                                        <Tab label="Key Topics" />
                                        <Tab label="Career Opportunities" />
                                    </Tabs>
                                    {tabValue === 0 && (
                                        <Typography variant="body2" color="textSecondary" mt={2}>
                                            {course.moreInfo}
                                        </Typography>
                                    )}
                                    {tabValue === 1 && (
                                        <Box mt={2}>
                                            <Typography variant="subtitle1">Key Topics</Typography>
                                            <ul>
                                                <li>Data Protection</li>
                                                <li>Encryption Techniques</li>
                                                <li>Risk Management</li>
                                                <li>Network Security</li>
                                            </ul>
                                        </Box>
                                    )}
                                    {tabValue === 2 && (
                                        <Box mt={2}>
                                            <Typography variant="subtitle1">Career Paths</Typography>
                                            <ul>
                                                <li>Security Analyst</li>
                                                <li>Network Security Engineer</li>
                                                <li>Risk Manager</li>
                                                <li>Cybersecurity Consultant</li>
                                            </ul>
                                        </Box>
                                    )}
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default Cspage;
