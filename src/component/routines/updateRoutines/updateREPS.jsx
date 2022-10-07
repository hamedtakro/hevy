import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setInputREPS } from '../../../store/slice/routinesdaySlice'

const EditeAddREPS = ({Index , id ,prevREPS}) => {

    const [REPS, setREPS] = useState(prevREPS)
    const dispatch = useDispatch()

    const handleInputREPS = (e) => {
        setREPS(e.target.value)
    }

    useEffect(() => {
        dispatch(setInputREPS({ REPS, id, Index }))
    }, [REPS])


    return (
        <input key={Index} variant="filled" value={REPS} onChange={ handleInputREPS} className='inputCard' type='number'>
        </input>

    )
}

export default EditeAddREPS
