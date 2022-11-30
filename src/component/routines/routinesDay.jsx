import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import {Button} from '@mui/material';
import Navbar from '../layout/navbar'
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
                {/* <Button  color='primary' variant='contained'> */}
                    {/* <Link color='primary' to='/editeRoutin'> update routines </Link> */}
                {/* </Button> */}
            </div>
            <div className=' md:flex routine-day' >
                <CardRoutineDay />
            </div>
        </div>
    )
}

export default RoutinesDay
