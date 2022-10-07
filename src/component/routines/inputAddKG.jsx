import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setInputKG } from '../../store/slice/exerciseSlice'

const InputAddKG = ({ Index, id , prev }) => {

    const [kg, setKg] = useState(null)
    const dispatch = useDispatch()
  
    const handleInputKg = (e) => {
      console.log(e);
      setKg(e.target.value)
    }
  
  
    useEffect(() => {
      dispatch(setInputKG({ kg, id, Index }))
    }, [kg])
  

  
    return (
  
      <input key={Index} variant="filled" value={kg} onChange={handleInputKg} className='inputCard' type='number'>
      {}
      </input>
  
  
    )
}

export default InputAddKG
