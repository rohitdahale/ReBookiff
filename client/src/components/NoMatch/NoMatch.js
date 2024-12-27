import { Paper } from '@mui/material';
import React from 'react';
import img_404 from '../../images/404_img.jpg'

const NoMatch = () => {
  return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <img
          src={img_404}
          alt="Page Not Found"
          style={{ maxWidth: '50%', marginTop: '2rem' }}
        />
    </div>
  );
};

export default NoMatch;