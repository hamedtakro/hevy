import React, { useState, useEffect } from 'react';
import Navbar from '../layout/navbar';
import LabelBottomNavigation from '../layout/buttomNavigation'
import '../../App.css';
import { useDispatch } from 'react-redux';
import { Button, Box } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import RoutinesDay from './routinesDay';
import { Link, NavLink } from 'react-router-dom';
import {  remove} from '../../store/slice/routinesdaySlice'
import App from '../layout/home'
import ExampleRoutines from './exampleRoutines'
import { Navigate, Outlet } from 'react-router-dom';
import { Typography } from '@mui/material';

function Routines() {

    const dispatch = useDispatch()
    const [refresh, setRefresh] = useState(true)
    const [routeTitle, setRoute] = useState()
    useEffect(() => {
    dispatch(remove())

    }, [])
    
    useEffect(() => {

        async function getRoutine() {
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
            setRoute(result.data)
        };
        getRoutine()
        setRefresh(false)
    }, [refresh])

    
    const deleteRoutes = async (Id) => {

        let result = await fetch(`http://younikweb.ir/api/v1/routine/${Id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "appliction/json",
                "Accept": "application/json"
            },
            // body: JSON.stringify(item)

        });
        setRefresh(true)
    }


    return (
        <div className='routin-style' >
            <Navbar />
            <div className='hidden sm:block  md:h-[43rem]'>
                <div className='routin-box md:flex mt-7'>
                    <div className=' max-md:w-full mb-5 lg:w-1/5 md:mx-3 md:-mr-10'>
                        <Button className='m-2 ' variant="outlined" startIcon={<ContentPasteIcon />}>
                            <Link className='p-2 fontB' to="/newroutin"> <Typography> روتین جدید</Typography> </Link>
                        </Button>
                    </div>
                    <div className='routin-right md:w-full lg:w-4/6  ' >
                        <div className='displayStyle'><Typography className='pt-4 length-route'>روتین های من ({routeTitle?.length})</Typography ></div>
                        {routeTitle?.map((item) =>
                            <div className='displayStyle listBox '>
                                <NavLink to={`/routinesDay/${item.id}`} > <Typography className='fontB'> {item.title}</Typography></NavLink>
                                <ExampleRoutines Id={item.id} deleteRoutes={deleteRoutes} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='block sm:hidden'>
                <div className='routinBoxMobile  mt-7'>
                    <div className=' max-md:w-full mb-5 '>
                        <Button className='m-2 ' variant="outlined" startIcon={<ContentPasteIcon />}>
                            <Link className='p-2 fontB' to="/newroutin"> <Typography> روتین جدید</Typography> </Link>
                        </Button>
                    </div>
                    <div className='routin-right   ' >
                        <div className='displayStyle'><Typography className='pt-4 length-route'>روتین های من ({routeTitle?.length})</Typography ></div>
                        {routeTitle?.map((item) =>
                            <div className='displayStyle listBox '>
                                <NavLink to={`/routinesDay/${item.id}`} > <Typography className='fontB'> {item.title}</Typography></NavLink>
                                <ExampleRoutines Id={item.id} deleteRoutes={deleteRoutes} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Routines;

// block sm:hidden