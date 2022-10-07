import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setInputKG } from '../../../store/slice/routinesdaySlice'

const EditeAddKG = ({ Index, id , prevKg }) => {

  console.log(prevKg);
    const [kg, setKg] = useState(prevKg)
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
      
      </input>
  
  
    )
}

export default EditeAddKG
