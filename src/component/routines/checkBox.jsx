import React, { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import { done } from '../../store/slice/exerciseSlice';
import { useDispatch } from 'react-redux';
import {setDone} from '../../store/slice/routinesdaySlice'

const CheckBox = ({ Id, Index, doneSet }) => {
  const [check, setCheck] = useState(true)


  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const dispatch = useDispatch()

  const success = () => {
    setCheck(!check)

    dispatch(setDone({Id , check , Index}))
  }


return (
  <>
    <Checkbox {...label} onClick={success} />
  </>
)
}

export default CheckBox
