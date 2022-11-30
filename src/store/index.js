import { configureStore } from '@reduxjs/toolkit'
import exerciseReduser from "./slice/exerciseSlice"
import exerciseShowReduser from './slice/exerciseShow'
import routinesdayReduser from './slice/routinesdaySlice'
import routineReduser from './slice/routineSlice'
import updateRoutineReduser from './slice/updateRoutineSlice'
import createExerciseReduser from './slice/createExercise'

export const store = configureStore({
  reducer: {
    exercise : exerciseReduser,
    exerciseShow : exerciseShowReduser,
    routinesday : routinesdayReduser,
    routine : routineReduser,
    updateRoutine : updateRoutineReduser,
    createExercise : createExerciseReduser
  },
})

