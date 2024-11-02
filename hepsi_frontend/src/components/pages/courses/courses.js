import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Typography, Container, Box, Collapse, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './courses.css'; 

const CoursePage = () => {
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false); 
    const navigate = useNavigate(); 

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setOpen(true); 
    };

    const renderCourseDescription = () => {
        switch (value) {
            case 0:
                return (
                    <div className="course-description">
                        <Typography variant="body1">
                            <strong>DevOps</strong>: This course covers the essential concepts and practices of DevOps,
                            focusing on collaboration, automation, and continuous integration and deployment (CI/CD).
                        </Typography>
                    </div>
                );
            case 1:
                return (
                    <div className="course-description">
                        <Typography variant="body1">
                            <strong>Network Engineering</strong>: This course provides an overview of network design, 
                            configuration, and management, with an emphasis on troubleshooting and security best practices.
                        </Typography>
                    </div>
                );
            case 2:
                return (
                    <div className="course-description">
                        <Typography variant="body1">
                            <strong>Cybersecurity</strong>: This course explores the fundamentals of cybersecurity, 
                            including threat analysis, risk management, and security protocols to protect sensitive information.
                        </Typography>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Container>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} variant="fullWidth">
                    <Tab label="DevOps" />
                    <Tab label="Network Engineering" />
                    <Tab label="Cybersecurity" />
                </Tabs>
            </AppBar>
            <Box p={3}>
                <Typography variant="h5" gutterBottom>
                    {value === 0 && "DevOps"}
                    {value === 1 && "Network Engineering"}
                    {value === 2 && "Cybersecurity"}
                </Typography>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box mt={2}>
                        {renderCourseDescription()}
                    </Box>
                </Collapse>
                <Button onClick={() => setOpen(false)} variant="outlined" color="primary" style={{ marginTop: '20px' }}>
                    Close Description
                </Button>
                <Button onClick={() => navigate('/')} variant="contained" color="secondary" style={{ marginTop: '20px', marginLeft: '10px' }}>
                    Back to Home
                </Button>
            </Box>
        </Container>
    );
};

export default CoursePage;