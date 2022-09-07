import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Card, CardHeader, FormControl, MenuItem, TextareaAutosize, Typography, CardContent, IconButton, InputLabel, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Fit1 from "../img/fit1.jpg";
import Fit2 from "../img/fit2.jpg";
import Fit3 from "../img/fit3.jpg";
import { createSelectorHook } from 'react-redux';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { addCount } from '../store/slice/countSlice'
import AddSet from './addSet'
import { MarginRounded } from '@mui/icons-material';
import { margin } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import { deleteExercise } from '../store/slice/exerciseSlice'
import { addSet } from '../store/slice/exerciseSlice'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';








const ITEM_HEIGHT = 48;


const CardSelect = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const list = useSelector(state => state.exercise.list)
    const countList = useSelector(state => state.counter.value)

    const exercise = [
        {
            id: 1,
            title: 'Ab Scissors',
            body: 'Abdominals',
            avatar: Fit1
        },
        {
            id: 2,
            title: 'Ab Wheel',
            body: 'Abdominals',
            avatar: Fit2
        }, {
            id: 3,
            title: 'Arnold Press (Dumbbell)',
            body: 'Shoulders ',
            avatar: Fit3
        }, {
            id: 4,
            title: 'Arnold  (Dumbbell)',
            body: 'Shoulders',
            avatar: ""
        },
    ]



    const [SET, setSET] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSET(event.target.value);
    };


    const [timer, setTimer] = React.useState('');

    const handleChangeSelected = (event: SelectChangeEvent) => {
        setTimer(event.target.value);
    };

    // const [count, setCount] = useState(1)
    const dispatch = useDispatch()



    const setList = list.filter(item => item.set == 1)
    console.log(setList)

    const deleteexercise = (option) => {
        dispatch(deleteExercise({ option, list }))
        console.log("ok");
    }

    const handleSet = (option) => {
        const setItem = list.find(item => item.id == option)

        dispatch(addSet({ list, option }))
    }




    console.log(list)

    return (
        <div>
            {list.map((item) =>

                <Card key={item.id} sx={{ maxWidth: 'max', marginTop: 5 }}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe">
                                <img className='imglist' src={item?.avatar} />
                            </Avatar>
                        }
                        action={
                            <div>
                                <IconButton aria-label="more"
                                    id="long-button"
                                    aria-controls={open ? 'long-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleClick}>
                                    <MoreVertIcon id="outlined-select" />

                                </IconButton>
                                <Menu
                                    id="long-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'long-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    PaperProps={{
                                        style: {
                                            maxHeight: ITEM_HEIGHT * 4.5,
                                            width: '20ch',
                                        },
                                    }}
                                >

                                    <MenuItem onClick={handleClose}>
                                        <button onClick={() => deleteexercise(item.id)}>delete</button>

                                    </MenuItem>

                                </Menu>
                            </div>
                        }
                        title={<h1>{item?.title}</h1>}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder=" Note..."
                                style={{ width: 960, height: 40 }}
                            />
                        </Typography>
                    </CardContent>
                    <Grid container spacing={0}>
                        <Grid xs={2}> <h1 className="m-3 restTimer">  <AvTimerIcon /> Rest Timer :
                        </h1>
                        </Grid>
                        <Grid xs={3}>    <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Timer</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={timer}
                                onChange={handleChangeSelected}
                                autoWidth
                                label="timer"
                            >
                                <MenuItem value="">
                                    <em>none</em>
                                </MenuItem>
                                <MenuItem value={0}>OFF</MenuItem>
                                <MenuItem value={5}> 5 s</MenuItem>
                                <MenuItem value={15}>15 s</MenuItem>
                                <MenuItem value={20}>20 s</MenuItem>
                                <MenuItem value={25}>25 s</MenuItem>
                            </Select>

                        </FormControl>
                        </Grid>
                        <Grid xs={7}></Grid>
                        {/* card place   */}

                        <div key={item.set} style={{ width: "100%" }}  > <AddSet key={item.set} /></div>


                        <Grid sx={{ my: 3 }} xs={12} ><Button onClick={() => handleSet(item.id)} size={'large'} variant="outlined">+ Add Set</Button></Grid>
                    </Grid>
                </Card>

            )
            }


        </div>
    )
}

export default CardSelect




















