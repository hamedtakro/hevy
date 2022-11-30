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
import CardSelect from './cardSelect';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { createRoutes, setRoutes } from "../../store/slice/routineSlice";
import '../../App.css';
import Routines from "./routines";
import LabelBottomNavigation from '../layout/buttomNavigation'
import AddExercise from '../exerciseShow/addExercise';
import MenuExercise from "./menuExercise";



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
    marginTop: 7
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


    const [exer, setExer] = useState()

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



    if (Successfull) {
        return <Routines />
    }

    return (
        <div className='newRoutin-style md:direction: rtl' >
            <Navbar />

            <div className='lg:container'>
                <div className='exercise-box md:flex lg:flex sm:w-full lg:mr-21 ' >
                    <div className='exercise-left hidden  max-md:w-full mb-5  lg:ml-7 md:inline '>
                    <MenuExercise separator={1} />
                    </div>
                    {/* in ja saz kon */}
                    <div className="exercise-right max-md:w-full mb-5 md:w-4/6 md:ml-14 mt-8 md:mr-1">
                        <div className="mt-1">
                            <Grid item xs={3} md={3}>
                                <Button onClick={handleSetList} className="float-end  md:h-11 "
                                    color="primary" variant="contained"><h2 className="buttonRoute"> ذخیره روتین</h2> </Button>
                            </Grid>
                            <Paper elevation={3} className="mt-4   ">

                                <div className=" ">
                                    {list.length > 0 ? <CardSelect /> :
                                        <div className='emptyRight '>
                                            <FitnessCenterIcon color="primary" className="fitnessIcon" sx={{ fontSize: 80 }} />
                                            <Typography> لطفا یک ورزش انتخاب کنید</Typography>
                                        </div>
                                    }
                                </div>
                                <Hidden mdUp>  <Button onClick={handleOpen} className="float-end h-10 button
                                " color="primary" variant="contained" ><Typography> اضافه کردن ورزش</Typography>
                                </Button>
                                </Hidden>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style} className='exercise-left'>
                                    <MenuExercise separator={1}/>
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