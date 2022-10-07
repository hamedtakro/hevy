import React, { useRef, useState } from 'react'
import { Box, Paper, Label, Input, Button, Modal } from '@mui/material'
import {Link ,Redirect } from 'react-router-dom'
import Navbar from '../layout/navbar'

const Login = () => {

    // const email = useRef()
    // const password = useRef()
    const [tel, setTel] = useState()
    const [name, setName] = useState()

    const handleTel = (e) => {
        setTel(e.target.value)
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const getTel = localStorage.getItem("telData")
    const getName = localStorage.getItem("nameData")

    const handleSubmit = () => {
        // if(email == 'hamed@g.com' && password == '12345'){

        localStorage.setItem("telData", tel)
        localStorage.setItem("nameData", name)
        // }
    }


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
                    <h1 className="m-10 titleLogin">WECOME TO HEVY</h1>

                    {getTel == '09121234567' && getName == 'hamed' ?
                       <Link  to='/' />
                        :
                        
                        <form className="inputLogins" onSubmit={handleSubmit}>

                            <label for='passwords' className="labelLogin"> نام کاربری : </label>
                            <Input id='passwords' type="text" className=" inputLogin " onChange={handleName} value={name} />

                            <label for='emails' className="labelLogin"> شماره تلفن : </label>
                            <Input id='emails' type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className=" inputLogin my-4 " onChange={handleTel} value={tel} />
                            <Button className="inputLogin" color="primary" variant="contained" type="submit" > Log IN</Button>
                        </form>}
                </Paper>
            </Box>
        </div>

    )
}

export default Login
