import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import {
    Grid, Card, CardHeader, FormControl, MenuItem, TextareaAutosize,
    Typography, CardContent, IconButton, InputLabel, Avatar, Table,
    TableCell, TableContainer, TableHead, TableBody, TableRow, Paper,
    Menu,
    Button
} from '@mui/material';

import {
    Modal, Hidden, ListItemAvatar, ListItemText, Box,
    List, ListItem, Input, Divider, InputBase, TextField
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import CheckIcon from '@mui/icons-material/Check';

import Fit1 from "../../../img/fit1.jpg";
import Fit2 from "../../../img/fit2.jpg";
import Fit3 from "../../../img/fit3.jpg";

import { setRoute, updateAddExercise, addSet, deleteExercise } from '../../../store/slice/routinesdaySlice';

import Navbar from '../../layout/navbar'
import CheckBox from '../checkBox';

import SearchIcon from '@mui/icons-material/Search';
import EditeAddKG from './updateKg'
import EditeAddREPS from './updateREPS'
import DeleteIcon from '@mui/icons-material/Delete';

const equipment = [
    {
        value: 0,
        label: 'All Equipment',
    },
    {
        value: 'none',
        label: 'None',
    },
    {
        value: 'barbell',
        label: 'Barbell',
    },
    {
        value: 'dumbbell',
        label: 'Dumbbell',
    },
    {
        value: 'kettlebell',
        label: 'Kettlebell',
    },
];
const muscles = [
    {
        value: 0,
        label: 'All Muscles',
    },
    {
        value: 'abdominals',
        label: 'Abdominals',
    },
    {
        value: 'abductors',
        label: 'Abductors',
    },
    {
        value: 'shoulders',
        label: 'Shoulders',
    },
];
const exerciseDay = [
    {
        id: 1,
        title: 'Ab Scissors',
        body: 'Abdominals',
        equipment: 'Dumbbell',
        avatar: Fit1,
        type: 'img',
        set: [
            { kg: 10, REPS: 2 },
            { kg: 104, REPS: 23 },
            { kg: 106, REPS: 22 }],
        timer: '30',
        kg: 'KG',
        reps: 'REPS'
    },
    {
        id: 2,
        title: 'Ab Wheel',
        body: 'Abdominals',
        equipment: 'Dumbbell',
        avatar: Fit1,
        type: 'video',
        set: [{ kg: 154, REPS: 43 }],
        timer: '25',
        kg: 'KG'
    },
    {
        id: 3,
        title: 'Arnold Press (Dumbbell)',
        body: 'Shoulders ',
        equipment: 'Barbell',
        avatar: Fit3,
        type: 'img',
        set: [
            { kg: 104, REPS: 255 },
            { kg: 44, REPS: 13 }],
        timer: '10',
        reps: 'REPS',
        kg: 'KG'
    }
]
const exercise = [
    {
        id: 11,
        title: 'Ab Scissors',
        body: 'Abdominals',
        equipment: 'Dumbbell',
        avatar: Fit1,
        type: 'img',
        set: [],
        timer: '',
        kg: 'KG',
        resp: 'RESP'
    },
    {
        id: 12,
        title: 'Ab Wheel',
        body: 'Abdominals',
        equipment: 'Dumbbell',
        avatar: Fit1,
        type: 'video',
        set: [],
        timer: '',
        kg: 'KG'
    }, {
        id: 13,
        title: 'Arnold Press (Dumbbell)',
        body: 'Shoulders ',
        equipment: 'Barbell',
        avatar: Fit3,
        type: 'img',
        set: [],
        timer: '',
        resp: 'RESP'
    }, {
        id: 14,
        title: 'Arnold Press (Dumbbell)',
        body: 'Shoulders',
        equipment: 'Barbell',
        avatar: Fit2,
        type: 'img',
        set: [],
        timer: ''
    },
]




const RoutinesDay = () => {

    const dispatch = useDispatch()

    const list = useSelector(state => state.routinesday.list)

    const [count, setCount] = useState(1)
    const [timer, setTimer] = React.useState();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const ITEM_HEIGHT = 48;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    // libery 
    const [filterEquipment, setFilterEquipment] = useState(0)
    const handlefilter = (e) => {
        setFilterEquipment(e.target.value)
        setFilterMuscles(0)
    }
    const Filtered = filterEquipment == 0 ?
        exercise :
        exercise.filter((option) =>
            option.equipment.toLowerCase().includes(filterEquipment.toLowerCase()));
    const [filterMuscles, setFilterMuscles] = useState(0)
    const handleFilter = (e) => {
        setFilterMuscles(e.target.value)
        setFilterEquipment(0)
    }
    const filtered = filterMuscles == 0 ?
        Filtered :
        Filtered.filter((option) =>
            option.body.toLowerCase().includes(filterMuscles.toLowerCase()));
    const [search, setSearch] = useState()
    const handleSearch = (e) => {
        setSearch(e.target.value)
        console.log(list)
    }
    const searched = !search ?
        filtered :
        exercise.filter((option) =>
            option.title.toLowerCase().includes(search.toLowerCase()));




    const open = Boolean(anchorEl)

    const deleteexercise = (option) => {
        console.log(option);
        dispatch(deleteExercise({ option, list }))
    }

    const Timer = exerciseDay.map((item) => item.timer)

    const handleChangeSelected = (e, id) => {
        setTimer(e.target.value);
        // dispatchManeager({ id, timer })

    }
    const [done, setDone] = useState({
        check: '',
        ind: '',
        id: ''
    })
    const doneSet = ({ Index, Id, check }) => {

        setDone({ check: check, ind: Index, id: Id })
    }






    useEffect(() => {
   dispatch(setRoute({ exerciseDay }))
    }, []);

    const handleList = (option) => {
        const listexercise = exercise.find((item) => item.id == option)

        dispatch(updateAddExercise({ listexercise }))
    }

    const handleSet = (option) => {
        console.log(option);
        dispatch(addSet({ option }))
    }

    const handledelete = (option) => {
        console.log('delete' + option);
        dispatch(deleteExercise({ option }))
        console.log(list);
    }
    return (
        <div>
            <Navbar />
            <div className='lg:container' >
                <div className='exercise-box md:flex lg:flex sm:w-full' >

                    <div className="exercise-right max-md:w-full mb-5 lg:w-4/6 md:mr-4 mt-6">
                        {list.map((item) =>
                            <Paper className='container mb-2' >
                                <Card className='' sx={{ minWidth: '40rem', marginTop: 3 }} >
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe">
                                                <img className='imglist' src={item?.avatar} />
                                            </Avatar>
                                        }
                                        action={
                                            <button onClick={() => handledelete(item.id)}> <DeleteIcon /> </button>


                                        }
                                        title={<h1>{item.title}
                                        </h1>}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            <TextareaAutosize
                                                aria-label="empty textarea"
                                                placeholder="add Notes here..."
                                                style={{ width: '100%', height: 40 }}
                                            />
                                        </Typography>
                                    </CardContent>
                                    <Grid container spacing={0} >
                                        <Grid xs={2}> <h1 className="m-3 restTimer">  <AvTimerIcon /> Rest Timer :
                                        </h1>
                                        </Grid>
                                        <Grid xs={3}>
                                            <FormControl sx={{ m: 1, minWidth: 80 }}>
                                                <InputLabel className='bold' key={item.id} id="demo-simple-select-autowidth-label">{item.timer}</InputLabel>

                                            </FormControl>
                                        </Grid>
                                        <Grid sx={{ m: 3 }} xs={12}></Grid>

                                        <TableContainer sx={{ width: "100%" }} component={Paper}>
                                            <Table className='mr-0 ml-0' size="meduim" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow className='' >
                                                        <TableCell align="center">SET</TableCell>
                                                        {/* <TableCell align="center">PREVIOUS</TableCell> */}
                                                        <TableCell align="center">KG</TableCell>
                                                        <TableCell align="center">REPS</TableCell>
                                                        <TableCell align="center"><CheckIcon /></TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody  >
                                                    {item.set.map((option, ind) =>
                                                        <TableRow key={ind} className={`${option.done == true ? 'btn-success' : ''}`}>

                                                            <TableCell align="center" > {ind + 1}</TableCell>
                                                            <TableCell align="center">
                                                                <EditeAddKG id={item.id} prevKg={option.kg} Index={ind} />
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <EditeAddREPS id={item.id} prevREPS={option.REPS} Index={ind} />
                                                            </TableCell>
                                                            <TableCell align="center"> <CheckBox doneSet={doneSet} Index={ind} Id={item.id} /></TableCell>
                                                        </TableRow>)}
                                                </TableBody>

                                            </Table>
                                        </TableContainer >
                                        <Grid sx={{ m: 3 }} xs={12} >
                                            <Button sx={{ width: '100%' }} onClick={() => handleSet(item.id)} size={'large'} variant="contained">+ Add Set</Button>
                                        </Grid>
                                    </Grid>
                                </Card>


                            </Paper>

                        )}
                    </div>

                    <div className='exercise-left hidden max-md:w-full mb-5 lg:w-2/6 sm:inline'>
                        <Box component="form" sx={{ '& .MuiTextField-root': { margin: '4px 0', width: '100%' }, }} noValidate autoComplete="off">
                            <h2>Filters</h2>
                            <div>
                                <TextField
                                    id="outlined-select"
                                    select
                                    value={filterEquipment}
                                    onChange={handlefilter}
                                >
                                    {equipment.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    value={filterMuscles}
                                    onChange={handleFilter}
                                >
                                    {muscles.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </Box>
                        <libary>
                            <div className='libaryTitle'>
                                <h2>Library</h2>
                            </div>
                            <div>
                                <Paper
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', backgroundColor: 'rgb(240, 240, 240);' }}
                                >
                                    <IconButton type="submit" sx={{ p: '5px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search Exercise"
                                        inputProps={{ 'aria-label': 'search exercise' }}
                                        onChange={handleSearch}
                                        value={search}
                                    />
                                </Paper>
                            </div>
                            <div>
                                {searched.map((option) =>
                                    <List key={option.id} sx={{
                                        width: '100%', bgcolor: 'background.paper', maxHeight: 300, position: 'relative', overflow: 'auto',
                                    }}>
                                        <button onClick={() => handleList(option.id)} key={option.id} className="flex">
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src={option.avatar} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={option.title}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                            </Typography>
                                                            {option.body}
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                        </button>
                                    </List>)}
                            </div>
                        </libary>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RoutinesDay
