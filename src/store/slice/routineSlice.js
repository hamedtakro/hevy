import { createSlice } from '@reduxjs/toolkit'
import { data } from 'autoprefixer';
import { useSelector, useDispatch } from 'react-redux';


const routineSlice = createSlice({
    name: 'routine',
    initialState: {
        list: [],


    },
    reducers: {

        createRoutes: (state, { payload }) => {
            const { title } = payload
            state.list = {
                title: title,
                exercises: []
            }
        },


        setRoutes:(state , {payload}) => {
            const {item} = payload ;
        console.log(item)
            state.list.exercises.push( {
                exercise_id: item.id,
                note: item.note,
                order: 1,
                sets: item.sets,
                rest_timer: item.restTimer
              })
                   }

    }
})

export const { createRoutes ,setRoutes} = routineSlice.actions

export default routineSlice.reducer
