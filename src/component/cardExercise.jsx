import React from 'react'
import { useSelector } from 'react-redux'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import Fit1 from "../img/fit1.jpg";
import Fit2 from "../img/fit2.jpg";
import Fit3 from "../img/fit3.jpg";
import Fit11 from "../img/fit1-1.jpg";
import vFit1 from "../video/Fit1.mp4";





const CardExercise = () => {

  const list = useSelector(state => state.exerciseShow.list)

  return (

    <div div id="results1" className="search-results" >

      {list.map((option) => <div> <h2 className='font-bold text-xl'>{option.title}</h2>
        <div className='my-4 flex'>
         
         <>
         { option.type == 'img' ?  <img className='border-2 py-10 rounded-lg ' style={{ height: 240 , width :328}} alt="Travis Howard" src={option.avatar} />
          :<video className='border-2 rounded-lg w-3/5' autoPlay loop muted>
            <source src={option.video} type="video/mp4" />
          </video>   }
          </>
        
          <info className='w-2/5 ml-5'>
            <h3 className='color-red'>info</h3>
            <p className='mt-2'><FitnessCenterIcon fontSize="small" /> Equipment: Other</p>
            <p className='mt-3'><AccessibilityNewIcon fontSize="small" /> Primary: {option.body}</p>
          </info>
        </div>
        <h2 className='font-bold text-xl'>Statistics</h2>
        <h2 className='font-bold text-xl mt-10'>reps</h2>
      </div>
      )
      }
    </div>

  )
}

export default CardExercise


