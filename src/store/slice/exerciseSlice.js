import { createSlice } from '@reduxjs/toolkit'
import { data } from 'autoprefixer';
import { useSelector, useDispatch } from 'react-redux';


const exerciseSlice = createSlice({
    name: 'exercise',
    initialState: {
        list: [],

    },
    reducers: {
        setExercise: (state, { payload }) => {
            const {listexercise} = payload
            // console.log(list);
            if(state.list.length >=1){
                console.log("if بخش");
                 state.list.map((item)=>  
                  (item.id == payload.id)?
                 alert(" این ورزش را از قبل انتخاب کرده اید") 

                 : state.list.push(payload), console.log(" in backsh ")
                 
                 )
          
          
            }else{
                console.log("بخش else");
                state.list.push(payload)
            }
            // console.log(check);
            // state.list.push(check)

            // return{
            // ...state ,
            //  list:[
            // ...state.list , 
            // {key : payload.id , title :payload.title , avatar : payload.avatar ,body: payload.body}
            //  ]
            // }   
        },

        deleteExercise: (state, { payload }) => {
            const { option , list } = payload
            console.log(option);
            state.list = state.list.filter((item) =>item.id !== option)
        },

        addSet: (state, { payload }) => {
            const { list, option } = payload
            console.log(option);
            state.list = state.list.map((item, index) => {

                return item.id === option
                    ?  
                    {       
                        // list.push({set:[]})
                        ...item,
                        set: [...item.set, {}]
                    }
                    : item

            })
        },
        
        setInputKG: (state, { payload }) => {
            const { kg, id, Index } = payload
            state.list = state.list.map((item) => {

                return item.id === id
                    ? {
                        ...item,
                        set: item.set.map((option, ind) => Index == ind ? { ...option, kg: kg } : option)
                    }
                    : item
            })
        },

        setInputREPS: (state, { payload }) => {
            const { REPS, id, Index } = payload
            state.list = state.list.map((item) => {
                return item.id === id
                    ? {
                        ...item,
                        set: item.set.map((option, ind) => Index == ind ? {...option, REPS: REPS } : option)
                    }
                    : item
            })
        },


        addTimer: (state, { payload }) => {
            const { timer, Id } = payload
            state.list = state.list.map((item) => {
                return item.id === Id
                    ? {
                        ...item , 
                        timer : timer
                    }
                    :item
            })
        },

        done:(state , {payload}) => {
            const {Index , Id , check } = payload 
            state.list = state.list.map((item) => {
          return item.id ==Id 
            ?{
                ...item ,
                set : item.set.map((option , index) => index==Index ? {...option , done :check} : option)
            }
            :item
        })
        }


    }

}
)


export const { setExercise, deleteExercise, addSet, setInputREPS ,setInputKG, addTimer , done} = exerciseSlice.actions

export default exerciseSlice.reducer