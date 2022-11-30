import { createSlice } from "@reduxjs/toolkit";

const createExerciseSlice = createSlice({
    name: 'createExercise',
    initialState: {
        list: []
    },
    reducers: {
        createFormExercise: (state, { payload }) => {
            console.log(payload);
        },

    }

})

export const { createFormExercise } = createExerciseSlice.actions

export default createExerciseSlice.reducer