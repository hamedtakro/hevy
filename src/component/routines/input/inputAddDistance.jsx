import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setInputDistance } from '../../../store/slice/setSlice'

const InputAddDistance = ({Index , id}) => {

    const [distance, setDistance] = useState(null)
    const dispatch = useDispatch()

    const handleInputDistance = (e) => {
        setDistance(e.target.value)
    }

    useEffect(() => {
        dispatch(setInputDistance({ distance, id, Index }))
    }, [distance])


    return (
        <input key={Index} variant="filled" value={distance} onChange={ handleInputDistance} className='inputCard' >
        </input>

    )
}

export default InputAddDistance
