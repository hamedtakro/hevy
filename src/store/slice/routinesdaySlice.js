import { createSlice } from '@reduxjs/toolkit';

const routinesdaySlice = createSlice({
    name: 'routinesday',
    initialState: {
        list: [],
    },
    reducers: {
        setExercise: (state, { payload }) => {
            const { exerciseDay } = payload
            exerciseDay.map((item)=>  state.list.push(item))
        },


        setDone: (state, { payload }) => {
            const { Id, Index, check } = payload
            // console.log(Id , Index , check );
            state.list = state.list.map((item) => {
                return item.id === Id
                    ? {
                        ...item,
                        set: item.set.map((option, ind) => Index == ind ? { ...option, done: check } : option)
                    }
                    : item
            })
        },


        updateAddExercise: (state, { payload }) => {

            const { listexercise } = payload;
            console.log(listexercise)
            state.list.push(listexercise)
        },

        addSet: (state, { payload }) => {
            const { list, option } = payload
            console.log(option)
            state.list = state.list.map((item, index) => {
                return item.id === option
                    ? {
                        ...item,
                        set: [...item.set, {}]
                    }
                    : item
            })
        },
        setInputKG: (state, { payload }) => {
            const { kg, id, Index } = payload
    
            state.list = state.list.map((item) => {
                return item.id === id
                    ? {
                        ...item,
                        set: item.set.map((option, ind) => Index == ind ? { ...option, kg: kg } : option)
                    }
                    : item
            })
        },
        setInputREPS: (state, { payload }) => {
            const { REPS, id, Index } = payload
           
            state.list = state.list.map((item) => {
                return item.id === id
                    ? {
                        ...item,
                        set: item.set.map((option, ind) => Index == ind ? { ...option, REPS: REPS } : option)
                    }
                    : item
            })
        },
        deleteExercise: (state, { payload }) => {
            const { option, list } = payload
            console.log(option );
            state.list = state.list.filter((item) => item.id !== option)
        },



    }

})

export const { setExercise, setDone, updateAddExercise,setInputKG ,setInputREPS,addSet ,deleteExercise } = routinesdaySlice.actions

export default routinesdaySlice.reducer