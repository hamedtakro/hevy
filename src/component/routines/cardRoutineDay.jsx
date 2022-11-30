import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
    Grid, Card, CardHeader, FormControl, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper,
    Box, TextField, InputBase, List, ListItem, ListItemAvatar, Button, Hidden,
    MenuItem, TextareaAutosize, Typography, CardContent, IconButton, InputLabel, Avatar, MenuList,
    ListItemIcon, ListItemText, Modal
} from '@mui/material';


import AvTimerIcon from '@mui/icons-material/AvTimer';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

import { updateDeleteExercise, setRoutes, addSetUpdate, updateAddExercise } from '../../store/slice/routinesdaySlice';

import CheckBox from './checkBox';
import LinearDeterminate from './progressDone'

import InputAddRestTimer from './input/inputAddRestTimer';
import InputAddKG from './input/inputAddKG';
import InputAddDistance from './input/inputAddDistance';
import InputAddREPS from './input/inputAddREPS';
import InputAddTime from './input/inputAddTime';
import InputAddNote from './input/inputAddNote';
import ExampleCard from './exampleCard';

import MenuExercise from './menuExercise';
import Fit2 from "../../img/fit2.jpg";


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

const CardRoutineDay = () => {

    const list = useSelector(state => state.routinesday.list)
    const param = useParams()
    const dispatch = useDispatch()
    const [route, setRoute] = useState()
    const [successAPI, setSuccessAPI] = useState(true)

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


    const handleAddSet = (Id) => {
        dispatch(addSetUpdate(Id))
    }


    // // response mobile hiden button
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);



    return (
        <div className='lg:container md:direction: rtl' >
            <div className='exercise-box md:flex lg:flex sm:w-full lg:mr-21 ' >
                <div className='exercise-left hidden max-md:w-full mb-5  lg:ml-7 md:inline '>
                    <MenuExercise separator={2} />
                </div>
                <div className="exercise-right max-md:w-full mb-5 lg:w-4/6 md:mr-4 md:ml-10 mt-6">
                    {list[0]?.routine_items?.map((routes) =>
                        <Card sx={{ maxWidth: 700, marginTop: 5 }}  >
                            <CardHeader className='mt-5'
                                avatar={
                                    <Avatar aria-label="recipe">
                                        <img className='imglist' src={Fit2} />
                                    </Avatar>
                                }
                                action={<ExampleCard Id={routes.id} seperator={2} />}
                                title={<h1 className='title-card '>{routes?.exercise.fa_title}</h1>}
                            />
                            <CardContent className='mb-0'>
                                <Typography variant="body2" color="text.secondary">
                                    <InputAddNote Id={routes.id} amount={routes.note} />
                                </Typography>
                            </CardContent>
                            <div className='restTimer mt-0' xs={12}>
                                <InputAddRestTimer separator={1} Id={routes.id} amount={routes.rest_timer} />
                                <h1 className="m-3 restTimerTitle ">
                                    <AvTimerIcon />  <Typography> زمان استراحت</Typography>
                                </h1>
                            </div>
                            <TableContainer sx={{ width: "100%" }} component={Paper}>
                                <Table className='mr-0 ml-0' size="meduim" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow className='' >
                                            <TableCell align="center"><CheckIcon /></TableCell>
                                            <TableCell align="center"><Typography>ست</Typography></TableCell>
                                            {routes.exercise?.type.indices.map((type) => <TableCell key={type.id} align="center"><Typography>{type.title}</Typography></TableCell>)}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody  >
                                        {routes.routine_sets.map((sets, indexSet) =>
                                            <TableRow className={`${sets.done == true ? 'row-done' : ''}`} >
                                                <TableCell align="center"><CheckBox IdSet={indexSet} IdEx={routes.id} /> </TableCell>
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
                            {/* {routes.routine_sets.map((sets, indexSet) =>   {sets.done == true ? <LinearDeterminate /> : ''})} */}

                            <Grid sx={{ m: 3 }} xs={12} >
                                <Button sx={{ width: '100%' }} onClick={() => handleAddSet(routes.id)}
                                    size={'large'} variant="contained">  add set </Button>
                            </Grid>
                        </Card>
                    )
                    }
                    <Hidden mdUp>
                        <Button onClick={handleOpenModal} className="float-end  h-10  button" color="primary" variant="contained"> <Typography> اضافه کردن ورزش </Typography></Button>
                    </Hidden>
                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} className='exercise-left'>
                            <MenuExercise separator={2} />
                        </Box>
                    </Modal>
                </div>
            </div>
        </div >
    )

}
export default CardRoutineDay