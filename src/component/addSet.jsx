import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import newAdd from './newAdd';
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AddFor from './newAdd';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const AddSet = () => {

  const countList = useSelector(state => state.counter.value)
  const list = useSelector(state => state.exercise.list)

  const [kg, setKg] = useState(0)
  const handleInputKg = (e) => {
    setKg(e.target.value)
  }
  const [REPS, setREPS] = useState(0)
  const handleInputREPS = (e) => {
    setREPS(e.target.value)
  }

  const newList = list.map((item) => item.set)

  console.log(newList)
  // newList.map((item) => item)
  // const ADD = []
    // for (let i = 0; i < newList; i++) {
      // ADD.push(<AddFor />)
    // }
//  


  return (
    <div>

      <TableContainer sx={{ width: "100%" }} component={Paper}>
        <Table className='mr-0 ml-0' size="meduim" aria-label="a dense table">
          <TableHead>
            <TableRow className='' >
              <TableCell align="center">SET</TableCell>
              <TableCell align="left">PREVIOUS</TableCell>
              <TableCell align="left">+KG</TableCell>
              <TableCell align="left">RESE</TableCell>
              <TableCell align="right"><CheckIcon /></TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer >

      {/* <div style={{ width: "100%" }} > {ADD}</div> */}



    </div>
  )
}

export default AddSet
