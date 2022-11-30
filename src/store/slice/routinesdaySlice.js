import { createSlice } from '@reduxjs/toolkit';

const routinesdaySlice = createSlice({
    name: 'routinesday',
    initialState: {
        list: [],
    },
    reducers: {
        remove : (state, {payload}) =>{
            state.list = []
        },

        setRoutes: (state, { payload }) => {
            console.log(payload);
            state.list.push(payload)          
        },


        setDone: (state, { payload }) => {
            const { IdSet, IdEx, check } = payload
            state.list = state.list.map((items) => {
                return {
                    ...items,
                    routine_items: items.routine_items.map((item) =>
                        item.id == IdEx ?
                            {
                                ...item,
                                routine_sets: item.routine_sets.map((sets, index) => index == IdSet ? { ...sets, done: check } : sets)
                            }
                            : item)
                }
            }
            )

        },

        updateAddExercise: (state, { payload }) => {
            const {chosen} = payload
            console.log(chosen);
            state.list.map((item)=> item.routine_items.push({
                id: Math.floor(Math.random() * 1000),
                exercise_id: chosen.id,
                note: '',
                order: 1,
                rest_timer: '',
                exercise : {id:chosen.id , fa_title: chosen.fa_title , en_title: chosen.en_title , type:chosen.type},
                routine_sets: []
            })
            )


        },


        updateDeleteExercise: (state, { payload }) => {
            state.list = state.list.map((items) => {
                return {
                    ...items,
                    routine_items: items.routine_items.filter((item) =>
                        item.id !== payload)
                }
            }
            )
        },


        addSetUpdate: (state, { payload }) => {
            console.log(payload);
            state.list.map((items) =>
                items.routine_items.map((item) =>
                    item.id == payload ?
                        item.routine_sets.push(
                            {
                                id: Math.floor(Math.random() * 1000),
                                amount: item.exercise.type.indices.map((type) => [ 
                                 { index_id: type.id, amount: '' } ])
                            }
                        )
                        : item))
        },


        setUpdateRestTimer: (state, { payload }) => {
            const { Id, restTimer } = payload
            state.list = state.list.map((items) => {
                return {
                    ...items,
                    routine_items: items.routine_items.map((item) =>
                        item.id == Id ?
                            {
                                ...item,
                                rest_timer: restTimer
                            }
                            : item
                    )
                }
            })


        },

        setUpdateNote: (state, { payload }) => {
            const { Id, note } = payload
            state.list = state.list.map((items) => {
                return {
                    ...items,
                    routine_items: items.routine_items.map((item) =>
                        item.id == Id ?
                            {
                                ...item,
                                note: note
                            }
                            : item
                    )
                }
            })
        },

        setUpdateInputKg: (state, { payload }) => {
            const { kg, Id, IndexSet, SetId, Index_Id } = payload
            state.list = state.list.map((items) => {
                return {
                    ...items,
                    routine_items: items.routine_items.map((item) =>
                        item.id == Id ?
                            {
                                ...item,
                                routine_sets: item.routine_sets.map((sets, index) => sets.id == SetId ? {
                                    ...sets,
                                    amount: sets.amount.map((amounts) => amounts[0]?.index_id == Index_Id || amounts.index_id == Index_Id ?
                                        { amount: kg, index_id: Index_Id } : (amounts[0] ? amounts[0] : amounts))
                                } : sets)
                            }
                            : item)
                }
            }
            )
        },



        setUpdateInputDistance: (state, { payload }) => {
            const { distance, Id, IndexSet, SetId, Index_Id } = payload
            state.list = state.list.map((items) => {
                return {
                    ...items,
                    routine_items: items.routine_items.map((item) =>
                        item.id == Id ?
                            {
                                ...item,
                                routine_sets: item.routine_sets.map((sets, index) => sets.id == SetId ? {
                                    ...sets,
                                    amount: sets.amount.map((amounts) => amounts[0]?.index_id == Index_Id || amounts.index_id == Index_Id ?
                                        { amount: distance, index_id: Index_Id } : (amounts[0] ? amounts[0] : amounts))
                                } : sets)
                            }
                            : item)
                }
            }
            )
        },


        setUpdateInputREPS: (state, { payload }) => {
            const { REPS, Id, IndexSet, SetId, Index_Id } = payload
            state.list = state.list.map((items) => {
                return {
                    ...items,
                    routine_items: items.routine_items.map((item) =>
                        item.id == Id ?
                            {
                                ...item,
                                routine_sets: item.routine_sets.map((sets, index) => sets.id == SetId ? {
                                    ...sets,
                                    amount: sets.amount.map((amounts) => amounts[0]?.index_id == Index_Id || amounts.index_id == Index_Id ?
                                        { amount: REPS, index_id: Index_Id } : (amounts[0] ? amounts[0] : amounts))
                                } : sets)
                            }
                            : item)
                }
            }
            )
        },


        setUpdateInputTime: (state, { payload }) => {
            const { time, Id, IndexSet, SetId, Index_Id } = payload
            state.list = state.list.map((items) => {
                return {
                    ...items,
                    routine_items: items.routine_items.map((item) =>
                        item.id == Id ?
                            {
                                ...item,
                                routine_sets: item.routine_sets.map((sets, index) => sets.id == SetId ? {
                                    ...sets,
                                    amount: sets.amount.map((amounts) => amounts[0]?.index_id == Index_Id || amounts.index_id == Index_Id ?
                                        { amount: time, index_id: Index_Id } : (amounts[0] ? amounts[0] : amounts))
                                } : sets)
                            }
                            : item)
                }
            }
            )
        },




    }

})

export const { remove,setRoutes, setDone, addSetUpdate, updateDeleteExercise, setUpdateNote, setUpdateRestTimer, updateAddExercise, setUpdateInputKg, setUpdateInputREPS, setUpdateInputDistance, setUpdateInputTime } = routinesdaySlice.actions

export default routinesdaySlice.reducer