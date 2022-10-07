import { createSlice } from '@reduxjs/toolkit'

const exerciseShowSlice = createSlice({
    name: 'exerciseShow',
    initialState: {
        list: []
    },
    reducers: {
        exerciseShow: (state, { payload }) => {
            state.list = [{ key: payload.id, title: payload.title, body: payload.body, avatar: payload.avatar, type: payload.type, video: payload.video }]
        },

    }
}
)

// 
export const { exerciseShow } = exerciseShowSlice.actions

export default exerciseShowSlice.reducer

// 
// 


