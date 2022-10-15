import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setInputNote } from '../../../store/slice/setSlice'
import {TextareaAutosize, Typography} from '@mui/material'
const InputAddNote = ({ Index, id }) => {

    const [note, setNote] = useState(null)
    const dispatch = useDispatch()

    const handleInputNote = (e) => {
        setNote(e.target.value)
    }

    useEffect(() => {
        dispatch(setInputNote({ note, id }))
    }, [note])


    return (
        <Typography variant="body2" color="text.secondary">
            <TextareaAutosize
                aria-label="empty textarea"
                placeholder=" Note..."
                style={{ width: '100%', height: 40 }}
                value={note}
                onChange={ handleInputNote}
            />
        </Typography>


    )
}

export default InputAddNote
