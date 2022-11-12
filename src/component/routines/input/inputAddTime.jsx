import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setInputTime } from '../../../store/slice/exerciseSlice'
import {setUpdateInputTime} from '../../../store/slice/routinesdaySlice'

const InputAddTime = ({ IndexSet,separator, SetId ,Index_Id, Id ,amount, Ind }) => {

    const [time, setTime] = useState(amount)
    const dispatch = useDispatch()
  
    const handleInputTime = (e) => {
      setTime(e.target.value)
    }
  
  
    
    useEffect(() => {
      if(separator==1){dispatch(setInputTime({ time, Id, IndexSet , Ind}))}
      else if(separator==2){dispatch(setUpdateInputTime({ time, Id, SetId ,Index_Id}))}
    }, [time])
    
    
  

  
    return (
  
      <input key={IndexSet} variant="filled" value={time} onChange={handleInputTime} className='inputCard' type='number'>
      
      </input>
  
  
    )
}

export default InputAddTime
