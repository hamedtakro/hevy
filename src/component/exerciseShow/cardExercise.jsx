import React from 'react'
import { useSelector } from 'react-redux'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';





const CardExercise = () => {

  const list = useSelector(state => state.exerciseShow.list)

  return (

    <div div id="results1" className="search-results" >

      {list.map((option) => <div> <h2 className='font-bold text-xl'>{option.title}</h2>
        <div className='my-4 flex'>

          <>
            {option.type == 'img' ?
              <img className='border-2 py-10 rounded-lg w-5/5'  alt="Travis Howard" src={option.avatar} />
              : <video className='border-2 rounded-lg w-5/5' autoPlay loop muted>
                <source src={option.video} type="video/mp4" />
              </video>}
          </>


        </div>
        <info className=' ml-5'>
          <h3 className='color-red'>info</h3>
          <p className='mt-2'><FitnessCenterIcon fontSize="small" /> Equipment: Other</p>
          <p className='mt-3'><AccessibilityNewIcon fontSize="small" /> Primary: {option.body}</p>
        </info>
        <h2 className='font-bold text-xl'>Statistics</h2>
        <h2 className='font-bold text-xl mt-10'>reps</h2>
      </div>
      )
      }
    </div>

  )
}

export default CardExercise


