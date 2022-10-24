import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setInputKG } from '../../../store/slice/exerciseSlice'

const InputAddKG = ({ Index, Id , prev }) => {

    const [kg, setKg] = useState(null)
    const dispatch = useDispatch()
    
    const handleInputKg = (e) => {
      setKg(e.target.value)
    }
  
  
    useEffect(() => {
      dispatch(setInputKG({ kg, Id, Index }))
    }, [kg])
  

  
    return (
  
      <input variant="filled" value={kg} onChange={handleInputKg} className='inputCard' type='number'>
      
      </input>
  
  
    )
}

export default InputAddKG
