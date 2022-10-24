import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
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

import Navbar from '../layout/navbar'
import CheckBox from './checkBox';
import DeleteIcon from '@mui/icons-material/Delete';
import CardRoutineDay from './cardRoutineDay';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';



const RoutinesDay = () => {

    const params = useParams()


    const [anchorEl, setAnchorEl] = React.useState(null);
    const [route, setRoute] = useState(null)
    const dispatch = useDispatch()

    const list = useSelector(state => state.routinesday.list)




    return (
        <div className='routin-style'>
            <Navbar />
            <div className='button-update'>
                <Button  color='primary' variant='contained'>
                    <Link color='primary' to='/editeRoutin'> update routines </Link>
                </Button>
            </div>
            <div className=' md:flex routine-day' >
                <CardRoutineDay />
            </div>
        </div>
    )
}

export default RoutinesDay
