import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setInputREPS } from '../../../store/slice/exerciseSlice'
import {setUpdateInputREPS} from '../../../store/slice/routinesdaySlice'

const InputAddREPS = ({IndexSet, SetId ,Index_Id ,separator, Id ,amount, Ind}) => {

    const [REPS, setREPS] = useState(amount)
    const dispatch = useDispatch()

    const handleInputREPS = (e) => {
        setREPS(e.target.value)
    }

   
    useEffect(() => {
        if(separator==1){dispatch(setInputREPS({ REPS, Id, IndexSet , Ind}))}
        else if(separator==2){dispatch(setUpdateInputREPS({ REPS, Id, SetId ,Index_Id}))}
      }, [REPS])
   


    return (
        <input key={IndexSet} variant="filled" value={REPS} onChange={ handleInputREPS} className='inputCard' type='number'></input>

    )
}

export default InputAddREPS
