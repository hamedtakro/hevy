import { createSlice } from '@reduxjs/toolkit'


const counterSlice = createSlice({
    name: 'counter',
    initialState: {
       value : []
         
    },
    reducers: {
        addCount: (state , action) => {
                  const {count } = action.payload
                    console.log(count);
                    return{
                            ...state,
                             value : [...state.value , { key: count, number : count }]
                    }    
        }
    }
 } )

// console.log(counterSlice)
export const { addCount } = counterSlice.actions

export default counterSlice.reducer 