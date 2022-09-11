import { createSlice } from '@reduxjs/toolkit'
import { data } from 'autoprefixer';
import { useSelector, useDispatch } from 'react-redux';




const exerciseSlice = createSlice({
    name: 'exercise',
    initialState: {
        list: [],

    },
    reducers: {
        setExercise: (state, { payload }) => {
            state.list.push(payload)

            // return{
            // ...state ,
            //  list:[
            // ...state.list , 
            // {key : payload.id , title :payload.title , avatar : payload.avatar ,body: payload.body}
            //  ]
            // }   
        },

        deleteExercise: (state, { payload }) => {
            const { option, list } = payload


            state.list = list.filter(item => item.id !== option)
        },

        addSet: (state, { payload }) => {
            const { list, option } = payload
            state.list = state.list.map((item) => {

                return item.id === option
                    ? {
                        ...item,
                        set: [...item.set, { kg: '', resp: '' }]
                    }
                    : item

            })
        },
        setInput: (state, { payload }) => {
            const { kg, id, ind ,REPS} = payload
            console.log(kg, id, ind);
            state.list = state.list.map((item) => {

                return item.id === id
                    ? {
                        ...item,
                        set: item.set.map((option, index) => index == ind ? { kg: kg , resp :REPS} : option)
                    }
                    : item
            })
        },
        addTimer : (state, {payload}) => {
            const {timer , id } = payload
            state.list = state.list.map((item)=> {
                return item.id ===id
                ?{
                    ...item ,
                    timer : timer
                } : item
            })
        }


    }

}
)


export const { setExercise, deleteExercise, addSet, setInput ,addTimer } = exerciseSlice.actions

export default exerciseSlice.reducer