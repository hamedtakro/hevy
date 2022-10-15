import { configureStore } from '@reduxjs/toolkit'
import exerciseReduser from "./slice/exerciseSlice"
import exerciseShowReduser from './slice/exerciseShow'
import routinesdayReduser from './slice/routinesdaySlice'
import setReduser from './slice/setSlice'

export const store = configureStore({
  reducer: {
    exercise : exerciseReduser,
    exerciseShow : exerciseShowReduser,
    routinesday : routinesdayReduser,
    set : setReduser
  },
})

