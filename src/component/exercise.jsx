import React, { useState } from 'react';
import Navbar from './navbar';
import '../App.css';
import '../index.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Paper from '@mui/material/Paper';
import { width } from '@mui/system';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { green, pink } from '@mui/material/colors';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PageviewIcon from '@mui/icons-material/Pageview';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import CardExercise from './cardExercise';
import { exerciseShow } from '../store/slice/exerciseShow'
import Fit1 from "../img/fit1.jpg";
import Fit2 from "../img/fit2.jpg";
import Fit3 from "../img/fit3.jpg";
import Fit11 from "../img/fit1-1.jpg";
import vFit1 from "../video/Fit1.mp4";
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';


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
        video: vFit1
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

function Exercise() {
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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [currency, setCurrency] = React.useState('allequipment');

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
        dispatch(exerciseShow(listexercise))
        console.log(listexercise)

    }


    //  serach and filter
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

        <div className='exercise.style' >
            <Navbar />

            <div>
                <div className='exercise-box lg:flex sm:w-full '>
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
                                <a className='pointer' onClick={handleOpen}>+ Create Exercise</a>
                            </div>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="modalBox">
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Create Exercise
                                    </Typography>
                                    <div className="container">
                                        <div {...getRootProps({ className: 'dropzone , pointer' })} >
                                            <input {...getInputProps()} />
                                            {!isDragActive && (
                                                <>
                                                    <Stack direction="row" spacing={2}>
                                                        <Avatar sx={{ width: '80px', height: '80px', border: 'solid 2px rgb(224, 224, 224)', backgroundColor: '#fff' }}>
                                                            <CameraAltIcon sx={{ fontSize: '2rem', color: '#000' }} />
                                                        </Avatar>
                                                    </Stack>
                                                    <p>Add Image</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="listcreateExercise">
                                        <input type="text" id="lname" name="lname" placeholder="Exercise Name"></input>
                                    </div>
                                    <div className="formatSelect">
                                        <p>Exercise Type</p>
                                        <div style={{ width: '300px' }} className="formatControler">
                                            <FormControl className="formControl" >
                                                <InputLabel sx={{ lineHeight: '.7em' }} id="demo-simple-select-autowidth-label">Select</InputLabel>
                                                <Select
                                                    sx={{ height: '40px' }}
                                                    id="demo-simple-select-autowidth"
                                                    value={text}
                                                    onChange={handlChange}
                                                    autoWidth
                                                    label="Select"
                                                >
                                                    <MenuItem value="" sx={{ width: '290px' }}>
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={10}>Twenty</MenuItem>
                                                    <MenuItem value={21}>Twenty one</MenuItem>
                                                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <hr style={{ margin: '20px 0' }}></hr>
                                    <div className="formatSelect">
                                        <p>Equipment</p>
                                        <div className="formatControler">
                                            <FormControl className="formControl" >
                                                <InputLabel sx={{ lineHeight: '.7em' }} id="demo-simple-select-autowidth-label">Select</InputLabel>
                                                <Select
                                                    sx={{ height: '40px' }}
                                                    id="demo-simple-select-autowidth"
                                                    value={text}
                                                    onChange={handlChange}
                                                    autoWidth
                                                    label="Select"
                                                >
                                                    <MenuItem value="" sx={{ width: '190px' }}>
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={10}>Twenty</MenuItem>
                                                    <MenuItem value={21}>Twenty one</MenuItem>
                                                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <hr style={{ margin: '20px 0' }}></hr>
                                    <div className="formatSelect">
                                        <p>Primary Muscle Group</p>
                                        <div className="formatControler">
                                            <FormControl className="formControl" >
                                                <InputLabel sx={{ lineHeight: '.7em' }} id="demo-simple-select-autowidth-label">Select</InputLabel>
                                                <Select
                                                    sx={{ height: '40px' }}
                                                    id="demo-simple-select-autowidth"
                                                    value={text}
                                                    onChange={handlChange}
                                                    autoWidth
                                                    label="Select"
                                                >
                                                    <MenuItem value="" sx={{ width: '190px' }}>
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={10}>Twenty</MenuItem>
                                                    <MenuItem value={21}>Twenty one</MenuItem>
                                                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <hr style={{ margin: '20px 0' }}></hr>
                                    <div className="formatSelect">
                                        <p>Other Muscles</p>
                                        <div className="formatControler">
                                            <FormControl className="formControl" >
                                                <InputLabel sx={{ lineHeight: '.7em' }} id="demo-simple-select-autowidth-label">Select</InputLabel>
                                                <Select
                                                    sx={{ height: '40px' }}
                                                    id="demo-simple-select-autowidth"
                                                    value={text}
                                                    onChange={handlChange}
                                                    autoWidth
                                                    label="Select"
                                                >
                                                    <MenuItem value="" sx={{ width: '190px' }}>
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={10}>Twenty</MenuItem>
                                                    <MenuItem value={21}>Twenty one</MenuItem>
                                                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="saveExercise">

                                        <button>Save Routine</button>
                                    </div>
                                </Box>
                            </Modal>
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
                                {searched.map((option) => <List key={option.id} sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: 300, position: 'relative', overflow: 'auto', }}>
                                    <ListItem alignItems="flex-start" onClick={() => handleList(option.id)}>
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
                                    <hr className='border-t-2'></hr>
                                </List>)}
                            </div>
                        </libary>
                    </div>
                    <div className="max-md:w-full mb-5 lg:w-4/6 md:mr-4 px-5">
                        <div className='text-center'>
                            <FitnessCenterIcon />
                            <h2>Select an exercise</h2>
                        </div>


                        <CardExercise />


                    </div>
                </div>
            </div>
        </div>
    );
}


export default Exercise;



