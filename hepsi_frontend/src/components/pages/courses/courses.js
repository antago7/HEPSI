import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, CardActions, Button, Typography, Container } from '@mui/material';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books');
        console.log('Fetched books:', response.data);
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
      <Box display="flex" flexWrap="wrap" gap={4} justifyContent="center">
        {books.map((book, index) => (
          <Box key={book.key || index} width="100%" maxWidth={300}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {book.title || "Untitled Book"}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  {book.author ? `Author: ${book.author}` : "Author: Unknown"}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  {`Book Key: ${book.key || "undefined"}`}
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
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleOpen(book.key)}
                >
                  Open
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
