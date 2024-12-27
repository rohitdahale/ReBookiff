import { Paper, Typography } from '@mui/material';
import React from 'react';
// import books_404 from '../../images/books_404_gif.gif'
import books_404 from '../../images/books_404_1.png'

const NoSearch = () => {
  return (
      <div style={{ display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <img
          src={books_404}
          alt="Page Not Found"
          style={{ maxWidth: '22%', marginTop: '2rem' }}
        />
        <Typography  fontSize={30} style={{ maxWidth: '30%' ,marginLeft:'5rem'}}>
          No Books found for given<br></br> Search.
          Please search again .
        </Typography>
    </div>
  );
};

export default NoSearch;