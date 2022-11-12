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
import { addTimer, addSet } from '../../store/slice/exerciseSlice';
import Menu from '@mui/material/Menu';
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper } from '@mui/material';

import InputAddKG from './input/inputAddKG';
import InputAddREPS from './input/inputAddREPS';
import InputAddDistance from './input/inputAddDistance';
import InputAddTime from './input/inputAddTime';
import InputAddNote from './input/inputAddNote';
import InputAddRestTimer from './input/inputAddRestTimer'

import ButtunDeleteExercise from './buttunDeleteExercise'
import DeleteIcon from '@mui/icons-material/Delete';
import ExampleCard from './exampleCard';


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
        dispatch(addSet(option))
    }



    return (
        <div>
            {list?.map((item, ind) =>
                <Card key={item.key} sx={{ maxWidth: 700, marginTop: 5 }}>
                    <CardHeader className='mt-4 mx-3'
                        avatar={
                            <Avatar className='' aria-label="recipe">
                                <img className='imglist' src={"item?.avatar"} />
                            </Avatar>
                        }
                        action={<ExampleCard seperator={1} Id={item.key} />}
                        title={<h1 className='title-card'>{item.fa_title}</h1>}
                    />
                    {/* <button > delete</button> */}
                    <CardContent>

                        <InputAddNote separator={1} Id={item.key} />

                    </CardContent>
                    <div className='restTimer' xs={12}>
                        <InputAddRestTimer separator={1} Id={item.key}  />
                        <h1 className="m-3 restTimerTitle ">
                            <AvTimerIcon />  <h2>: Rest Timer</h2>
                        </h1>
                    </div>

                    <TableContainer sx={{ width: "100%" }} component={Paper}>
                        <Table className='mr-0 ml-0' size="meduim" aria-label="a dense table">
                            <TableHead>
                                <TableRow className='' >
                                    <TableCell className="input-title" align="center"><h2>SET</h2> </TableCell>
                                    {item.type.map((type) => <TableCell className="input-title" align="center"><h2>{type.title}</h2></TableCell>)}
                                    {/* <TableCell className="input-title" align="center"></TableCell>  */}
                                </TableRow>
                            </TableHead>
                            {item?.sets?.map((set, indexSet) =>
                                <TableBody key={set?.key} >
                                    <TableRow >
                                        <TableCell align="center" > {indexSet + 1}</TableCell>
                                        {item.type.map((type, Ind) =>
                                            (type.id == 1) ?
                                                <TableCell align="center">
                                                    <InputAddKG Id={item.key} separator={1} Ind={Ind} IndexSet={indexSet} />
                                                </TableCell>
                                                :
                                                type.id == 2 ?
                                                    <TableCell align="center">
                                                        <InputAddDistance Id={item.key} separator={1} Ind={Ind} IndexSet={indexSet} />
                                                    </TableCell>
                                                    :
                                                    type.id == 3 ?
                                                        <TableCell align="center">
                                                            <InputAddREPS Id={item.key} separator={1} Ind={Ind} IndexSet={indexSet} />
                                                        </TableCell>
                                                        :
                                                        type.id == 4 ?
                                                            <TableCell align="center">
                                                                <InputAddTime Id={item.key} separator={1} Ind={Ind} IndexSet={indexSet} />
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




















