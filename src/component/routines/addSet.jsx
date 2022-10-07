import React ,{useState}from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Paper } from '@mui/material';
import { addTimer , setInput } from '../../store/slice/exerciseSlice';



const AddSet = ({Id}) => {

    const dispatch = useDispatch()

    const [REPS, setREPS] = useState()
    const [kg, setKg] = useState()
    const [timer, setTimer] = React.useState();

    const list = useSelector(state => state.exercise.list)

    const handleInputKg = ({e , index}) => {
        setKg(e.target.value)
        dispatchManeager(index)
    }
    const handleInputREPS = ({e, index}) => {
        dispatchManeager(index)
        setREPS(e.target.value)
    }
    // set input 
    console.log(kg ,REPS);

    const dispatchManeager = ({index}) => {
        dispatch(setInput({ kg, REPS, index }))
        // dispatch(addTimer({ id, timer }))
    }
    // const handleChangeSelected = (e, id) => {
        // dispatchManeager({ id, timer })
        // setTimer(e.target.value);
    // }
    console.log(list);




   const Set =  list.map((option)=> 
            option.id === Id ? option.set : '')

    return (  
        <>                                                                                                                                                                                                                          
         {Set.map((item,index)=>
          <TableBody  >
            <TableRow >
                <TableCell align="center" > 1</TableCell>
                <TableCell align="center">
                    <input  variant="filled" value={kg}
                        onChange={()=> handleInputKg(kg , index)}
                         className='inputCard' type='number'>
                    </input>
                </TableCell>
                <TableCell align="center">
                    <input  variant="filled" value={REPS}
                        onChange={()=> handleInputREPS(REPS ,index )} 
                        className='inputCard' type='number'>
                    </input>
                </TableCell>
            </TableRow>
          </TableBody>
            )  
       }  
    </>   
    )
}

export default AddSet
