import React, { useState, useEffect } from 'react';
import Navbar from '../layout/navbar';
import '../../App.css';
import '../../index.css';
import { Paper, Box, Hidden, Button, Modal, Typography, ListItemAvatar, Stack, TextField, Avatar, ListItemText, List, ListItem, MenuItem, InputLabel, FormControl, Select, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CardExercise from './cardExercise';
import { exerciseShow } from '../../store/slice/exerciseShow'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LabelBottomNavigation from '../layout/buttomNavigation';
import MenuExercise from '../routines/menuExercise';

function Exercise() {

    const [exercise, setExercise] = useState()
    const [equipments, setEquipments] = useState()
    const [muscles, setMuscles] = useState()

    useEffect(() => {
        getExercise();
        getEquipments();
        getMuscles()
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

    async function getEquipments() {
        let result = await fetch("http://younikweb.ir/api/v1/equipments", {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "appliction/json",
                "Accept": "application/json"
            },
            // body: JSON.stringify(item)
        });
        result = await result.json()
        setEquipments(result.data)
    }
    async function getMuscles() {
        let result = await fetch("http://younikweb.ir/api/v1/muscles", {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "appliction/json",
                "Accept": "application/json"
            },
            // body: JSON.stringify(item)
        });
        result = await result.json()
        setMuscles(result.data)
    }


    const [openList, setOpenList] = React.useState(false);
    const handleOpenList = () => setOpenList(true);
    const handleCloseList = () => setOpenList(false);


    // create exercise 
    const [openCreateList, setOpenCreateList] = useState(false)
    const handleOpenCreate = () => setOpenCreateList(true)
    const handleCloseCreate = () => setOpenCreateList(false)

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


    const dispatch = useDispatch()
    const handleList = (option) => {
        const listexercise = exercise.find((item) => item.id == option)
        dispatch(exerciseShow(listexercise))
        console.log(listexercise);
    }

    // serarch and filter

    const [filterEquipment, setFilterEquipment] = useState('')
    const [filterMuscles, setFilterMuscles] = useState('')
    const [search, setSearch] = useState('')


    const handleFilterEquipment = (e) => {
        setFilterEquipment(e.target.value)
        setSearch('')
    }

    const handleFilterMuscles = (e) => {
        setFilterMuscles(e.target.value)
        setSearch('')
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }


    const Filtered = filterEquipment == 0 ?
        exercise :
        exercise.filter((option) =>
            option.equipment_id == filterEquipment
            // option.equipment.title.toLowerCase().includes(filterEquipment.toLowerCase())
        );


    const filtered = filterMuscles == 0 ?
        Filtered :
        Filtered.filter((option) =>
            option.primary_muscle_id == filterMuscles
        );


    const searched = !search ?
        filtered :
        exercise.filter((option) =>
            option.fa_title.toLowerCase().includes(search.toLowerCase()) ||
            option.en_title.toLowerCase().includes(search.toLowerCase()))





    return (

        <div className='exercise.style' >
            <Navbar />

            <div>
                <div className='exercise-box lg:flex sm:w-full '>
                    <div className='exercise-left hidden max-md:w-full mb-5 lg:w-2/6 sm:inline'>
                        <Box component="form" sx={{ '& .MuiTextField-root': { margin: '4px 0', width: '100%' }, }} noValidate autoComplete="off">
                        <MenuExercise />

                        </Box >



                    </div>

                    <div className="exercise-right max-md:w-full mb-5 md:w-4/6 md:ml-14 mt-8 md:mr-7">

                        <Paper elevation={2}  >
                            <div className=" md:cardMD">
                                {listShow.length > 0 ? <CardExercise /> :
                                    <div className='emptyRight '>
                                        <FitnessCenterIcon color="primary" className="fitnessIcon" sx={{ fontSize: 80 }} />
                                        <Typography> لطفا یک ورزش انتخاب کنید</Typography>
                                    </div>
                                }
                            </div>
                            <Hidden smUp>
                                <Button onClick={handleOpenList} className="float-end h-10 button mr-7  "
                                    color="primary" variant="contained" ><Typography> اضافه کردن ورزش</Typography> </Button>  </Hidden>
                            <Modal
                                open={openList}
                                onClose={handleCloseList}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style} className='exercise-left'>
                                <MenuExercise />

                                </Box>
                            </Modal>
                            {/* +<Box component="button" sx={{ display: { xl: 'none', xs: 'block' } }} /> */}
                        </Paper>
                    </div>
                </div>
            </div >
            <LabelBottomNavigation />
        </div >
    );
}


export default Exercise;



