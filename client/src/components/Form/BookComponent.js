import React from 'react';
import TextField from '@mui/material/TextField';
import FileBase from 'react-file-base64';

const BookComponent = ({ label, name, value, pubValue, onTextChange, onPubChange, onImgDone }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <TextField
        name={name}
        variant="outlined"
        label={label}
        fullWidth
        value={value}
        onChange={onTextChange}
        sx={{ width: 1 / 4, mt: 1 }}
        required={name==="book1"}
      />
      <TextField
        name={`${name}_pub`}
        variant="outlined"
        label={`${label} Publication`}
        fullWidth
        value={pubValue}
        onChange={onPubChange}
        sx={{ width: 1 / 4, mt: 1 }}
        required={name==="book1"}
      />
      <FileBase
        type="file"
        multiple={false}
        onDone={onImgDone}
        style={{ margin: '16px 0px' }}
        required={name==="book1"}
      />
    </div>
  );
};

export default BookComponent;
