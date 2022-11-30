import React, { useState } from 'react'
import { Box, Input, Button, Typography, Paper } from '@mui/material'
import Navbar from '../layout/navbar'
import App from '../../App'
import logo from "../../logo.png";

const Login = () => {

    // const email = useRef()
    // const password = useRef()
    const [login, setLogin] = useState(false)
    const [mobile, setTel] = useState("")
    const [password, setPass] = useState("")
    const handleTel = (e) => {
        setTel(e.target.value)
    }

    const handlepass = (e) => {
        setPass(e.target.value)
    }


    async function handleSubmit() {
        console.warn(mobile, password)
        let item = { mobile, password };
        let result = await fetch("http://younikweb.ir/api/v1/pass-login", {
            method: 'POST',
            headers: {
                "Content-Type": "appliction/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        (!result.token) ?
            alert(result.message)
            :
            localStorage.setItem("token", result.token)
        localStorage.setItem("name", result.user.name)
        await setLogin(true)
    }

    if (login) {
        return <App />
    }


    return (
        <div className='login flex justify-center items-center'>
            <Box
                className='rounded-lg boxLogin mx-2 -mt-3   '
                sx={{
                    width: 450,
                    height: 300,

                }}
            >
                <div div className="inputLogins " >
                <a href='/'><img className='' src={logo} width="110" height="26" /></a>

                    <Input id='emails' type="phone" className=" inputLogin my-4 rounded" onChange={handleTel} value={mobile} placeholder='شماره خود را وارد کنید' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                    <Input id='password' type="password" className=" inputLogin my-4 rounded" onChange={handlepass} value={password} placeholder="رمز عبور" />
                  <Button onClick={handleSubmit} className="buttonLogin" variant="contained" type="submit" > <Typography >ورود</Typography></Button>
                </div >
            </Box>


        </div>

    )
}

export default Login


