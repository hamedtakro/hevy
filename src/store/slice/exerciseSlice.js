import { createSlice } from '@reduxjs/toolkit'
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
        const {list , option} = payload
            state.list = state.list.map((item) => {
                return item.id === option 
                        ? {
                            ...item,
                            set :  item.set +=1
                        }
                        : item
            })
        
        
        
        
        
        
         
         
         
        }


    }

}
)


export const { setExercise, deleteExercise, addSet } = exerciseSlice.actions

export default exerciseSlice.reducer