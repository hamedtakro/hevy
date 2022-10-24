import React, { useState , useEffect} from 'react';
import Navbar from '../layout/navbar';
import '../../App.css';
import '../../index.css';
import { Paper, Box, Hidden, Button, Modal, Typography, ListItemAvatar, Stack, TextField, Avatar, ListItemText, List, ListItem, MenuItem, InputLabel, FormControl, Select, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CardExercise from './cardExercise';
import { exerciseShow } from '../../store/slice/exerciseShow'
import Fit1 from "../../img/fit1.jpg";
import Fit2 from "../../img/fit2.jpg";
import Fit3 from "../../img/fit3.jpg";
import Fit11 from "../../img/fit1-1.jpg";
import vFit1 from "../../video/Fit1.mp4";
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';


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

function Exercise() {
    const [exercise , setExercise] = useState()

    useEffect(() => {
      console.log("heloo");
        getExercise()
    }, [])


    async function getExercise() {
        let result = await fetch("http://younikweb.ir/api/v1/exercises", {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "appliction/json",
                "Accept": "application/json"
            },
            // body: JSON.stringify(item)
        });
        result = await result.json()
        console.log(result);
        setExercise(result.data)
    }
console.log(exercise);


    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: {
            'image/jpeg': ['.jpeg', '.png']
        }
    });
    const [text, setText] = React.useState('');
    const handlChange = (event) => {
        setText(event.target.value);
    };

    const [openList, setOpenList] = React.useState(false);
    const handleOpenList = () => setOpenList(true);
    const handleCloseList = () => setOpenList(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };




    const listShow = useSelector(state => state.exerciseShow.list)


    console.log(listShow);
    const dispatch = useDispatch()
    const handleList = (option) => {
        const listexercise = exercise.find((item) => item.id == option)
        dispatch(exerciseShow(listexercise))
        console.log(listexercise);
    }


    //  serach and filter
    const [filterEquipment, setFilterEquipment] = useState(0)
    const handlefilter = (e) => {
        setFilterEquipment(e.target.value)
        setFilterMuscles(0)
    }
    const Filtered = filterEquipment == 0 ?
        exercise :
        exercise.filter((option) =>
            option.equipment_id == filterEquipment
            // option.equipment.title.toLowerCase().includes(filterEquipment.toLowerCase())
        );
    const [filterMuscles, setFilterMuscles] = useState(0)
    const handleFilter = (e) => {
        setFilterMuscles(e.target.value)
        setFilterEquipment(0)
    }
    const filtered = filterMuscles == 0 ?
        Filtered :
        exercise.filter((option) =>
            option.primary_muscle_id == filterMuscles
        );
    const [search, setSearch] = useState("")
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    const searched = !search ?
        filtered :
        exercise.filter((option) =>
            option.title.toLowerCase().includes(search.toLowerCase()));


    return (

        <div className='exercise.style' >
            <Navbar />

            <div>
                <div className='exercise-box lg:flex sm:w-full '>
                    <div className='exercise-left hidden max-md:w-full mb-5 lg:w-2/6 sm:inline'>
                        <Box component="form" sx={{ '& .MuiTextField-root': { margin: '4px 0', width: '100%' }, }} noValidate autoComplete="off">
                            <h1>Filters</h1>
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
                        <div>
                                                
                     
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

                                    {exercise?.map((option) =>
                                    <List key={option.id} sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: 300, position: 'relative', overflow: 'auto', }}>
                                        <ListItem alignItems="flex-start" onClick={() => handleList(option.id)}>
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={'option.avatar'} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={option.fa_title}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                        </Typography>
                                                        {option.primary_muscle.title}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <hr className='border-t-2'></hr>
                                    </List>)}
                            </div>
                        </div>
                    </div>

                    <div className="max-md:w-full mb-5 lg:w-4/6 md:mr-4 lg:px-5 px-0">

                        <Paper elevation={2}  >

                           { listShow.length > 0 ? <CardExercise /> :

                                <div className='fitnessIcon mt-20 p-20'>
                                    <FitnessCenterIcon color="primary" sx={{ fontSize: 100 }} />
                                    <h2>Select an exercise</h2>
                                </div>

                                            }


                            <Hidden smUp>
                                <Button onClick={handleOpenList} className="float-end  md:h-10  " color="primary" variant="contained" >
                                    Add Exercise
                                </Button>
                            </Hidden>


                            <Modal
                                open={openList}
                                onClose={handleCloseList}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Box component="form" container sx={{ '& .MuiTextField-root': { marginTop: '.5rem ', width: '100%' }, }} noValidate autoComplete="off">
                                        <h3>Filters</h3>
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
                                    <div>
                                        <div className='libaryTitle m-4'>
                                            <h3>Library</h3>
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
                                            // list exercise for pc
                                            {exercise?.map((option) =>
                                                <List key={option.id} sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: 300, position: 'relative', overflow: 'auto', }}>
                                                    <ListItem alignItems="flex-start" onClick={() => handleList(option.id)}>
                                                        <ListItemAvatar>
                                                            <Avatar alt="Remy Sharp" src={"option.avatar"} />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={option.fa_title}
                                                            secondary={
                                                                <React.Fragment>
                                                                    <Typography
                                                                        sx={{ display: 'inline' }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                    </Typography>
                                                                    {option.primary_muscle.title}
                                                                </React.Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <hr className='border-t-2'></hr>
                                                </List>)}
                                        </div>
                                    </div>

                                </Box>
                            </Modal>
                        </Paper>



                    </div>
                </div>
            </div>
        </div >
    );
}


export default Exercise;



