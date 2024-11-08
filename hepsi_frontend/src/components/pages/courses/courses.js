import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, CardActions, Button, Typography, Container } from '@mui/material';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
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
    } catch (error) {
      console.error('Error downloading book:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Book Library
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={4} justifyContent="center">
        {books.map((book) => (
          <Box key={book.key} width="100%" maxWidth={300}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {/* Ensure that book.key is defined before calling replace */}
                  {book.key ? book.key.replace('.pdf', '') : 'Untitled Book'}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  {`Book Key: ${book.key}`}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDownload(book.key)}
                >
                  Download
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default BookList;
