import React , {useState , useEffect }from 'react'
import { useDispatch } from 'react-redux';
import {addRestTimer } from '../../../store/slice/exerciseSlice';
import {setUpdateRestTimer} from '../../../store/slice/routinesdaySlice'
import {FormControl ,InputLabel ,Select ,MenuItem} from '@mui/material'

const InputAddRestTimer = ({Id , separator ,amount}) => {

    const [restTimer, setRestTimer] = useState(amount);

    const dispatch = useDispatch()

    const handleChangeTimer = (e) => {
        setRestTimer(e.target.value);

    }

    useEffect(() => {
        
       if(separator==1) {dispatch(addRestTimer ({ Id, restTimer }))}
        if(separator==2){dispatch(setUpdateRestTimer({Id , restTimer}))}
    
    }, [restTimer])
    

    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel  id="demo-simple-select-autowidth-label">Timer</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={handleChangeTimer}
                    autoWidth
                    label="timer"
                    value={restTimer}
                >
                    <MenuItem value={0}>OFF</MenuItem>
                    <MenuItem value={5}> 5 s</MenuItem>
                    <MenuItem value={15}>15 s</MenuItem>
                    <MenuItem value={20}>20 s</MenuItem>
                    <MenuItem value={25}>25 s</MenuItem>
                </Select>
            </FormControl>
                        </>
    )
}

export default InputAddRestTimer
