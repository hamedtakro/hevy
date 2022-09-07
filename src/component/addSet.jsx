import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const AddSet = () => {

  const list = useSelector(state => state.exercise.list)
  const countList = useSelector(state => state.counter.value)

  const keyList = list.map((item) => item.key)
  const keyTak = 1

  const [kg, setKg] = useState(0)
  const handleInputKg = (e) => {
    setKg(e.target.value)
  }
  const [REPS, setREPS] = useState(0)
  const handleInputREPS = (e) => {
    setREPS(e.target.value)
  }


 const newList = list.filter(item => item.set ==1)
console.log(newList)
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
      {list.map((option) => 
        <TableContainer key={option.key} sx={{ width: "100%" }} component={Paper}>
          <Table  className='mr-0 ml-0' sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
          <TableBody>
            <TableRow  >
              <TableCell align="center" > {option.set}</TableCell>
              <TableCell align="center"><h3>{`${kg} kg ${REPS}`}</h3></TableCell>
              <TableCell align="right"><input variant="filled"  onChange={handleInputKg} value={kg} className='inputCard' type='number'></input></TableCell>
              <TableCell align="right"><input variant="filled"  onChange={handleInputREPS} value={REPS} className='inputCard' type='number'></input></TableCell>
              <TableCell align="right"><Checkbox {...label} defaultChecked color="success" /></TableCell>
            </TableRow>
            </TableBody>
          </Table>
        </TableContainer >
      )}


    </div>
  )
}

export default AddSet
