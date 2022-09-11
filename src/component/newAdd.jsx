
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import newAdd from './newAdd';
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const AddFor = () => {


    const countList = useSelector(state => state.counter.value)
    const list = useSelector(state => state.exercise.list)
    console.log(list);
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
    // for (let i = 0; i < newList; i++)
    return (
        <div>
            <TableContainer key={'item.id'} sx={{ width: "100%" }} component={Paper}>
                <Table className='mr-0 ml-0' sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                    <TableBody>
   <TableRow  >
       <TableCell align="center" > </TableCell>
       <TableCell align="center"><h3>{`${kg} kg ${REPS}`}</h3></TableCell>
       <TableCell align="right"><input variant="filled" onChange={handleInputKg} value={kg} className='inputCard' type='number'>
       </input></TableCell>
       <TableCell align="right"><input variant="filled" onChange={handleInputREPS} value={REPS} className='inputCard' type='number'>
       </input></TableCell>
       <TableCell align="right"><Checkbox {...label} defaultChecked color="success" /></TableCell>
   </TableRow>
                    </TableBody>
                </Table>
            </TableContainer >
        </div>
    )

}
export default AddFor 