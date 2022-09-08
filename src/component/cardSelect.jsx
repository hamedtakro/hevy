import React, { useState } from 'react'
import { Grid, Card, CardHeader, FormControl, MenuItem, TextareaAutosize, Typography, CardContent, IconButton, InputLabel, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Fit1 from "../img/fit1.jpg";
import Fit2 from "../img/fit2.jpg";
import Fit3 from "../img/fit3.jpg";
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import AddSet from './addSet'
import { deleteExercise } from '../store/slice/exerciseSlice'
import { addCount } from '../store/slice/countSlice';
import Menu from '@mui/material/Menu';


const ITEM_HEIGHT = 48;


const CardSelect = (props) => {

    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


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



    const [SET, setSET] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSET(event.target.value);
    };


    const [timer, setTimer] = useState('');

    const handleChangeSelected = (event: SelectChangeEvent) => {
        setTimer(event.target.value);
    };
   
//   delete 
    const deleteexercise = (option) => {
        dispatch(deleteExercise({ option, list }))
        console.log("ok");
    }

//  counter
    const [count , setCount] = useState(1)
    const handleSet = (option) => {
        setCount(count +1)
        console.log(option)
        dispatch(addCount({count ,option}))
    }

    return (
        <div>
            {list.map((item) =>

                <Card key={item.id} sx={{ maxWidth: 'max', marginTop: 5 }}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe">
                                <img className='imglist' src={item?.avatar} />
                            </Avatar>
                        }
                        action={
                            <div>
                                <IconButton aria-label="more"
                                    id="long-button"
                                    aria-controls={open ? 'long-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleClick}>
                                    <MoreVertIcon id="outlined-select" />

                                </IconButton>
                                <Menu
                                    id="long-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'long-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    PaperProps={{
                                        style: {
                                            maxHeight: ITEM_HEIGHT * 4.5,
                                            width: '20ch',
                                        },
                                    }}
                                >

                                    <MenuItem onClick={handleClose}>
                                        <button onClick={() => deleteexercise(item.id)}>delete</button>

                                    </MenuItem>

                                </Menu>
                            </div>
                        }
                        title={<h1>{item?.title}</h1>}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder=" Note..."
                                style={{ width: 960, height: 40 }}
                            />
                        </Typography>
                    </CardContent>
                    <Grid container spacing={0}>
                        <Grid xs={2}> <h1 className="m-3 restTimer">  <AvTimerIcon /> Rest Timer :
                        </h1>
                        </Grid>
                        <Grid xs={3}>    <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Timer</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={timer}
                                onChange={handleChangeSelected}
                                autoWidth
                                label="timer"
                            >
                                <MenuItem value="">
                                    <em>none</em>
                                </MenuItem>
                                <MenuItem value={0}>OFF</MenuItem>
                                <MenuItem value={5}> 5 s</MenuItem>
                                <MenuItem value={15}>15 s</MenuItem>
                                <MenuItem value={20}>20 s</MenuItem>
                                <MenuItem value={25}>25 s</MenuItem>
                            </Select>

                        </FormControl>
                        </Grid>
                        <Grid xs={7}></Grid>
                        {/* card place   */}

                        <div key={item.set} style={{ width: "100%" }}  > <AddSet key={item.set} /></div>


                        <Grid sx={{ my: 3 }} xs={12} >
                            <Button onClick={() => handleSet(item.id)} size={'large'} variant="outlined">+ Add Set</Button>
                        </Grid>
                    </Grid>
                </Card>

            )
            }


        </div>
    )
}

export default CardSelect




















