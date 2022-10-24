import React, { useState, useEffect } from 'react'
import {
    Grid, Card, CardHeader, FormControl,
    MenuItem, TextareaAutosize, Typography, CardContent, IconButton, InputLabel, Avatar, MenuList, ListItemIcon, ListItemText, Modal
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import Select from '@mui/material/Select';
import Fit1 from "../../img/fit1.jpg";
import Fit2 from "../../img/fit2.jpg";
import Fit3 from "../../img/fit3.jpg";
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExercise } from '../../store/slice/exerciseSlice'
import { addTimer, addSet } from '../../store/slice/exerciseSlice';
import Menu from '@mui/material/Menu';
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper } from '@mui/material';

import InputAddKG from './input/inputAddKG';
import InputAddREPS from './input/inputAddREPS';
import InputAddDistance from './input/inputAddDistance';
import InputAddTime from './input/inputAddTime';
import InputAddNote from './input/inputAddNote';
import InputAddRestTimer from './input/inputAddRestTimer'

import { setNote } from "../../store/slice/setSlice"
import Timer from './input/inputAddRestTimer';
import ButtunDeleteExercise from './buttunDeleteExercise'
import DeleteIcon from '@mui/icons-material/Delete';


const options = [
    'delete',

];

const ITEM_HEIGHT = 48;

const CardSelect = (props) => {

    const dispatch = useDispatch()
    const [REPS, setREPS] = useState()
    const [kg, setKg] = useState()
    const [timer, setTimer] = useState();
    const [count, setCount] = useState(1)
    const [note, setNote] = useState("")
    const list = useSelector(state => state.exercise.list)

    const handleSet = (option) => {
        console.log(option);
        dispatch(addSet(option))
    }

    //   delete 

    const handledelete = (key) => {
        dispatch(deleteExercise(key))
    }

    // note 

    return (
        <div>
            {list?.map((item, ind) =>
                <Card key={item.key} sx={{ maxWidth: 'max', marginTop: 5 }}>
                    <CardHeader className='mt-4 mx-3'
                        avatar={
                            <Avatar className='' aria-label="recipe">
                                <img className='imglist' src={"item?.avatar"} />
                            </Avatar>
                        }
                        action={
                            <button onClick={() => handledelete(item.key)}> <DeleteIcon /> </button>
                        }
                        title={<h1 className='title-card'>{item.fa_title}</h1>}
                    />
                    {/* <button > delete</button> */}
                    <CardContent>

                        <InputAddNote id={item.id} />


                    </CardContent>
                    <Grid container spacing={2} >
                        <Grid xs={2}>
                            <h1 className="m-3 restTimer">
                                <AvTimerIcon /> Rest Timer :
                            </h1>
                        </Grid>
                        <Grid xs={3}>
                            <InputAddRestTimer Id={item.id} />
                        </Grid>
                    </Grid>
                    <Grid xs={7}></Grid>
                    {/* card place   */}

                    <TableContainer sx={{ width: "100%" }} component={Paper}>
                        <Table className='mr-0 ml-0' size="meduim" aria-label="a dense table">
                            <TableHead>
                                <TableRow className='' >
                                    <TableCell className="input-title" align="center"><h2>SET</h2> </TableCell>
                                    {item.type.map((type) => <TableCell className="input-title" align="center"><h2>{type.title}</h2></TableCell>)}
                                    {/* <TableCell className="input-title" align="center"></TableCell>  */}
                                </TableRow>
                            </TableHead>
                            {item?.sets?.map((set, ind) =>
                                <TableBody key={set.key} >
                                    <TableRow >
                                        <TableCell align="center" > {ind + 1}</TableCell>
                                        {item.type.map((type) =>
                                            (type.id == 1) ?
                                                <TableCell align="center">
                                                    <InputAddKG Id={item.key} Index={ind} />
                                                </TableCell>
                                                :
                                                type.id == 2 ?
                                                    <TableCell align="center">
                                                        <InputAddDistance Id={item.key} Index={ind} />
                                                    </TableCell> 
                                                    :
                                                    type.id == 3 ?
                                                        <TableCell align="center">
                                                            <InputAddREPS Id={item.key} Index={ind} />
                                                        </TableCell>
                                                         :
                                                        type.id == 4 ?
                                                            <TableCell align="center">
                                                                <InputAddTime Id={item.key} Index={ind} />
                                                            </TableCell> 
                                                            : ''
                                        )
                                        }
                                    </TableRow>
                                </TableBody>
                            )}

                        </Table>
                    </TableContainer >
                    <Grid sx={{ my: 3 }} xs={12} >
                        <Button onClick={() => handleSet(item.key)} size={'large'} variant="outlined">+ Add Set</Button>
                    </Grid>
                </Card>
            )
            }
        </div>
    )
}

export default CardSelect




















