import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setInputDistance } from '../../../store/slice/exerciseSlice'
import {setUpdateInputDistance} from '../../../store/slice/routinesdaySlice'

const InputAddDistance = ({IndexSet,separator, SetId ,Index_Id , Id,amount , Ind}) => {


    const [distance, setDistance] = useState(amount)
    const dispatch = useDispatch()

    const handleInputDistance = (e) => {
        setDistance(e.target.value)
    }

   
   
    useEffect(() => {
        if(separator==1){dispatch(setInputDistance({ distance, Id, IndexSet , Ind}))}
        else if(separator==2){dispatch(setUpdateInputDistance({ distance, Id, SetId ,Index_Id}))}
      }, [distance])


    return (
        <input placeholder='0' key={IndexSet} variant="filled" value={distance} onChange={ handleInputDistance} className='inputCard' type='number'>
        </input>

    )
}

export default InputAddDistance
