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

            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        id: payload.id,
                        key: Math.floor(Math.random()*1000),
                        en_title: payload.en_title,
                        fa_title: payload.fa_title,
                         keywords: payload.keywords,
                        type :payload.type.indices,
                        sets:[]
                        // {index_id:'' , amount:'' } 
                    }
                ]
            }
        },


        deleteExercise: (state, { payload }) => {
            console.log(payload);
            state.list = state.list.filter((item) => item.key !== payload)
        },


        addSet: (state, { payload }) => {
            console.log(payload);
            
            state.list = state.list.map((item, index) => {
             let kok =  item.type.map((option , index)=> [{index_id:option.id , amount: '' }]  )
                return item.key == payload
                    ?
                    {
                        ...item,
                        sets: [...item.sets , [item.type.map((option , index)=> [{index_id:option.id , amount: '' }]  )]]
                    }
                    : item

            })
        },


        setInputKG: (state, { payload }) => {
            const { kg, Id, Index } = payload 
            console.log(kg ,Id , Index);
            state.list = state.list.map((item) => {

                return item.key == Id
                    ? {
                        ...item,
                        sets: item.sets.map((option, ind) => Index == ind ? 

                        option.map((item)=>
                        item?.index_id == 1 ?
                        [{ amount :kg} ] : item
                        )
                        : option)
                    }
                    : item
            })
        },

        
        setInputREPS: (state, { payload }) => {
            const { REPS, Id, Index } = payload
            state.list = state.list.map((item) => {
                return item.key == Id
                    ? {
                        ...item,
                        sets: item.sets.map((option, ind) => Index == ind ? 
                        [{index_id : 3 , amount :REPS}] : option)
                    }
                    : item
            })
        },


        setInputTime: (state, { payload }) => {
            const { time, Id, Index } = payload
            state.list = state.list.map((item) => {
                return item.key == Id
                    ? {
                        ...item,
                        sets: item.sets.map((option, ind) =>Index == ind ?
                        
                        option.map((item)=>  
                        item?.index_id == 4?
                        [ { amount :time} ] :item
                        )
                        : option)
                        // sets: item.sets.map((option, ind) => Index == ind ? 
                        // [...option,{index_id : 4 , amount :time}] : option)
                    }
                    : item
            })
        },


        addTimer: (state, { payload }) => {
            const { timer, Id } = payload
            state.list = state.list.map((item) => {
                return item.id === Id
                    ? {
                        ...item,
                        timer: timer
                    }
                    : item
            })
        },


        done: (state, { payload }) => {
            const { Index, Id, check } = payload
            state.list = state.list.map((item) => {
                return item.id == Id
                    ? {
                        ...item,
                        set: item.set.map((option, index) => index == Index ? { ...option, done: check } : option)
                    }
                    : item
            })
        }


    }

}
)


export const { setExercise, deleteExercise, addSet, setInputREPS, setInputKG,setInputTime, addTimer, done } = exerciseSlice.actions

export default exerciseSlice.reducer