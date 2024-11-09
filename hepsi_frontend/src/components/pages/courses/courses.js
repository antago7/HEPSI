import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, CardActions, Button, Typography, Container, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books');
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDownload = async (key) => {
    try {
      const response = await axios.get(`http://localhost:3000/books/${key}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', key);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading book:', error);
    }
  };

  const handleOpen = (key) => {
    window.open(`http://localhost:3000/books/${key}`, '_blank');
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Book Library
      </Typography>

      {/* Display loading spinner if books are being fetched */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={4} justifyContent="center">
          {books.map((book, index) => (
            <motion.div
              key={book.key || index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Box width="100%" maxWidth={300}>
                <Card elevation={3} sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }}>
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      {book.title || 'Untitled Book'}
                    </Typography>
                    <Typography color="textSecondary" variant="body2" sx={{ marginBottom: 1 }}>
                      {book.author ? `Author: ${book.author}` : 'Author: Unknown'}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {`Book Key: ${book.key || 'undefined'}`}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginRight: 1 }}
                      onClick={() => handleDownload(book.key)}
                    >
                      Download
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleOpen(book.key)}>
                      Open
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            </motion.div>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default BookList;
