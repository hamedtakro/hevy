import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setInputTime } from '../../../store/slice/exerciseSlice'

const InputAddTime = ({ Index, Id  }) => {

    const [time, setTime] = useState(null)
    const dispatch = useDispatch()
  
    const handleInputTime = (e) => {
      console.log(e);
      setTime(e.target.value)
    }
  
  
    useEffect(() => {
      dispatch(setInputTime({ time, Id, Index }))
    }, [time])
  

  
    return (
  
      <input key={Index} variant="filled" value={time} onChange={handleInputTime} className='inputCard' type='number'>
      
      </input>
  
  
    )
}

export default InputAddTime
