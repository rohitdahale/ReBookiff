import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';


const SubjectTable = ({rows,setMainImage}) => {

  return (
    <TableContainer component={Paper} sx={{backgroundColor:'#fff5d1'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Serial No.</TableCell>
            <TableCell align="center">Subject Name</TableCell>
            <TableCell align="center">Book Publication</TableCell>
            <TableCell align="center">Book Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            row.book_name ?(
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center' component="th" scope="row">
                {row.sr_num}
              </TableCell>
              <TableCell align="center">{row.book_name}</TableCell>
              <TableCell align="center">{row.book_pub ||  '–'}</TableCell>
              <TableCell align="center"><Button onClick={()=>setMainImage(row.book_img)} disabled={!row.book_img}>Click Me</Button></TableCell>
            </TableRow>
            ) : null
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubjectTable;
