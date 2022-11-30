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


import { setRoutes, updateAddExercise, addSetUpdate, updateDeleteExercise } from '../../../store/slice/routinesdaySlice';
import { createUpdateRoutes, setUpdateRoutes } from '../../../store/slice/updateRoutineSlice';
// import CheckBox from '../checkBox';

import Navbar from '../../layout/navbar'
import LabelBottomNavigation from '../../layout/buttomNavigation'
import InputAddKG from '../input/inputAddKG';
import InputAddDistance from '../input/inputAddDistance';
import InputAddREPS from '../input/inputAddREPS';
import InputAddTime from '../input/inputAddTime';
import InputAddRestTimer from '../input/inputAddRestTimer'
import InputAddNote from '../input/inputAddNote';
import InputAddTitle from '../input/inputAddTitle';
import ExampleCard from '../exampleCard';
import MenuExercise from '../menuExercise';
import Routines from '../routines';


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
    const [equipments, setEquipments] = useState()
    const [muscles, setMuscles] = useState()
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



    // libery ));

    useEffect(() => {
        if (successAPI == true) {
            async function getRoutine() {
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
            getRoutine()
        }
    }, [])


    const open = Boolean(anchorEl)


    // const Timer = exerciseDay?.map((item) => item.timer)

    const handleChangeSelected = (e, id) => {
        setTimer(e.target.value);
        // dispatchManeager({ id, timer })

    }

    // add set
    const handleUpdateAddSet = (Id) => {
        console.log(Id);
        dispatch(addSetUpdate(Id))
    }

    // add title and create new state 
    useEffect(() => {
        dispatch(createUpdateRoutes(list[0]?.title))

    }, [list])


    // send server
    const [newRoute, setNewRoute] = useState(false)
    const [successfull, setSuccessfull] = useState(false)

    const handleSendServer = () => {
        let newList = list[0]
        dispatch(setUpdateRoutes({ newList }))
        setNewRoute(true)
    }

    useEffect(() => {
        if (newRoute == true) {
            let result = fetch(`http://younikweb.ir/api/v1/routine/${idRoutine}`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "appliction/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(updateRoute)
            });
            setSuccessfull(true)
        }

    }, [newRoute])


    // // response mobile hiden button
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);




    if (successfull){ return <Routines />}

    return (
        <div>
            <Navbar />
            <div className='lg:container md:direction: rtl' >
                <div className='exercise-box md:flex lg:flex sm:w-full lg:mr-21' >
                    <div className='exercise-left hidden max-md:w-full mb-5  lg:ml-7 md:inline '>
                        <div>
                            <MenuExercise separator={2} />
                        </div>
                    </div>
                    <div className="exercise-right max-md:w-full mb-5 md:w-4/6 md:mr-4 md:ml-10 mt-6">
                        <Button onClick={handleSendServer} variant='contained' className='input-title' > <h2 > ذخیره تغیرات</h2></Button>
                        <div className='mt-5 float-right ' sx={{ backgroundColor: '#2196f3' }}>  <Typography > {list[0]?.title}</Typography></div>
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
                                            <ExampleCard Id={routes.id} seperator={2} />
                                        }
                                        title={
                                        <h1 className='title-card'>{routes.exercise.fa_title}</h1>
                                        }
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            <InputAddNote amount={routes.note} separator={2} Id={routes.id} />
                                        </Typography>
                                    </CardContent>
                                    <div className='restTimer' xs={12}>
                                        <InputAddRestTimer separator={2} Id={routes.id} amount={routes.rest_timer} />
                                        <h1 className="m-3 restTimerTitle ">
                                            <AvTimerIcon />  <Typography>: زمان استراحت  </Typography>
                                        </h1>
                                    </div>

                                    <TableContainer sx={{ width: "100%" }} component={Paper}>
                                        <Table className='mr-0 ml-0' size="meduim" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow className='' >
                                                    <TableCell align="center"><Typography>ست</Typography></TableCell>
                                                    {/* <TableCell align="center">PREVIOUS</TableCell> */}
                                                    <TableCell align="center"><Typography>وزن</Typography></TableCell>
                                                    <TableCell align="center"><Typography>مسافت</Typography></TableCell>
                                                    <TableCell align="center"><Typography>زمان</Typography></TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody  >
                                                {routes.routine_sets.map((sets, indexSet) =>
                                                    <TableRow className={`${sets.done == true ? 'row-done' : ''}`} >
                                                        <TableCell align="center" > {indexSet + 1}</TableCell>
                                                        {/* <TableCell align="center" > -</TableCell> */}
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
                        <Hidden mdUp>
                            <Button onClick={handleOpenModal} className="float-end  h-10 button " color="primary" variant="contained" ><Typography> اضافه کردن ورزش</Typography>
                            </Button>
                        </Hidden>
                        <Modal
                            open={openModal}
                            onClose={handleCloseModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style} className='exercise-left'>
                                <MenuExercise separator={2}/>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditeRoutin
