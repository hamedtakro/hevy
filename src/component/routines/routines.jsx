import React, { useState, useEffect } from 'react';
import Navbar from '../layout/navbar';
import '../../App.css';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import RoutinesDay from './routinesDay';
import { NavLink } from 'react-router-dom';
import {setRoute} from '../../store/slice/routinesdaySlice'
import App from '../layout/home'
import ExampleRoutines from './exampleRoutines'
import { Navigate , Outlet } from 'react-router-dom';

function Routines() {

    const dispatch = useDispatch()
    const [refresh , setRefresh] =useState(true)
    const [routeTitle, setRoute] = useState()
    useEffect(() => {

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
            setRoute(result.data)
        };
        getExercise()
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
            <div>
                <div className='routin-box md:flex mt-7'>
                    <div className=' max-md:w-full mb-5 lg:w-1/5'>
                        <h2 className='font-bold text-xl mb-4'>My Routines</h2>
                        <Button className='m-2 ' variant="outlined" startIcon={<ContentPasteIcon />}>
                            <a className='p-2' href="/newroutin"> <h2>New Routine</h2> </a>
                        </Button>
                    </div>
                    <div className='routin-right md:w-full lg:w-4/5' >

                    <div className='displayStyle'><h2 className='pt-4 length-route'>My Routines {routeTitle?.length}</h2></div> 

                        {routeTitle?.map((item)=> 
                        <div className='displayStyle listBox'>
                            <NavLink to={`/routinesDay/${item.id}`} >{item.title}</NavLink>
                            <ExampleRoutines Id={item.id}  deleteRoutes={deleteRoutes}/>
                        </div>
                       ) }
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Routines;