import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

import {Table,TableCell,TableContainer,TableHead ,TableBody ,TableRow ,Paper} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const AddSet = () => {

  const countList = useSelector(state => state.counter.value)

  const [kg, setKg] = useState(0)
  const handleInputKg = (e) => {
    setKg(e.target.value)
  }
  const [REPS, setREPS] = useState(0)
  const handleInputREPS = (e) => {
    setREPS(e.target.value)
  }

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
      {countList.map((option) => 
        <TableContainer key={option.key} sx={{ width: "100%" }} component={Paper}>
          <Table  className='mr-0 ml-0' sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
          <TableBody>
            <TableRow  >
              <TableCell align="center" > {option.count}</TableCell>
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
