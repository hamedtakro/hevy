import React from 'react'
import Navbar from '../layout/navbar'
import {Box , Paper} from '@mui/material'

const Logout = () => {
    return (
        <div>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    justifyContent: 'center',
                    marginTop: 7,
                    '& > :not(style)': {
                        m: 1,
                        width: 560,
                        height: 360,
                    },
                }}
            >
                <Paper elevation={9} className="paperLogin" >
                    <h1 className='title-logout'> خوش آمدید</h1>
                </Paper>
            </Box>
        </div>


    )
}

export default Logout
