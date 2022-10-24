import { createSlice } from '@reduxjs/toolkit'
import { data } from 'autoprefixer';
import { useSelector, useDispatch } from 'react-redux';


const setSlice = createSlice({
    name: 'set',
    initialState: {
        setList: [],

    },
    reducers: {
        createRoutes: (state, { payload }) => {
            const {listexercise} = payload
            console.log(listexercise);
            return {
                ...state,
                setList: [...state.setList, { exercise_id: listexercise.exercise_id ,key: listexercise.key, order: '', sets: [] }]
            }

        },


        removeExercise: (state, { payload }) => {
            console.log(payload);
            state.setList = state.setList.filter((item) => item.exercise_id !== payload)
        },


        addSet: (state, { payload }) => {

            state.setList = state.setList.map((item, index) => {
                console.log(item, payload, item.sets);
                return item.exercise_id == payload
                    ?
                    {
                        ...item,
                        sets: [...item.sets, []]
                    }
                    : item
            })
        },


        setInputKG: (state, { payload }) => {
            const { kg, id, Index } = payload
            state.setList = state.setList.map((item) => {
                return item.exercise_id === id
                    ? {
                        ...item,
                        sets: item.sets.map((option, ind) => Index == ind ? {...option , kg: kg } : option)
                    }
                    : item
            })
        },

        setInputDistance: (state, { payload }) => {
            const { distance, id, Index } = payload
            state.setList = state.setList.map((item) => {
                return item.exercise_id === id
                    ? {
                        ...item,
                        sets: item.sets.map((option, ind) => Index == ind ? {...option , distance: distance }: option)
                    }
                    : item
            })
        },
        setInputREPS: (state, { payload }) => {
            const { REPS, id, Index } = payload
            state.setList = state.setList.map((item) => {
                return item.exercise_id === id
                    ? {
                        ...item,
                        sets: item.sets.map((option, ind) => Index == ind ? {...option , REPS: REPS }: option)
                    }
                    : item
            })
        },

        setInputTime: (state, { payload }) => {
            const { time, id, Index } = payload
            state.setList = state.setList.map((item) => {
                return item.exercise_id === id
                    ? {
                        ...item,
                        sets: item.sets.map((option, ind) => Index == ind ? {...option , time: time } : option)
                    }
                    : item
            })
        },
     


        addTimer: (state, { payload }) => {
            const { timer, Id } = payload
            state.setList = state.setList.map((item) => { 
                return item.exercise_id == Id
                ?  {
                    ...item ,
                    RestTimer : timer
                }
                : item
            })
        },


        setInputNote:(state , {payload}) => {
            const {note , id} = payload
            console.log(note , id);
            state.setList = state.setList.map((item)=> {
           return  item.exercise_id == id 
            ? {
                ...item , 
                note: note
             }
                :item
        }
            )
        }


    }
})

export const { addSet, createRoutes, setInputKG, setInputREPS,setInputTime ,removeExercise,setInputDistance,addTimer ,setInputNote } = setSlice.actions

export default setSlice.reducer