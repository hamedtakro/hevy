import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { useDispatch } from "react-redux";
import Navbar from '../layout/navbar';
import {
    Button, Modal, Grid, Hidden, Typography, Avatar, ListItemAvatar, ListItemText, Box,
    List, ListItem, Input, MenuItem, Divider, InputBase, Paper, TextField
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { setExercise } from '../../store/slice/exerciseSlice'
import CardsSelect from './cardSelect';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { createRoutes, setRoutes } from "../../store/slice/routineSlice";
import '../../App.css';
import InputAddTitle from "./input/inputAddTitle";
import App from "../../App";
import CustomizedMenus from './styledMenu'
import StyledMenu from './styledMenu'
import Routines from "./routines";




// css
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

const ariaLabel = { 'aria-label': 'description' };

function Newroutin() {

    const list = useSelector(state => state.exercise.list)
    const title = useSelector(state => state.exercise?.title)
    const setList = useSelector(state => state.routine.list)
    const dispatch = useDispatch()

    // response mobile hiden button
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // get data 
    useEffect(() => {

        getExercise();
        getEquipments();
        getMuscles()
    }, [])


    const [exer, setExer] = useState()
    const [equip, setEquip] = useState()
    const [musc, setMusc] = useState()

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
        setExer(result.data)
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
        setEquip(result.data)

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
        setMusc(result.data)

    }

    // save 

    useEffect(() => {
        dispatch(createRoutes({ title }))
    }, [title])


    const [server, setServer] = useState(false)
    const [Successfull, setSuccessfull] = useState(false)
    const handleSetList = () => {
        list.map((item) => dispatch(setRoutes({ item })))
        setServer(true)
    }

    useEffect(() => {
        if (server == true) {
            let result = fetch("http://younikweb.ir/api/v1/routine", {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "appliction/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(setList)
            });
            setSuccessfull(true)
        }
    }, [server])



    // create list
    const handleList = (option) => {
        const listexercise = exer.find((item) => item.id == option)
        dispatch(setExercise(listexercise))
    }


    // serarch and filter

    const [filterEquipment, setFilterEquipment] = useState('')
    const [filterMuscles, setFilterMuscles] = useState('')
    const [search, setSearch] = useState('')


    const handleFilterEquipment = (e) => {
        console.log(e.target.value);
        setFilterEquipment(e.target.value)
        setSearch('')
    }

    const handleFilterMuscles = (e) => {
        console.log(e.target.value);
        setFilterMuscles(e.target.value)
        setSearch('')
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }


    const Filtered = filterEquipment == 0 ?
        exer :
        exer.filter((option) =>
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
        exer.filter((option) =>
            option.fa_title.toLowerCase().includes(search.toLowerCase()) ||
            option.en_title.toLowerCase().includes(search.toLowerCase())  ) 



    if (Successfull) {
        return <Routines />
    }

    return (
        <div className='newRoutin-style md:direction: rtl' >
            <Navbar />

            <div className='lg:container'>
                <div className='exercise-box md:flex lg:flex sm:w-full lg:mr-21 ' >

                    <div className='exercise-left hidden max-md:w-full mb-5  lg:ml-7 md:inline sm:inline'>
                        <Box component="form" sx={{ '& .MuiTextField-root': { margin: '4px 0', width: '100%' }, }}
                            noValidate autoComplete="off">
                            <h2></h2>

                            <div className="flex mt-6 justify-center menuFilter">
                                <div className=" xl:w-96 ">
                                    <select
                                        value={filterEquipment}
                                        onChange={handleFilterEquipment}
                                        className=" form-select appearance-none block w-full px-3 py-3 text-base font-normal
                                    text-gray-700  bg-white bg-clip-padding bg-no-repeat  border border-solid border-gray-300  
                                    rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        aria-label="Default select example">
                                        <option key='0' value='0' selected>لوازم ورزشی</option>
                                        <option key='1' value='1 '> هالتر</option>
                                        <option key='2' value='2'> دمبل</option>

                                        { /*equip?.map((item) => {
                                            <option value={item.id}>{item.title}</option>
                                        })  */}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-center menuFilter">
                                <div className=" xl:w-96 ">
                                    <select
                                        value={filterMuscles}
                                        onChange={handleFilterMuscles}
                                        className="h-18 form-select appearance-none block w-full px-3 py-3 text-base font-normal
                               text-gray-700  bg-white bg-clip-padding bg-no-repeat  border border-solid border-gray-300  
         rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        aria-label="Default select example">
                                        <option key='0' Value='0' selected> عضلات</option>
                                        <option key='1' Value='1' > شکمی</option>
                                        <option key='2' Value='2'> بازو</option>
                                        { /*equip?.map((item) => {
                 <option value={item.id}>{item.title}</option>
             })  */}
                                    </select>
                                </div>
                            </div>
                        </Box>
                        <div>
                            <div className='libaryTitle'>
                            </div>
                            <div>
                                <Paper
                                    component="form"
                                    sx={{
                                        p: '2px 4px', display: 'flex', alignitems: 'center',
                                        backgroundColor: 'rgb(240, 240, 240);'
                                    }}
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
                                {searched?.map((option ,index) =>
                                    <List key={index} sx={{
                                        direction: 'rtl', width: '100%',
                                        bgcolor: 'background.paper', maxHeight: 300, position: 'relative', overflow: 'auto',
                                    }}>
                                        <button
                                            onClick={() => handleList(option.type_id)} 
                                            className="list-button">
                                            <ListItem alignItems="flex-start" >
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src={"option.avatar"} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    alignItems="flex-start"
                                                    primary={
                                                        <Typography
                                                            className="newRoute-exersise-title">
                                                            {option.fa_title}
                                                        </Typography>
                                                    }
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
                                        </button>
                                    </List>)}
                            </div>
                        </div>
                    </div>
                    {/* in ja saz kon */}
                    <div className="exercise-right max-md:w-full mb-5 lg:w-4/6 md:ml-14 mt-8 md:mr-1">

                        <div className="mt-1">

                            <Grid container spacing={1} className="mb-4 md:flex">
                                <Grid item xs={3} md={3}>
                                    <Button onClick={handleSetList} className="float-end  md:h-11 "
                                        color="primary" variant="contained">Save Routine</Button>
                                </Grid>
                                <Grid item xs={4} md={6}>
                                </Grid>
                                <Grid className="" item xs={3} md={3}>


                                </Grid>
                            </Grid>

                            <Paper elevation={3} >
                                <InputAddTitle separator={1} />


                                <div className=" md:cardMD">
                                    {list.length > 0 ? <CardsSelect /> :
                                        <div className='fitnessIcon'>
                                            <FitnessCenterIcon color="primary" sx={{ marginTop: 5, fontSize: 100 }} />
                                            <h2>Select an exercise</h2>
                                        </div>
                                    }
                                </div>


                                <Hidden smUp>  <Button onClick={handleOpen} className="float-end  md:h-10  
                                " color="primary" variant="contained" >ADD exercise
                                </Button>
                                </Hidden>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >

                                    <Box sx={style}>
                                        <Box component="form" container
                                            sx={{ '& .MuiTextField-root': { marginTop: '.5rem ', width: '100%' }, }}
                                            noValidate autoComplete="off">
                                            <h2>Filters</h2>
                                            <div className="flex justify-center menuFilter" >
                                                <div className="mb-3 w-96 dir-rtl  ">
                                                    <select
                                                        value={filterEquipment}
                                                        onChange={handleFilterEquipment}
                                                        className="h-18 form-select appearance-none block w-full px-3 py-3 text-base font-normal
         text-gray-700  bg-white bg-clip-padding bg-no-repeat  border border-solid border-gray-300  
         rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        aria-label="Default select example">
                                                        <option key='0' value='0' selected>لوازم ورزشی</option>
                                                        <option key='1' value='1'> هالتر</option>
                                                        <option key='2' value='2'> دمبل</option>
                                                        { /*equip?.map((item) => {
                 <option value={item.id}>{item.title}</option>
             })  */}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="flex justify-center menuFilter">
                                                <div className="mb-3 w-96 ">
                                                    <select
                                                        value={filterMuscles}
                                                        onChange={handleFilterMuscles}
                                                        className="h-18 form-select appearance-none block w-full px-3 py-3 text-base font-normal
         text-gray-700  bg-white bg-clip-padding bg-no-repeat  border border-solid border-gray-300  
         rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        aria-label="Default select example">
                                                        <option key='0' value='0' selected> عضلات</option>
                                                        <option key='1' value='1' > شکمی</option>
                                                        <option key='2' value='2'> بازو</option>                                                        { /*equip?.map((item) => {
                 <option value={item.id}>{item.title}</option>
             })  */}
                                                    </select>
                                                </div>
                                            </div>

                                        </Box>
                                        <div>
                                            <div className='libaryTitle m-4'>
                                            </div>
                                            <div>
                                                <Paper
                                                    component="form"
                                                    sx={{
                                                        p: '2px 4px', display: 'flex', alignitems: 'center',
                                                        backgroundColor: 'rgb(240, 240, 240);'
                                                    }}
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
                                                {searched?.map((option,index) =>
                                                    <List key={index}
                                                        sx={{
                                                            direction: 'rtl', width: '100%', bgcolor: 'background.paper',
                                                            marginTop: '1rem', maxHeight: 300, position: '', overflow: 'auto',
                                                        }}>
                                                        <button
                                                            onClick={() => handleList(option.type_id)} 
                                                            className="flex">
                                                            <ListItem alignItems="flex-start">
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
                                                        </button>
                                                    </List>)}
                                            </div>
                                        </div>

                                    </Box>
                                </Modal>
                                {/* +<Box component="button" sx={{ display: { xl: 'none', xs: 'block' } }} /> */}
                            </Paper>
                        </div>
                    </div>





                </div>
            </div >
        </div >

    );
}

export default Newroutin;