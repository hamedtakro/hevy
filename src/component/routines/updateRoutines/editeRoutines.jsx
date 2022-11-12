import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import {
    Grid, Card, CardHeader, FormControl, MenuItem, TextareaAutosize,
    Typography, CardContent, IconButton, InputLabel, Avatar, Table,
    TableCell, TableContainer, TableHead, TableBody, TableRow, Paper,
    Menu, Modal, Hidden, ListItemAvatar, ListItemText, Box,
    List, ListItem, Input, Divider, InputBase, TextField, Button
} from '@mui/material';


import MoreVertIcon from '@mui/icons-material/MoreVert';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';


import { setRoutes, updateAddExercise, addSetUpdate, deleteExercise } from '../../../store/slice/routinesdaySlice';
import { createUpdateRoutes, setUpdateRoutes } from '../../../store/slice/updateRoutineSlice';
// import CheckBox from '../checkBox';

import Navbar from '../../layout/navbar'

import InputAddKG from '../input/inputAddKG';
import InputAddDistance from '../input/inputAddDistance';
import InputAddREPS from '../input/inputAddREPS';
import InputAddTime from '../input/inputAddTime';
import InputAddRestTimer from '../input/inputAddRestTimer'
import InputAddNote from '../input/inputAddNote';
import InputAddTitle from '../input/inputAddTitle';



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

