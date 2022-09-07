import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { useDispatch } from "react-redux";
import Navbar from "./navbar";
import {Button,Grid,Typography,Avatar,ListItemAvatar,ListItemText,Box,List,ListItem,Input,MenuItem,Divider,InputBase,Paper,TextField} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { setExercise } from '../store/slice/exerciseSlice'
import CardsSelect from './cardSelect';
import { addCount } from "../store/slice/countSlice";
import SearchIcon from '@mui/icons-material/Search';
import { width } from '@mui/system';
import { useSelector } from 'react-redux';
import Fit1 from "../img/fit1.jpg";
import Fit2 from "../img/fit2.jpg";
import Fit3 from "../img/fit3.jpg";
import '../App.css';



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

const exercise = [
    {
        id: 1,
        title: 'Ab Scissors',
        body: 'Abdominals',
        equipment: 'Dumbbell',
        avatar: Fit1,
        type: 'img'
    },
    {
        id: 2,
        title: 'Ab Wheel',
        body: 'Abdominals',
        equipment: 'Dumbbell',
        avatar: Fit1,
        type: 'video',
        
    }, {
        id: 3,
        title: 'Arnold Press (Dumbbell)',
        body: 'Shoulders ',
        equipment: 'Barbell',
        avatar: Fit3,
        type: 'img'
    }, {
        id: 4,
        title: 'Arnold Press (Dumbbell)',
        body: 'Shoulders',
        equipment: 'Barbell',
        avatar: Fit2,
        type: 'img'
    },
]

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function Newroutin() {
    const [currency, setCurrency] = React.useState('allequipment');


    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const handleChange = (event) => {
        setCurrency(event.target.value);
    };
    const [curren, setCurren] = React.useState('allmuscles');

    const handleChanges = (event) => {
        setCurren(event.target.value);
    };


    const dispatch = useDispatch()

    const handleList = (option) => {
        const listexercise = exercise.find((item) => item.id == option)
        dispatch(setExercise(listexercise))
        // test
    //    dispatch(addCount({option}))
    }
      const list = useSelector(state => state.exercise.list)
    


// serarch and filter

const [filterEquipment, setFilterEquipment] = useState(0)
const handlefilter = (e) => {
    setFilterEquipment(e.target.value)
    setFilterMuscles(0)
}
console.log(filterEquipment)
const Filtered = filterEquipment == 0 ?
    exercise :
    exercise.filter((option) =>
        option.equipment.toLowerCase().includes(filterEquipment.toLowerCase()));
const [filterMuscles, setFilterMuscles] = useState(0)
const handleFilter = (e) => {
    setFilterMuscles(e.target.value)
    setFilterEquipment(0)
}
console.log(filterMuscles)
const filtered = filterMuscles == 0 ?
    Filtered :
    Filtered.filter((option) =>
        option.body.toLowerCase().includes(filterMuscles.toLowerCase()));
const [search, setSearch] = useState()
const handleSearch = (e) => {
    setSearch(e.target.value)
}
console.log(search)
const searched = !search ?
    filtered :
    exercise.filter((option) =>
        option.title.toLowerCase().includes(search.toLowerCase()));



    return (
        <div className='rourin.style' >
            <Navbar />
            <div className='container'>
                <div className='exercise-box md:flex' >
                    {/* in ja saz kon */}
                    <div className="exercise-right max-md:w-full mb-5 lg:w-4/6 md:mr-4 mt-6">

                        <Grid container spacing={1} className="croutin md:flex">
                            <Grid item xs={3}>
                                <h2 className="font-bold text-xl">Create Routine</h2>
                            </Grid>
                            <Grid item xs={6}>
                            </Grid>
                            <Grid item xs={3}>
                                <Button className="float-end" variant="contained">Save Routine</Button>
                            </Grid>
                        </Grid>

                        <div className="mt-3">
                            <Paper elevation={3} >

                                <input className="m-1" style={{ minWidth: "960px", height: 40 }} type="text" id="lname" name="lname" placeholder="Routine Title"></input>
                                {/* card for task list */}

                                {list.length>0? <CardsSelect /> : 
                                <div className='fitnessIcon'>
                                    <FitnessCenterIcon color="primary" sx={{ fontSize: 100 }} />
                                    <h2>Select an exercise</h2>
                                </div>

                                }
                            </Paper>
                        </div>
                    </div>

                    <div className='exercise-left hidden max-md:w-full mb-5 lg:w-2/6 sm:inline'>
                        <Box component="form" sx={{ '& .MuiTextField-root': { margin: '4px 0', width: '100%' }, }} noValidate autoComplete="off">
                            <p>Filters</p>

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
                                <p>Library</p>
                                <a>+ Create Exercise</a>
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
                                <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: 500, position: 'relative', overflow: 'auto', }}>
                                    <Divider variant="inset" component="li" />

                                    {searched.map((option) => <button onClick={() => handleList(option.id)} key={option.id} className="flex">
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
                                    </button>)}



















                                </List>
                            </div>
                        </libary>
                    </div>
                </div>
            </div>
        </div >

    );
}

export default Newroutin;