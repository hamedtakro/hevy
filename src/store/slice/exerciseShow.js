import { createSlice } from '@reduxjs/toolkit'

const exerciseShowSlice = createSlice({
    name: 'exerciseShow',
    initialState: {
        list: []
    },
    reducers: {
        exerciseShow: (state, { payload }) => {
            state.list.push(payload)
        },

    }
}
)

// 
export const { exerciseShow } = exerciseShowSlice.actions

export default exerciseShowSlice.reducer

// 
// 