const EditeRoutin = () => {

    const param = useParams()
    const dispatch = useDispatch()

    const list = useSelector(state => state.routinesday.list)
    const updateRoute = useSelector(state => state.updateRoutine.list)

    const [count, setCount] = useState(1)
    const [timer, setTimer] = React.useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [exercises, setExercises] = useState()
    const [equip, setEquip] = useState()
    const [musc, setMusc] = useState()
    const [route, setRoute] = useState()
    const [successAPI, setSuccessAPI] = useState(true)

    const ITEM_HEIGHT = 48;


    const idRoutine = list[0]?.id

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        getExercise()
        getEquipments()
        getMuscles()
    }, [])


    // libery ));

    useEffect(() => {
        if (successAPI == true) {
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
                dispatch(setRoutes(result.data));
                setRoute(result.data)
                setSuccessAPI(false)
            };
            getExercise()
        }
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
        setExercises(result.data)
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

    const open = Boolean(anchorEl)


    // const Timer = exerciseDay?.map((item) => item.timer)

    const handleChangeSelected = (e, id) => {
        setTimer(e.target.value);
        // dispatchManeager({ id, timer })

    }

    // add exercise
    const handleList = (Id) => {
        const chosen = exercises.find((item) => item.id == Id)

        console.log(chosen);
        dispatch(updateAddExercise({ chosen }))

    }

    // add set
    const handleUpdateAddSet = (Id) => {
        console.log(Id);
        dispatch(addSetUpdate(Id))
    }


    //delete
    const handledelete = (option) => {
        dispatch(deleteExercise(option))

    }


    // add title and create new state 
    useEffect(() => {
        dispatch(createUpdateRoutes(list[0]?.title))

    }, [list])

    
    // send server
    const [newRoute, setNewRoute] = useState(false)
    const [successfull ,setSuccessfull] =useState(false)

    const handleSendServer = () => {
        let newList = list[0]
        dispatch(setUpdateRoutes({ newList }))
        setNewRoute(true)
    }

    useEffect(() => {
        if (newRoute == true) {
            console.log(updateRoute);

            console.log(idRoutine);

            let result = fetch(`http://younikweb.ir/api/v1/routine/${idRoutine}`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "appliction/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(updateRoute)
            });
            // setSuccessfull(true)
        }

    }, [newRoute])


    // // response mobile hiden button
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);



    // search 

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
        exercises :
        exercises.filter((option) =>
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
        exercises.filter((option) =>
            option.fa_title.toLowerCase().includes(search.toLowerCase()) ||
            option.en_title.toLowerCase().includes(search.toLowerCase()))



    return (
        <div>
            <Navbar />
            <div className='lg:container md:direction: rtl' >

                <div className='exercise-box md:flex lg:flex sm:w-full lg:mr-21' >

                    <div className='exercise-left hidden max-md:w-full mb-5  lg:ml-7 sm:inline'>
                        <Box component="form" sx={{ '& .MuiTextField-root': { margin: '4px 0', width: '100%' }, }}
                            noValidate autoComplete="off">
                            <div>
                                <TextField
                                    id="outlined-select"
                                    select
                                    value={filterEquipment}
                                    onChange={handleFilterEquipment}
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
                                    onChange={handleFilterMuscles}
                                >
                                    {musc?.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            <h1 className="equipment-list">  {option.title}</h1>
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </Box>
                        <div className='libaryTitle'>
                        </div>
                        <div>
                            <Paper
                                component="form"
                                sx={{
                                    p: '2px 4px', display: 'flex', alignItems: 'center',
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
                            {searched?.map((option) =>
                                <List key={option.id} sx={{
                                    direction: 'rtl', width: '100%',
                                    bgcolor: 'background.paper', maxHeight: 300, position: 'relative', overflow: 'auto',
                                }}>
                                    <ListItem alignItems="flex-start" onClick={() => handleList(option.id)}>
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={'option.avatar'} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            alignItems="flex-start"
                                            primary={
                                                <Typography
                                                    className="newRoute-exersise-title"
                                                >
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
                                    <hr className='border-t-2'></hr>
                                </List>)}
                        </div>
                    </div>
                    <div className="exercise-right max-md:w-full mb-5 lg:w-4/6 md:mr-4 md:ml-10 mt-6">
                        <Button onClick={handleSendServer} variant='contained' className='input-title' > <h2 > ذخیره تغیرات</h2></Button>
                        <h1> {list[0]?.title}</h1>
                        {list[0]?.routine_items?.map((routes) =>
                            < >
                                <Card className='' sx={{ maxWidth: 700, marginTop: 5 }} >
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe">
                                                <img className='imglist' src={"item?.avatar"} />
                                            </Avatar>
                                        }
                                        action={
                                            <button onClick={() => handledelete(routes.id)}> <DeleteIcon /> </button>


                                        }
                                        title={<h1 className='title-card'>{routes.exercise.fa_title}
                                        </h1>}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            <InputAddNote amount={routes.note} separator={2} Id={routes.id} />

                                        </Typography>
                                    </CardContent>

                                    <div className='restTimer' xs={12}>
                                        <InputAddRestTimer separator={2} Id={routes.id} amount={routes.rest_timer} />
                                        <h1 className="m-3 restTimerTitle ">
                                            <AvTimerIcon />  <h2>: Rest Timer</h2>
                                        </h1>
                                    </div>

                                    <TableContainer sx={{ width: "100%" }} component={Paper}>
                                        <Table className='mr-0 ml-0' size="meduim" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow className='' >
                                                    <TableCell align="center">SET</TableCell>
                                                    <TableCell align="center">PREVIOUS</TableCell>
                                                    <TableCell align="center">KG</TableCell>
                                                    <TableCell align="center">Distance</TableCell>
                                                    <TableCell align="center">time</TableCell>

                                                </TableRow>
                                            </TableHead>

                                            <TableBody  >
                                                {routes.routine_sets.map((sets, indexSet) =>

                                                    <TableRow className={`${sets.done == true ? 'row-done' : ''}`} >
                                                        <TableCell align="center" > {indexSet + 1}</TableCell>
                                                        <TableCell align="center" > -</TableCell>
                                                        {sets.amount.map((item) =>

                                                            <TableCell align="center"  >
                                                                {item[0]?.index_id == 1 || item?.index_id == 1 ?
                                    <InputAddKG Id={routes.id} separator={2} Index_Id={item[0]?.index_id || item?.index_id}          
                                    SetId={sets.id} amount={item[0]?.amount || item?.amount} /> :
                                    item[0]?.index_id == 2 || item?.index_id == 2 ?
                                        <InputAddDistance Id={routes.id} separator={2} Index_Id={item[0]?.index_id || item?.index_id}
                                        SetId={sets.id} amount={item[0]?.amount || item?.amount} /> :
                                        item[0]?.index_id == 3 || item?.index_id == 3 ?
                                            <InputAddREPS Id={routes.id} separator={2} Index_Id={item[0]?.index_id || item?.index_id}
                                            SetId={sets.id} amount={item[0]?.amount || item?.amount} /> :
                                            item[0]?.index_id == 4 || item?.index_id == 4 ?
                                            <InputAddTime Id={routes.id} separator={2} Index_Id={item[0]?.index_id || item?.index_id}
                                            SetId={sets.id} amount={item[0]?.amount || item?.amount} /> : ''
                                                                }
                                                            </TableCell>
                                                      )}
                                                    </TableRow>
                                                )}

                                            </TableBody>

                                        </Table>
                                    </TableContainer >
                                    <Grid sx={{ m: 3 }} xs={12} >
                                        <Button sx={{ width: '100%' }} 
                                        onClick={() => handleUpdateAddSet(routes.id)} size={'large'} 
                                        variant="contained">+ Add Set</Button>
                                    </Grid>

                                </Card>


                            </>

                        )}


                        <Hidden smUp>
                            <Button onClick={handleOpenModal} className="float-end  md:h-10 " color="primary" variant="contained" >ADD exercise
                            </Button>
                        </Hidden>
                        <Modal
                            open={openModal}
                            onClose={handleCloseModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Box component="form" container
                                    sx={{ '& .MuiTextField-root': { marginTop: '.5rem ', width: '100%' }, }}
                                    noValidate autoComplete="off">
                                    <div>
                                        <TextField
                                            id="outlined-select"
                                            select
                                            value={filterEquipment}
                                            onChange={handleFilterEquipment}
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
                                            onChange={handleFilterMuscles}
                                        >
                                            <MenuItem ><h1> عضلات</h1></MenuItem>
                                            {musc?.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    <h1 className="equipment-list">  {option.title}</h1>
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </Box>
                                <div className='libaryTitle'>
                                </div>
                                <div>
                                    <Paper
                                        component="form"
                                        sx={{
                                            p: '2px 4px', display: 'flex', alignItems: 'center',
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
                                    {searched?.map((option) =>
                                        <List key={option.id} sx={{
                                            direction: 'rtl', width: '100%',
                                            bgcolor: 'background.paper', maxHeight: 300, position: 'relative', overflow: 'auto'
                                        }}>
                                            <ListItem alignItems="flex-start" onClick={() => handleList(option.id)}>
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src={'option.avatar'} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    alignItems="flex-start"
                                                    primary={
                                                        <Typography
                                                            className="newRoute-exersise-title"
                                                        >
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
                                            <hr className='border-t-2'></hr>
                                        </List>)}
                                </div>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default EditeRoutin
