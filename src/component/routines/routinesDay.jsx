import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import {
    Grid, Card, CardHeader, FormControl, MenuItem, TextareaAutosize,
    Typography, CardContent, IconButton, InputLabel, Avatar, Table,
    TableCell, TableContainer, TableHead, TableBody, TableRow, Paper,
    Menu,
    Button
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import CheckIcon from '@mui/icons-material/Check';

import Fit1 from "../../img/fit1.jpg";
import Fit2 from "../../img/fit2.jpg";
import Fit3 from "../../img/fit3.jpg";

import { deleteExercise } from '../../store/slice/exerciseSlice'
import { setExercise } from '../../store/slice/routinesdaySlice';

import Navbar from '../layout/navbar'
import CheckBox from './checkBox';
import DeleteIcon from '@mui/icons-material/Delete';
import CardRoutineDay from './cardRoutineDay';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';



const RoutinesDay = () => {


    useEffect(() => {
        dispatch(setExercise({ exerciseDay }))
    }, [])
    const exerciseDay = [
        {
            id: 1,
            title: 'Ab Scissors',
            body: 'Abdominals',
            equipment: 'Dumbbell',
            avatar: Fit1,
            type: 'img',
            set: [
                { kg: 10, REPS: 2 },
                { kg: 104, REPS: 23 },
                { kg: 106, REPS: 22 }],
            timer: '30',
            kg: 'KG',
            reps: 'REPS'
        },
        {
            id: 2,
            title: 'Ab Wheel',
            body: 'ghghk',
            equipment: 'Dumbbell',
            avatar: Fit1,
            type: 'video',
            set: [{ kg: 154, REPS: 43 }],
            timer: '25',
            kg: 'KG'
        },
        {
            id: 3,
            title: 'Arnold Press (Dumbbell)',
            body: 'Shoulders ',
            equipment: 'Barbell',
            avatar: Fit3,
            type: 'img',
            set: [
                { kg: 104, REPS: 255 },
                { kg: 44, REPS: 13 }],
            timer: '10',
            reps: 'REPS',
            kg: 'KG'
        }
    ]

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [route , setRoute] = useState()
    const dispatch = useDispatch()

    const list = useSelector(state => state.routinesday.list)

    useEffect(() => {

        getExercise()


    }, [])
    


    async function getExercise() {
        let result = await fetch("http://younikweb.ir/api/v1/routine", {
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
        setRoute(result)
    }

    return (
        <div>
            <Navbar />
            <Paper className='container' >
                <Button color='primary' variant='contained'><Link color='primary' to='/editeRoutin'> update routines </Link></Button>

                
                {list.length > 0 ? <CardRoutineDay />:
                    <div className='fitnessIcon'>
                        <FitnessCenterIcon color="primary" sx={{ fontSize: 100 }} />
                        <h2>Select an exercise</h2>
                    </div>
                }
            </Paper>


        </div>
    )
}

export default RoutinesDay
