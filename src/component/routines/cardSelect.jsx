import React, { useState, useEffect } from 'react'
import {
    Grid, Card, CardHeader, FormControl,
    MenuItem, TextareaAutosize, Typography, CardContent, IconButton, InputLabel, Avatar, MenuList, ListItemIcon, ListItemText, Modal
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import Select from '@mui/material/Select';
import Fit1 from "../../img/fit1.jpg";
import Fit2 from "../../img/fit2.jpg";
import Fit3 from "../../img/fit3.jpg";
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExercise } from '../../store/slice/exerciseSlice'
import { addSet, addTimer } from '../../store/slice/exerciseSlice';
import Menu from '@mui/material/Menu';
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper } from '@mui/material';
import InputAddKG from './inputAddKG';
import InputAddREPS from './inputAddREPS';
import Timer from './timer';
import ButtunDeleteExercise from './buttunDeleteExercise'
import DeleteIcon from '@mui/icons-material/Delete';




const options = [
    'delete',

];

const ITEM_HEIGHT = 48;





const CardSelect = (props) => {

    const dispatch = useDispatch()
    const [REPS, setREPS] = useState()
    const [kg, setKg] = useState()
    const [timer, setTimer] = useState();
    const [count, setCount] = useState(1)
    const list = useSelector(state => state.exercise.list)


    const exercise = [
        {
            id: 1,
            title: 'Ab Scissors',
            body: 'Abdominals',
            avatar: Fit1
        },
        {
            id: 2,
            title: 'Ab Wheel',
            body: 'Abdominals',
            avatar: Fit2
        }, {
            id: 3,
            title: 'Arnold Press (Dumbbell)',
            body: 'Shoulders ',
            avatar: Fit3
        }, {
            id: 4,
            title: 'Arnold  (Dumbbell)',
            body: 'Shoulders',
            avatar: ""
        },
    ]



    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleSet = (option) => {
        console.log('set' + option);
        setCount(count + 1)
        dispatch(addSet({ option }))
    }

    //   delete 

    const handledelete = (option) => {
        dispatch(deleteExercise({ option }))
    }

    const handleMore = () => {
        return <Modal> <h1>delete</h1> </Modal>
    }
    return (
        <div>

            {list.map((item, ind) =>


                <Card key={item.id} sx={{ maxWidth: 'max', marginTop: 5 }}>
                    <CardHeader className='mt-4 mx-3'
                        avatar={
                            <Avatar className='' aria-label="recipe">
                                <img className='imglist' src={item?.avatar} />
                            </Avatar>
                        }
                        action={
                            <button onClick={() => handledelete(item.id)}> <DeleteIcon /> </button>   
                            
                        }


                        title={<h1>{item?.id}</h1>}
                    />

                    {/* <button > delete</button> */}

                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder=" Note..."
                                style={{ width: '100%', height: 40 }}
                            />
                        </Typography>
                    </CardContent>
                    <Grid container spacing={2} >
                        <Grid xs={2}>
                            <h1 className="m-3 restTimer">
                                <AvTimerIcon /> Rest Timer :
                            </h1>
                        </Grid>
                        <Grid xs={3}>
                            <Timer Id={item.id} />
                        </Grid>
                    </Grid>
                    <Grid xs={7}></Grid>
                    {/* card place   */}

                    <TableContainer sx={{ width: "100%" }} component={Paper}>
                        <Table className='mr-0 ml-0' size="meduim" aria-label="a dense table">
                            <TableHead>
                                <TableRow className='' >
                                    <TableCell align="center">SET</TableCell>
                                    {item.kg ? <TableCell align="center">KG</TableCell> : ''}
                                    {item.reps ? <TableCell align="center">{item?.reps}</TableCell> : ''}
                                </TableRow>
                            </TableHead>
                            {item.set.map((option, ind) =>
                                <TableBody key={ind} >
                                    <TableRow >
                                        <TableCell align="center" > {ind + 1}</TableCell>
                                        <TableCell align="center">
                                            <InputAddKG id={item.id} Index={ind} />
                                        </TableCell>
                                        <TableCell align="center">
                                            <InputAddREPS id={item.id} Index={ind} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}

                        </Table>
                    </TableContainer >
                    <Grid sx={{ my: 3 }} xs={12} >
                        <Button onClick={() => handleSet(item.id)} size={'large'} variant="outlined">+ Add Set</Button>
                    </Grid>

                </Card>

            )
            }


        </div>
    )
}

export default CardSelect




















