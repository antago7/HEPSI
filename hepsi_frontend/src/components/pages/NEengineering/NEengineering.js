import React from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button, Collapse, IconButton, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';


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
        title: "Network Engineering",
        description: "Learn about network design, configuration, and security best practices.",
        moreInfo: "This course covers networking fundamentals, routing protocols, troubleshooting, and network security practices to keep your systems secure and efficient.",
    },
];

const NEpage = () => {
    const [expanded, setExpanded] = React.useState(-1);

    const handleExpandClick = (index) => {
        setExpanded(expanded === index ? -1 : index);
    };

    return (
        <Container style={{ marginTop: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Course Information
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
                Discover in-depth details about our specialized courses.
            </Typography>
            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3} mt={4}>
                {courseDetails.map((course, index) => (
                    <Box key={index} width={{ xs: '100%', sm: '48%', md: '30%' }}>
                        <Card sx={{backgroundColor: '#3a87df'}}>
                            <CardContent>
                                <Typography variant="h5" component="div" color='white'>  
                                    {course.title}
                                </Typography>
                                <Typography variant="body2" color="black">
                                    {course.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Button variant="outlined" color="white">
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
                                    <Typography variant="body2" color="textSecondary">
                                        {course.moreInfo}
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default NEpage;
