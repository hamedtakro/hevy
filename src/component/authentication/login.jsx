import React, {  useState } from 'react'
import { Box, Input, Button } from '@mui/material'
import Navbar from '../layout/navbar'
import App from '../../App'

const Login = () => {

    // const email = useRef()
    // const password = useRef()
    const [login , setLogin] = useState(false)
    const [mobile, setTel] = useState("")
    const [password, setPass] = useState("")
    const handleTel = (e) => {
        setTel(e.target.value)
    }

    const handlepass = (e) => {
        setPass(e.target.value)
    }


     async function handleSubmit () {
        console.warn(mobile , password)
        let item = { mobile, password };
        let result = await fetch("http://younikweb.ir/api/v1/pass-login", {
            method: 'POST',
            headers: {
                "Content-Type" : "appliction/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
         (!result.token) ?
         alert(result.message)
        :
        localStorage.setItem("token" ,result.token)
        localStorage.setItem("name" , result.user.name)
         await setLogin(true)
    }

    if(login){
        return <App />
    }


    return (
        <div className='login'>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    justifyContent: 'center',
                    marginTop: 15,
                    '& > :not(style)': {
                        m: 1,
                        width: 560,
                        height: 360,
                    },
                }}
            >
                <div className="paperLogin " >
                    <h1 className="m-10 titleLogin">ورود به سایت</h1>
                    
                    {/* onSubmit={handleSubmit} */}

                    <div className="inputLogins" >

                        {/* <label for='emails' className="labelLogin"> شماره تلفن : </label> */}
                        <Input id='emails' type="type" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                        className=" inputLogin my-4 " onChange={handleTel} value={mobile}  placeholder="شماره تلفن "/>

                        {/* <label for='password' className="labelLogin"> password : </label> */}
                        <Input id='password' type="password" className=" inputLogin my-4 " 
                        onChange={handlepass} value={password} placeholder="رمز عبور"/>

                        <Button onClick={handleSubmit} className="inputLogin" color="primary" 
                        variant="contained" type="submit" > Log IN</Button>
                    </div>
                </div>
            </Box>
        </div>

    )
}

export default Login
