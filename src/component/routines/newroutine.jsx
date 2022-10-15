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
import { addSet } from "../../store/slice/setSlice";
import { createRoutes } from "../../store/slice/setSlice";
import '../../App.css';

import exerciseApi from '../../api/exerciseApi'


function Newroutin() {

    const list = useSelector(state => state.exercise.list)
    const setList = useSelector(state => state.set.setList)
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
        console.log(result);
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
    

        async function sendServer () {
            let item = { setList };
            let result = await fetch("http://younikweb.ir/api/v1/routine", {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type" : "appliction/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            });
            result = await result.json();
            console.log(result);
        } 

    
    // console.log(musc);
    // console.log(exer);
    // console.log(equip);


    const handleList = (option) => {
        const listexercise = exer.find((item) => item.id == option)
        dispatch(createRoutes(option))

        dispatch(setExercise(listexercise))
    }

    // serarch and filter

    const [filterEquipment, setFilterEquipment] = useState(0)
    const handlefilter = (e) => {
        setFilterEquipment(e.target.value)
        setFilterMuscles(0)
    }

    const Filtered = filterEquipment == 0 ?
        exer :
        exer.filter((option) =>
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
        exer.filter((option) =>
            option.primary_muscle_id == filterMuscles
        );

    const [search, setSearch] = useState("")
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const searched = !search ?
        filtered :
        exer.filter((option) =>
            option.title.toLowerCase().includes(search.toLowerCase()));




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






    return (
        <div className='rourin.style' >
            <Navbar />
            <div className='lg:container'>
                <div className='exercise-box md:flex lg:flex sm:w-full' >
                    {/* in ja saz kon */}
                    <div className="exercise-right max-md:w-full mb-5 lg:w-4/6 md:mr-4 mt-6">

                        <div className="mt-1">

                            <Grid container spacing={1} className="mb-4 md:flex">
                                <Grid item xs={3} md={3}>
                                    <h2 className="font-bold lg:text-xl xs:text-xs">Create Routine</h2>
                                </Grid>
                                <Grid item xs={4} md={6}>
                                </Grid>
                                <Grid className="" item xs={3} md={3}>
                                    <Button onClick={sendServer} className="float-end  md:h-10 " color="primary" variant="contained">Save Routine</Button>
                                </Grid>
                            </Grid>

                            <Paper elevation={3} >
                                <input className="m-1" style={{ minWidth: "100%", height: 40 }} type="text" id="lname" name="lname" placeholder="Routine Title"></input>

                                {/* card for task list */}

                                {list.length > 0 ? <CardsSelect /> :
                                    <div className='fitnessIcon'>
                                        <FitnessCenterIcon color="primary" sx={{ fontSize: 100 }} />
                                        <h2>Select an exercise</h2>
                                    </div>

                                }
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
                                        <Box component="form" container sx={{ '& .MuiTextField-root': { marginTop: '.5rem ', width: '100%' }, }} noValidate autoComplete="off">
                                            <p>Filters</p>
                                            <div>
                                                <TextField
                                                    id="outlined-select"
                                                    select
                                                    value={filterEquipment}
                                                    onChange={handlefilter}
                                                >
                                                    {equip?.map((option) => (
                                                        <MenuItem key={option.id} value={option.id}  >
                                                            <h1 className="equipment-list">{option.title}</h1>
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
                                                    {musc?.map((option) => (
                                                        <MenuItem key={option.id} value={option.id}>
                                                            {option.title}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </div>
                                        </Box>
                                        <div>
                                            <div className='libaryTitle m-4'>
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
                                                {Filtered?.map((option) =>
                                                    <List key={option.typ_id} sx={{ direction: 'rtl', width: '100%', bgcolor: 'background.paper', marginTop: '1rem', maxHeight: 300, position: '', overflow: 'auto', }}>
                                                        <button
                                                            onClick={() => handleList(option.type_id)} key={option.type_id}
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
                                    {equip?.map((option) => (
                                        <MenuItem key={option.id} value={option.id}  >
                                            <h1 className="equipment-list">{option.title}</h1>
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
                                    {musc?.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>

                        </Box>

                        <div>
                            <div className='libaryTitle'>
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
                                {Filtered?.map((option) =>
                                    <List key={option.type_id} sx={{ direction: 'rtl', width: '100%', bgcolor: 'background.paper', maxHeight: 300, position: 'relative', overflow: 'auto', }}>
                                        <button
                                            onClick={() => handleList(option.type_id)} key={option.type_id}
                                            className="list-button">
                                            <ListItem alignItems="flex-start" >
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src={"option.avatar"} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    alignItems="flex-start"
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
                    </div>
                </div>
            </div >
        </div >

    );
}

export default Newroutin;