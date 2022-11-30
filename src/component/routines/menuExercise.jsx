import React, { useState, useEffect } from 'react'
import { List, ListItem, ListItemAvatar, ListItemText, Typography, Avatar, Box, Paper, InputBase, IconButton ,Modal ,Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import AddExercise from '../exerciseShow/addExercise'
import { setExercise } from '../../store/slice/exerciseSlice'
import { updateAddExercise } from '../../store/slice/routinesdaySlice'

const MenuExercise = ({separator}) => {


    const [exercises, setExercises] = useState()
    const [equipments, setEquipments] = useState()
    const [muscles, setMuscles] = useState()

    const dispatch = useDispatch()
    // api

    useEffect(() => {
        getExercise()
        getEquipments()
        getMuscles()
    }, [])

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
        setExercises(result.data)
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

    // create exercise 

    const [openCreateList, setOpenCreateList] = useState(false)
    const handleOpenCreate = () => setOpenCreateList(true)
    const handleCloseCreate = () => setOpenCreateList(false)

    // add exercise

    const handleList = (Id) => {
        const chosen = exercises.find((item) => item.id == Id)
        if(separator==1){dispatch(setExercise({ chosen }))}
         if(separator==2){dispatch(updateAddExercise({ chosen }))}
    }


    // search 

    const [filterEquipment, setFilterEquipment] = useState('')
    const [filterMuscles, setFilterMuscles] = useState('')
    const [search, setSearch] = useState('')
    const handleFilterEquipment = (e) => {
        setFilterEquipment(e.target.value)
        setSearch('')
    }

    const handleFilterMuscles = (e) => {
        setFilterMuscles(e.target.value)
        setSearch('')
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const Filtered = filterEquipment == 0 ?
        exercises :
        exercises.filter((option) =>
            option.equipment_id == filterEquipment
            // option.equipment.title.toLowerCase().includes(filterEquipment.toLowerCase())
        );


    const filtered = filterMuscles == 0 ?
        Filtered :
        Filtered.filter((option) =>
            option.primary_muscle_id == filterMuscles
        );


    const searched = !search ?
        filtered :
        exercises.filter((option) =>
            option.fa_title.toLowerCase().includes(search.toLowerCase()) ||
            option.en_title.toLowerCase().includes(search.toLowerCase()))



    return (
        <div >
            <Box component="form" container
                sx={{ '& .MuiTextField-root': { marginTop: '.5rem ', width: '100%' }, }}
                noValidate autoComplete="off">
                {/* <Typography>فیلتر :</Typography> */}
                <div className="flex justify-center menuFilter" >
                    <div className="mb-3 w-96 dir-rtl  ">
                        <Typography >
                            <select
                                value={filterEquipment}
                                onChange={handleFilterEquipment}
                                className="h-18 form-select appearance-none block w-full px-3 py-3 text-base font-normal
                               text-gray-700  bg-white bg-clip-padding bg-no-repeat
                               border border-solid border-gray-300 rounded transition ease-in-out m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                aria-label="Default select example">
                                <option key='0' value='0'> <Typography className="fv">لوازم ورزشی</Typography></option>
                                {equipments?.map((item) => <option className="fv" key={item.id} value={item.id}>
                                    <h1>{item.title}</h1></option>)}
                            </select>
                        </Typography>
                    </div>
                </div>
                <div className="flex justify-center menuFilter">
                    <div className="mb-3 w-96 ">
                        <Typography>
                            <select
                                value={filterMuscles}
                                onChange={handleFilterMuscles}
                                className="h-18 form-select appearance-none block w-full px-3 py-3 text-base font-normal
                 text-gray-700  bg-white bg-clip-padding bg-no-repeat  border border-solid
                  border-gray-300  rounded transition ease-in-out m-0 focus:text-gray-700
                  focus:bg-white focus:border-blue-600 focus:outline-none"
                                aria-label="Default select example">
                                <option key='0' value='0'> <h1 >عضلات</h1></option>
                                {muscles?.map((item) => <option key={item.id} value={item.id}><h1>{item.title}</h1></option>)}
                            </select>
                        </Typography>
                    </div>
                </div>
            </Box>
             <button onClick={handleOpenCreate} 
         color="primary" variant="contained" ><Typography> ایجاد ورزش جدید +</Typography>
            </button>
            <Modal
                open={openCreateList}
                onClose={handleCloseCreate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <AddExercise />
            </Modal>
            <div>
                <Paper
                    component="form"
                    sx={{
                        p: '2px 4px', display: 'flex', alignitems: 'center',
                        backgroundColor: 'rgb(240, 240, 240);'
                    }}
                >
                    <IconButton type="submit" sx={{ p: '5px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="جستجوی ورزش"
                        inputProps={{ 'aria-label': 'search exercise' }}
                        onChange={handleSearch}
                        value={search}
                    />
                </Paper>
            </div>
            <div>
                <List sx={{
                    direction: 'rtl', width: '100%',
                    bgcolor: 'background.paper', maxHeight: 400, maxWidth: 360, position: 'relative', overflow: 'auto',
                }}>
                    {searched?.map((option, index) =>
                        <button
                            onClick={() => handleList(option.id)}
                            className="list-button">
                            <ListItem alignItems="flex-start " >
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={"option.avatar"} />
                                </ListItemAvatar>
                                <ListItemText
                                    alignItems="flex-start"
                                    primary={
                                        <Typography>
                                            {option.fa_title}
                                        </Typography>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            {option.primary_muscle.title}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </button>
                    )}
                </List>
            </div>
        </div>
    )
}

export default MenuExercise
