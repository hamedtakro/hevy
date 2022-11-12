import { createSlice } from '@reduxjs/toolkit'
import { data } from 'autoprefixer';
import { useSelector, useDispatch } from 'react-redux';


const exerciseSlice = createSlice({
    name: 'exercise',
    initialState: {
        list: [],
        title: '',

    },
    reducers: {
        setExercise: (state, { payload }) => {

            return {
                ...state,
                
                list: [
                    ...state.list,
                    {
                        id: payload.id,
                        key: Math.floor(Math.random() * 1000),
                        en_title: payload.en_title,
                        fa_title: payload.fa_title,
                        keywords: payload.keywords,
                        type: payload.type.indices,
                        restTimer: '',
                        sets: []
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

            state.list = state.list.map((item, index) => {
                let kok = item.type.map((option, index) => [{ index_id: option.id, amount:''}])
                return item.key == payload
                    ?
                    {
                        ...item,
                        sets: [...item.sets, item.type.map((option, index) =>  [{ index_id: option.id, amount:''}] )]
                    }
                    : item

            })
        },


        setInputKG: (state, { payload }) => {
            const { kg, Id, IndexSet, Ind } = payload
            state.list.map((item) => item.key == Id ? item.sets[IndexSet][Ind][0].amount = kg : item)
        },


        setInputDistance: (state, { payload }) => {
            const { distance, Id, IndexSet, Ind } = payload
            state.list.map((item) => item.key == Id ? item.sets[IndexSet][Ind][0].amount = distance : item)

        },


        setInputREPS: (state, { payload }) => {
            const { REPS, Id, IndexSet, Ind } = payload
            state.list.map((item) => item.key == Id ? item.sets[IndexSet][Ind][0].amount = REPS : item)

        },


        setInputTime: (state, { payload }) => {
            const { time, Id, IndexSet, Ind } = payload
            state.list.map((item) => item.key == Id ? item.sets[IndexSet][Ind][0].amount = time : item)
        },



        addRestTimer: (state, { payload }) => {
            const { restTimer, Id } = payload
            state.list = state.list.map((item) => {
                return item.key === Id
                    ? {
                        ...item,
                        restTimer: restTimer
                    }
                    : item
            })
        },


        addNote: (state,{payload}) =>{
            const {note , Id} = payload 
            state.list = state.list.map((item)=> {
                return item.key == Id 
                ?{
                    ...item ,
                    note: note
                } 
                :item
            })
        },

        addTitle: (state ,{payload}) =>{
            const {mainTitle} = payload
            state.title = mainTitle

        },



    }

}
)


export const { setExercise, deleteExercise, addSet, setInputREPS, setInputKG, setInputDistance, setInputTime, addNote ,addTitle ,addRestTimer } = exerciseSlice.actions

export default exerciseSlice.reducer