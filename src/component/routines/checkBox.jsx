import react , {useState} from 'react'
import Checkbox from '@mui/material/Checkbox';
import { done } from '../../store/slice/exerciseSlice';
import { useDispatch } from 'react-redux';
import {setDone} from '../../store/slice/routinesdaySlice'

const CheckBox = ({ IdSet, IdEx }) => {
  
  const [check, setCheck] = useState(true)

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const dispatch = useDispatch()

  const success = () => {
    setCheck(!check)
    console.log('ok done')
    dispatch(setDone({IdSet , check , IdEx}))
  }


return (
  <>
    <Checkbox {...label} onClick={success} />
  </>
)
}

export default CheckBox
