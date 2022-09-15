import React, { useState, useEffect } from 'react'
import {
    Grid, Card, CardHeader, FormControl,
    MenuItem, TextareaAutosize, Typography, CardContent, IconButton, InputLabel, Avatar
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import Select from '@mui/material/Select';
import Fit1 from "../img/fit1.jpg";
import Fit2 from "../img/fit2.jpg";
import Fit3 from "../img/fit3.jpg";
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExercise } from '../store/slice/exerciseSlice'
import { addSet, setInput, addTimer } from '../store/slice/exerciseSlice';
import Menu from '@mui/material/Menu';
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper } from '@mui/material';


const ITEM_HEIGHT = 48;


const CardSelect = (props) => {

    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const list = useSelector(state => state.exercise.list)
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

    const [count, setCount] = useState(1)
    const handleSet = (option) => {
        setCount(count + 1)
        dispatch(addSet({ option }))
    }

    //   delete 
    const deleteexercise = (option) => {
        dispatch(deleteExercise({ option, list }))

    }

    const [timer, setTimer] = React.useState();


    const handleChangeSelected = (e, id) => {
        setTimer(e.target.value);
        dispatchManeager({ id, timer })

    }

    const handleInputKg = (e, ind, id) => {
        setKg(e.target.value)
        dispatchManeager({ ind, id })
    }


    const handleInputREPS = (e, ind, id) => {
        setREPS(e.target.value)
        dispatchManeager({ ind, id })
    }

    const [ind, setInd] = useState()
    const [id, setId] = useState()

    // set input 
    const [REPS, setREPS] = useState()
    const [kg, setKg] = useState()



    const dispatchManeager = ({ ind, id, timer }) => {
        dispatch(setInput({ kg, REPS, ind, id }))
        dispatch(addTimer({ id, timer }))
    }

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
                                style={{ width: '100%', height: 40 }}
                            />
                        </Typography>
                    </CardContent>
                    <Grid container spacing={0}>
                        <Grid xs={2}> <h1 className="m-3 restTimer">  <AvTimerIcon /> Rest Timer :
                        </h1>
                        </Grid>
                        <Grid xs={3}>    <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel key={item.id} id="demo-simple-select-autowidth-label">Timer</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                onChange={(e) => handleChangeSelected(e, item.id)}
                                autoWidth
                                label="timer"
                            >
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

                        <TableContainer sx={{ width: "100%" }} component={Paper}>
                            <Table className='mr-0 ml-0' size="meduim" aria-label="a dense table">
                                <TableHead>
                                    <TableRow className='' >
                                        <TableCell align="center">SET</TableCell>
                                        {/* <TableCell align="center">PREVIOUS</TableCell> */}
                                        <TableCell align="center">KG</TableCell>
                                        <TableCell align="center">RESE</TableCell>
                                    </TableRow>
                                </TableHead>
                                {item.set.map((option, ind) =>
                                    <TableBody key={ind} >
                                        <TableRow >
                                            <TableCell align="center" > {ind + 1}</TableCell>
                                            <TableCell align="center"><input key={ind} variant="filled" onChange={(e) => handleInputKg(e, ind, item.id)} className='inputCard' type='number'>
                                            </input></TableCell>
                                            <TableCell align="center"><input key={ind} variant="filled" onChange={(e) => handleInputREPS(e, ind, item.id)} className='inputCard' type='number'>
                                            </input></TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer >
                        <Grid sx={{ my: 3 }} xs={12} >
                            <Button onClick={() => handleSet(item.id)} size={'large'} variant="outlined">+ Add Set</Button>
                        </Grid>
                    </Grid>
                </Card>

            )
            }


        </div>
    )
}

export default CardSelect




















