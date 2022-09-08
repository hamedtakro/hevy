import { createSlice } from '@reduxjs/toolkit'


const counterSlice = createSlice({
    name: 'counter',
    initialState: {
       value : []
         
    },
    reducers: {
        addCount: (state , action) => {
                  const {count , option} = action.payload
                    console.log(count);
                    return{
                            ...state,
                             value : [...state.value , {id :option, count }]
                    }    
        }
    }
 } )

// console.log(counterSlice)
export const { addCount } = counterSlice.actions

export default counterSlice.reducer 