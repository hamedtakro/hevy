import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setInputREPS } from '../../../store/slice/exerciseSlice'

const InputAddREPS = ({Index , Id}) => {

    const [REPS, setREPS] = useState(null)
    const dispatch = useDispatch()

    const handleInputREPS = (e) => {
        setREPS(e.target.value)
    }

    useEffect(() => {
        dispatch(setInputREPS({ REPS, Id, Index }))
    }, [REPS])


    return (
        <input key={Index} variant="filled" value={REPS} onChange={ handleInputREPS} className='inputCard' type='number'>
        </input>

    )
}

export default InputAddREPS
