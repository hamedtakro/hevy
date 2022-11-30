import React, { useState, useEffect } from 'react'
import {
    Paper, Box, Hidden, Button, Modal, Typography, ListItemAvatar, Stack, TextField, Avatar,
    ListItemText, List, ListItem, MenuItem, InputLabel, FormControl, Select, OutlinedInput

} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { createFormExercise } from '../../store/slice/createExercise'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const AddExercise = () => {

    const [faTitle, setFaTitle] = useState(null)
    const [enTitle, setEnTitle] = useState(null)
    const [types, setTypes] = useState()
    const [type, setType] = useState(null)
    const [equipments, setEquipments] = useState()
    const [equipment, setEquipment] = useState(null)
    const [muscles, setMuscles] = useState()
    const [primaryMuscle, setPrimaryMuscle] = useState(null)
    const [otherMuscles, setOtherMuscles] = useState(null)

    const dispatch = useDispatch()
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: {
            'image/jpeg': ['.jpeg', '.png']
        }
    });

    useEffect(() => {
        getTypes();
        getEquipments();
        getMuscles()
    }, [])

    async function getTypes() {
        let result = await fetch("http://younikweb.ir/api/v1/types", {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "appliction/json",
                "Accept": "application/json"
            },
            // body: JSON.stringify(item)
        });
        result = await result.json()
        setTypes(result.data)
    }

    async function getEquipments() {
        let result = await fetch("http://younikweb.ir/api/v1/equipments", {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "appliction/json",
                "Accept": "application/json"
            },
            // body: JSON.stringify(item)
        });
        result = await result.json()
        setEquipments(result.data)
    }

    async function getMuscles() {
        let result = await fetch("http://younikweb.ir/api/v1/muscles", {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "appliction/json",
                "Accept": "application/json"
            },
            // body: JSON.stringify(item)
        });
        result = await result.json()
        setMuscles(result.data)
    }

    const [exercise, setExercise] = useState({
        fa_title: '',
        en_title: '',
        type_id: '',
        equipment_id: '',
        primary_muscle_id: '',
        other_muscles: []
    })

    const handleType = (e) => { setExercise(previousState => { return { ...previousState, type_id: e.target.value } }) }
    const handleFaTitle = (e) => { setExercise(previousState => { return { ...previousState, fa_title: e.target.value } }) }
    const handleEnTitle = (e) => { setExercise(previousState => { return { ...previousState, en_title: e.target.value } }) }
    const handleEquipments = (e) => { setExercise(previousState => { return { ...previousState, equipment_id: e.target.value } }) }
    const handlePrimaryMuscle = (e) => { setExercise(previousState => { return { ...previousState, primary_muscle_id: e.target.value } }) }
    const handleOtherMuscles = (e) => { setExercise(previousState => { return { ...previousState, other_muscles:[ e.target.value ] } } ) }

    
        async function handleSubmit () {
            let item = {exercise}
            let result = await fetch("http://younikweb.ir/api/v1/exercises", {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type" : "appliction/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(exercise)
            });
            console.log(result);
        }
    

    return (
        <div >
            <Box className="modalBox ">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    ساخت ورزش
                </Typography>
                <div className="container">
                    <div {...getRootProps({ className: 'dropzone , pointer' })} >
                        <input {...getInputProps()} />
                        {!isDragActive && (
                            <>
                                <Stack direction="row" spacing={2}>
                                    <Avatar sx={{
                                        width: '80px', height: '80px', border: 'solid 2px rgb(224, 224, 224)',
                                        backgroundColor: '#fff'
                                    }}>
                                        <CameraAltIcon sx={{ fontSize: '2rem', color: '#000' }} />
                                    </Avatar>
                                </Stack>
                                <h3>Add Image</h3>
                            </>
                        )}
                    </div>
                </div>
                <div className="listcreateExercise">
                    <input value={enTitle} onChange={handleEnTitle} type="text" id="lname" name="lname" placeholder=" نام انگلیسی ورزش"></input>
                    <input value={faTitle} onChange={handleFaTitle} type="text" id="lname" name="lname" placeholder=" نام فارسی ورزش"></input>
                </div>
                <div className="formatSelect">
                    <h3>تایپ ورزش</h3>
                    <div style={{ width: '300px' }} className="formatControler">
                        <FormControl className="formControl" >
                            <InputLabel sx={{ lineHeight: '.7em' }}
                                id="demo-simple-select-autowidth-label">Select</InputLabel>
                            <Select
                                sx={{ height: '40px' }}
                                id="demo-simple-select-autowidth"
                                value={type}
                                onChange={handleType}
                                autoWidth
                                label="Select"
                            >
                                <MenuItem value="0" sx={{ width: '290px' }}>
                                    <em>None</em>
                                </MenuItem>
                                {types?.map((types) => <MenuItem value={types.id}>{types.title}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <hr style={{ margin: '20px 0' }}></hr>
                <div className="formatSelect">
                    <h3>لوازم ورزشی</h3>
                    <div className="formatControler">
                        <FormControl className="formControl" >
                            <InputLabel sx={{ lineHeight: '.7em' }}
                                id="demo-simple-select-autowidth-label">Select</InputLabel>
                            <Select
                                sx={{ height: '40px' }}
                                id="demo-simple-select-autowidth"
                                value={equipment}
                                onChange={handleEquipments}
                                autoWidth
                                label="Select"
                            >
                                <MenuItem value="0" sx={{ width: '190px' }}>
                                    <em>None</em>
                                </MenuItem>
                                {equipments?.map((equipments) => <MenuItem value={equipments.id}>{equipments.title}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <hr style={{ margin: '20px 0' }}></hr>
                <div className="formatSelect">
                    <h3> مهمترین عضله</h3>
                    <div className="formatControler">
                        <FormControl className="formControl" >
                            <InputLabel sx={{ lineHeight: '.7em' }}
                                id="demo-simple-select-autowidth-label">Select</InputLabel>
                            <Select
                                sx={{ height: '40px' }}
                                id="demo-simple-select-autowidth"
                                value={primaryMuscle}
                                onChange={handlePrimaryMuscle}
                                autoWidth
                                label="Select"
                            >
                                <MenuItem value="0" sx={{ width: '190px' }}>
                                    <em>None</em>
                                </MenuItem>
                                {muscles?.map((muscle) => <MenuItem value={muscle.id}>{muscle.title}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <hr style={{ margin: '20px 0' }}></hr>
                <div className="formatSelect">
                    <h3>دیگر عضلات</h3>
                    <div>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                // multiple
                                value={otherMuscles}
                                onChange={handleOtherMuscles}
                                // input={<OutlinedInput label="Tag" />}
                                // renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {muscles?.map((muscles) => (
                                    <MenuItem key={muscles.id} value={muscles.id}>
                                        {/* <Checkbox  /> */}
                                        <ListItemText primary={muscles.title} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                </div>
                <div  >
                    <Button onClick={handleSubmit} className="inputSend" color="primary"
                        variant="contained" type="submit" > <Typography >ارسال</Typography></Button>

                </div>
            </Box>
        </div>


    )
}

export default AddExercise
