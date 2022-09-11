import { configureStore } from '@reduxjs/toolkit'
import exerciseReduser from "./slice/exerciseSlice"
import exerciseShowReduser from './slice/exerciseShow'


export const store = configureStore({
  reducer: {
    exercise : exerciseReduser,
    exerciseShow : exerciseShowReduser
  },
})

