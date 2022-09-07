import { configureStore } from '@reduxjs/toolkit'
import exerciseReduser from "./slice/exerciseSlice"
import counterReduser from  './slice/countSlice'
import exerciseShowReduser from './slice/exerciseShow'


export const store = configureStore({
  reducer: {
    exercise : exerciseReduser,
    counter : counterReduser,
    exerciseShow : exerciseShowReduser
  },
})

