import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setInputKG } from '../../../store/slice/exerciseSlice'
import {setUpdateInputKg} from '../../../store/slice/routinesdaySlice'

const InputAddKG = ({ IndexSet, Id ,Ind ,separator ,amount,SetId ,Index_Id}) => {


    const [kg, setKg] = useState(amount)
    const dispatch = useDispatch()
    const handleInputKg = (e) => {
     setKg(e.target.value)
     
    }
  
  
    useEffect(() => {

      if(separator==1){dispatch(setInputKG({ kg, Id, IndexSet , Ind}))}
      else if(separator==2){dispatch(setUpdateInputKg({ kg, Id, SetId ,Index_Id}))}

    }, [kg])
  

  
    return (
  
      <input key={IndexSet} variant="filled" value={kg} onChange={handleInputKg} className='inputCard' type='number'>
      
      </input>
  
  
    )
}

export default InputAddKG
