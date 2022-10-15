import React , {useState , useEffect }from 'react'
import { useDispatch } from 'react-redux';
import {addTimer } from '../../../store/slice/setSlice'
import {FormControl ,InputLabel ,Select ,MenuItem} from '@mui/material'

const InputAddRestTimer = ({Id}) => {

    const [timer, setTimer] = useState(0);

    const dispatch = useDispatch()

    const handleChangeTimer = (e) => {
        setTimer(e.target.value);

    }

    useEffect(() => {
        
        dispatch(addTimer ({ Id, timer }))

    
    }, [timer])
    

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
                    value={timer}
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
