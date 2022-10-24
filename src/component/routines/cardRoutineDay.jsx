import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
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
import { addSet, addTimer } from '../../store/slice/exerciseSlice';
import Menu from '@mui/material/Menu';
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper } from '@mui/material';
import ButtunDeleteExercise from './buttunDeleteExercise'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBox from './checkBox';
import CheckIcon from '@mui/icons-material/Check';
import { setExercise } from '../../store/slice/routinesdaySlice';

import LinearProgressWithLabel from './progressDone'


const CardRoutineDay = () => {
    const param = useParams()
    const dispatch = useDispatch()
    const list = useSelector(state => state.routinesday.list)
    const [route, setRoute] = useState()
    const [done, setDone] = useState({
        check: '',
        ind: '',
        id: ''
    })

   
   
    useEffect(() => {

        async function getExercise() {
            let result = await fetch(`http://younikweb.ir/api/v1/routine/${param.id}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "appliction/json",
                    "Accept": "application/json"
                },
                // body: JSON.stringify(item)
            });
            result = await result.json()
            setRoute(result.data)
        };
        getExercise()

    }, [])

    //delete
    const handleDelete = (option) => {
        dispatch(deleteExercise({ option, list }))
    }

    //done
    const doneSet = ({ Index, Id, check }) => {
        setDone({ check: check, ind: Index, id: Id })
    }

    return (
        <div>
            { route?.routine_items?.map((route) =>
            <Card className='' sx={{ minWidth: '', marginTop: 3 }} >
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe">
                            <img className='imglist' src={"item?.avatar"} />
                        </Avatar>
                    }
                    // action={<button onClick={() => handleDelete(route?.id)}> <DeleteIcon /> </button>}
                    title={<h1 className='name-user '>{route?.exercise.fa_title}</h1>}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                    <h2 className='note'>{route.note + route.id}</h2>
                    </Typography>
                </CardContent>
                <Grid container spacing={0} >
                    <Grid xs={2}> <h1 className="m-3 restTimer">  <AvTimerIcon /> Rest Timer :
                    </h1>
                    </Grid>
                    <Grid xs={3}>
                        <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel className='bold' key={route?.id} 
                            id="demo-simple-select-autowidth-label">{"item.timer"}</InputLabel>
                        </FormControl>
                    </Grid>
                    <Grid sx={{ m: 3 }} xs={12}></Grid>
                    <TableContainer sx={{ width: "100%" }} component={Paper}>
                        <Table className='mr-0 ml-0' size="meduim" aria-label="a dense table">
                            <TableHead>
                                <TableRow className='' >
                                    <TableCell align="center">SET</TableCell>
                                    {/* <TableCell align="center">PREVIOUS</TableCell> */}
                                    {/* {item.kg ? <TableCell align="center">KG</TableCell> : ''} */}
                                    {/* {item.reps ? <TableCell align="center">REPS</TableCell> : ''} */}
                                    <TableCell align="center"><CheckIcon /></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody  >

                            </TableBody>
                        </Table>
                    </TableContainer >
                    {/* <Grid sx={{ m: 3 }} xs={12} > 
                <Button sx={{ width: '100%' }} onClick={() => handleSet('item.id')} 
                size={'large'} variant="contained">+ Add Set</Button> 
                    </Grid> */}
                </Grid>
                {/* <LinearProgressWithLabel  Timer={item.timer}/> */}
            </Card>

                           )  }

        </div>
    )
}

export default CardRoutineDay
